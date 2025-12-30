"""
Commercial Contacts Endpoints
API endpoints for managing commercial contacts
"""

from typing import List, Optional, Dict
from fastapi import APIRouter, Depends, HTTPException, status, Query, Request, UploadFile, File
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, delete
from sqlalchemy.orm import selectinload
from datetime import datetime as dt
import json
import asyncio
import uuid

from app.core.database import get_db
from app.core.cache_enhanced import cache_query
from app.dependencies import get_current_user
from app.models.contact import Contact
from app.models.company import Company
from app.models.user import User
from app.schemas.contact import ContactCreate, ContactUpdate, Contact as ContactSchema
from app.core.logging import logger

router = APIRouter(prefix="/commercial/contacts", tags=["commercial-contacts"])

# In-memory store for import logs (in production, use Redis)
import_logs: Dict[str, List[Dict[str, any]]] = {}
import_status: Dict[str, Dict[str, any]] = {}


def add_import_log(import_id: str, message: str, level: str = "info", data: Optional[Dict] = None):
    """Add a log entry to the import logs"""
    if import_id not in import_logs:
        import_logs[import_id] = []
    
    log_entry = {
        "timestamp": dt.now().isoformat(),
        "level": level,
        "message": message,
        "data": data or {}
    }
    import_logs[import_id].append(log_entry)
    
    # Keep only last 1000 logs per import
    if len(import_logs[import_id]) > 1000:
        import_logs[import_id] = import_logs[import_id][-1000:]


def update_import_status(import_id: str, status: str, progress: Optional[int] = None, total: Optional[int] = None):
    """Update import status"""
    if import_id not in import_status:
        import_status[import_id] = {}
    
    import_status[import_id].update({
        "status": status,
        "updated_at": dt.now().isoformat()
    })
    
    if progress is not None:
        import_status[import_id]["progress"] = progress
    if total is not None:
        import_status[import_id]["total"] = total


async def find_company_by_name(
    company_name: str,
    db: AsyncSession,
) -> Optional[int]:
    """
    Find a company ID by name using intelligent matching.
    
    Args:
        company_name: Company name to search for
        db: Database session
        
    Returns:
        Company ID if found, None otherwise
    """
    if not company_name or not company_name.strip():
        return None
    
    # Try exact match first (case-insensitive)
    result = await db.execute(
        select(Company).where(func.lower(Company.name) == company_name.lower().strip())
    )
    company = result.scalar_one_or_none()
    if company:
        return company.id
    
    # Try partial match
    result = await db.execute(
        select(Company).where(Company.name.ilike(f"%{company_name.strip()}%"))
    )
    company = result.scalar_one_or_none()
    if company:
        return company.id
    
    return None


def _contact_to_schema(contact: Contact) -> ContactSchema:
    """Convert Contact model to ContactSchema"""
    return ContactSchema(
        id=contact.id,
        first_name=contact.first_name,
        last_name=contact.last_name,
        company_id=contact.company_id,
        company_name=contact.company.name if contact.company else None,
        position=contact.position,
        circle=contact.circle,
        linkedin=contact.linkedin,
        photo_url=contact.photo_url,
        photo_filename=contact.photo_filename,
        email=contact.email,
        phone=contact.phone,
        city=contact.city,
        country=contact.country,
        birthday=contact.birthday,
        language=contact.language,
        employee_id=contact.employee_id,
        employee_name=f"{contact.employee.first_name} {contact.employee.last_name}" if contact.employee else None,
        created_at=contact.created_at,
        updated_at=contact.updated_at,
    )


@router.get("/", response_model=List[ContactSchema])
@cache_query(expire=60, tags=["contacts"])
async def list_contacts(
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    circle: Optional[str] = Query(None),
    company_id: Optional[int] = Query(None),
) -> List[ContactSchema]:
    """
    Get list of contacts
    
    Args:
        skip: Number of records to skip
        limit: Maximum number of records to return
        circle: Optional circle filter
        company_id: Optional company filter
        current_user: Current authenticated user
        db: Database session
        
    Returns:
        List of contacts
    """
    query = select(Contact)
    
    if circle:
        query = query.where(Contact.circle == circle)
    if company_id:
        query = query.where(Contact.company_id == company_id)
    
    query = query.options(
        selectinload(Contact.company),
        selectinload(Contact.employee)
    ).order_by(Contact.created_at.desc()).offset(skip).limit(limit)
    
    try:
        result = await db.execute(query)
        contacts = result.scalars().all()
    except Exception as e:
        logger.error(f"Database error in list_contacts: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"A database error occurred: {str(e)}"
        )
    
    return [_contact_to_schema(contact) for contact in contacts]


@router.get("/{contact_id}", response_model=ContactSchema)
async def get_contact(
    contact_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> ContactSchema:
    """
    Get a specific contact by ID
    
    Args:
        contact_id: Contact ID
        current_user: Current authenticated user
        db: Database session
        
    Returns:
        Contact details
        
    Raises:
        HTTPException: If contact not found
    """
    try:
        result = await db.execute(
            select(Contact)
            .options(
                selectinload(Contact.company),
                selectinload(Contact.employee)
            )
            .where(Contact.id == contact_id)
        )
        contact = result.scalar_one_or_none()
    except Exception as e:
        logger.error(f"Database error in get_contact: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"A database error occurred: {str(e)}"
        )
    
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact not found"
        )
    
    return _contact_to_schema(contact)


@router.post("/", response_model=ContactSchema, status_code=status.HTTP_201_CREATED)
async def create_contact(
    request: Request,
    contact_data: ContactCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> ContactSchema:
    """
    Create a new contact
    
    Args:
        contact_data: Contact creation data
        current_user: Current authenticated user
        db: Database session
        
    Returns:
        Created contact
    """
    # Handle company matching: if company_name is provided but company_id is not, try to find the company
    final_company_id = contact_data.company_id
    
    if not final_company_id and contact_data.company_name:
        matched_company_id = await find_company_by_name(
            company_name=contact_data.company_name,
            db=db
        )
        if matched_company_id:
            final_company_id = matched_company_id
            logger.info(f"Auto-matched company '{contact_data.company_name}' to company ID {matched_company_id}")
    
    # Validate company exists if provided
    if final_company_id:
        company_result = await db.execute(
            select(Company).where(Company.id == final_company_id)
        )
        if not company_result.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Company not found"
            )
    
    # Validate employee exists if provided
    if contact_data.employee_id:
        employee_result = await db.execute(
            select(User).where(User.id == contact_data.employee_id)
        )
        if not employee_result.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Employee not found"
            )
    
    # Build contact
    contact = Contact(
        first_name=contact_data.first_name,
        last_name=contact_data.last_name,
        company_id=final_company_id,
        position=contact_data.position,
        circle=contact_data.circle,
        linkedin=contact_data.linkedin,
        photo_url=contact_data.photo_url,
        photo_filename=contact_data.photo_filename,
        email=contact_data.email,
        phone=contact_data.phone,
        city=contact_data.city,
        country=contact_data.country,
        birthday=contact_data.birthday,
        language=contact_data.language,
        employee_id=contact_data.employee_id,
    )
    
    db.add(contact)
    await db.commit()
    await db.refresh(contact)
    
    # Load relationships
    await db.refresh(contact, ["company", "employee"])
    
    return _contact_to_schema(contact)


@router.put("/{contact_id}", response_model=ContactSchema)
async def update_contact(
    request: Request,
    contact_id: int,
    contact_data: ContactUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> ContactSchema:
    """
    Update a contact
    
    Args:
        contact_id: Contact ID
        contact_data: Contact update data
        current_user: Current authenticated user
        db: Database session
        
    Returns:
        Updated contact
        
    Raises:
        HTTPException: If contact not found
    """
    result = await db.execute(
        select(Contact).where(Contact.id == contact_id)
    )
    contact = result.scalar_one_or_none()
    
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact not found"
        )
    
    # Handle company matching
    final_company_id = contact_data.company_id
    
    if final_company_id is None and contact_data.company_name:
        matched_company_id = await find_company_by_name(
            company_name=contact_data.company_name,
            db=db
        )
        if matched_company_id:
            final_company_id = matched_company_id
            logger.info(f"Auto-matched company '{contact_data.company_name}' to company ID {matched_company_id}")
    
    # Validate company exists if provided
    if final_company_id is not None:
        company_result = await db.execute(
            select(Company).where(Company.id == final_company_id)
        )
        if not company_result.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Company not found"
            )
    
    # Validate employee exists if provided
    if contact_data.employee_id is not None:
        employee_result = await db.execute(
            select(User).where(User.id == contact_data.employee_id)
        )
        if not employee_result.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Employee not found"
            )
    
    # Update fields
    update_data = contact_data.model_dump(exclude_unset=True, exclude={'company_name'})
    
    # Set company_id if we found a match
    if final_company_id is not None:
        update_data['company_id'] = final_company_id
    
    for field, value in update_data.items():
        setattr(contact, field, value)
    
    await db.commit()
    await db.refresh(contact)
    await db.refresh(contact, ["company", "employee"])
    
    return _contact_to_schema(contact)


@router.delete("/bulk", status_code=status.HTTP_200_OK)
async def delete_all_contacts(
    request: Request,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> dict:
    """
    Delete all contacts from the database
    
    Args:
        current_user: Current authenticated user
        db: Database session
        
    Returns:
        Dictionary with count of deleted contacts
    """
    # Count contacts before deletion
    count_result = await db.execute(select(func.count(Contact.id)))
    count = count_result.scalar_one()
    
    if count == 0:
        return {
            "message": "No contacts found",
            "deleted_count": 0
        }
    
    # Delete all contacts
    await db.execute(delete(Contact))
    await db.commit()
    
    logger.info(f"User {current_user.id} deleted all {count} contacts")
    
    return {
        "message": f"Successfully deleted {count} contact(s)",
        "deleted_count": count
    }


@router.delete("/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_contact(
    request: Request,
    contact_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> None:
    """
    Delete a contact
    
    Args:
        contact_id: Contact ID
        current_user: Current authenticated user
        db: Database session
        
    Raises:
        HTTPException: If contact not found
    """
    result = await db.execute(
        select(Contact).where(Contact.id == contact_id)
    )
    contact = result.scalar_one_or_none()
    
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact not found"
        )
    
    await db.delete(contact)
    await db.commit()


@router.get("/import/{import_id}/logs")
async def stream_import_logs(
    import_id: str,
    current_user: User = Depends(get_current_user),
):
    """
    Stream import logs via Server-Sent Events (SSE)
    """
    async def event_generator():
        last_index = 0
        
        while True:
            # Check if import is complete
            if import_id in import_status:
                status_info = import_status[import_id]
                if status_info.get("status") == "completed" or status_info.get("status") == "failed":
                    # Send final logs
                    if import_id in import_logs:
                        logs = import_logs[import_id]
                        for log in logs[last_index:]:
                            yield f"data: {json.dumps(log)}\n\n"
                    
                    # Send final status
                    yield f"data: {json.dumps({'type': 'status', 'data': status_info})}\n\n"
                    yield f"data: {json.dumps({'type': 'done'})}\n\n"
                    break
            
            # Send new logs
            if import_id in import_logs:
                logs = import_logs[import_id]
                if len(logs) > last_index:
                    for log in logs[last_index:]:
                        yield f"data: {json.dumps(log)}\n\n"
                    last_index = len(logs)
            
            # Send status update
            if import_id in import_status:
                status_info = import_status[import_id]
                yield f"data: {json.dumps({'type': 'status', 'data': status_info})}\n\n"
            
            await asyncio.sleep(0.5)  # Check every 500ms
    
    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        }
    )
