"""
Documentation Service
Manages documentation articles and help content
"""

from typing import List, Optional, Dict, Any
from sqlalchemy import select, and_, or_, desc, func
from sqlalchemy.ext.asyncio import AsyncSession
import json

from app.models.documentation import DocumentationArticle, DocumentationCategory, DocumentationFeedback
from app.core.logging import logger


class DocumentationService:
    """Service for documentation operations"""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_article(
        self,
        slug: str,
        title: str,
        content: str,
        excerpt: Optional[str] = None,
        category_id: Optional[int] = None,
        tags: Optional[List[str]] = None,
        is_published: bool = False,
        is_featured: bool = False,
        meta_title: Optional[str] = None,
        meta_description: Optional[str] = None,
        author_id: Optional[int] = None
    ) -> DocumentationArticle:
        """Create a new documentation article"""
        from datetime import datetime
        
        article = DocumentationArticle(
            slug=slug,
            title=title,
            content=content,
            excerpt=excerpt,
            category_id=category_id,
            tags=json.dumps(tags) if tags else None,
            is_published=is_published,
            is_featured=is_featured,
            meta_title=meta_title,
            meta_description=meta_description,
            author_id=author_id,
            published_at=datetime.utcnow() if is_published else None
        )
        
        self.db.add(article)
        await self.db.commit()
        await self.db.refresh(article)
        
        return article

    async def get_article(self, slug: str) -> Optional[DocumentationArticle]:
        """Get an article by slug"""
        result = await self.db.execute(
            select(DocumentationArticle).where(DocumentationArticle.slug == slug)
        )
        return result.scalar_one_or_none()

    async def get_article_by_id(self, article_id: int) -> Optional[DocumentationArticle]:
        """Get an article by ID"""
        return await self.db.get(DocumentationArticle, article_id)

    async def get_published_articles(
        self,
        category_id: Optional[int] = None,
        featured_only: bool = False,
        search_query: Optional[str] = None,
        limit: int = 50,
        offset: int = 0
    ) -> List[DocumentationArticle]:
        """Get published articles with filters"""
        query = select(DocumentationArticle).where(
            DocumentationArticle.is_published == True
        )
        
        if category_id:
            query = query.where(DocumentationArticle.category_id == category_id)
        
        if featured_only:
            query = query.where(DocumentationArticle.is_featured == True)
        
        if search_query:
            query = query.where(
                or_(
                    DocumentationArticle.title.ilike(f"%{search_query}%"),
                    DocumentationArticle.content.ilike(f"%{search_query}%"),
                    DocumentationArticle.excerpt.ilike(f"%{search_query}%")
                )
            )
        
        result = await self.db.execute(
            query.order_by(desc(DocumentationArticle.is_featured), desc(DocumentationArticle.published_at))
            .limit(limit)
            .offset(offset)
        )
        return list(result.scalars().all())

    async def increment_view_count(self, article_id: int) -> None:
        """Increment article view count"""
        article = await self.get_article_by_id(article_id)
        if article:
            article.view_count += 1
            await self.db.commit()

    async def submit_feedback(
        self,
        article_id: int,
        is_helpful: bool,
        comment: Optional[str] = None,
        user_id: Optional[int] = None
    ) -> DocumentationFeedback:
        """Submit feedback on an article"""
        feedback = DocumentationFeedback(
            article_id=article_id,
            user_id=user_id,
            is_helpful=is_helpful,
            comment=comment
        )
        
        self.db.add(feedback)
        
        # Update article helpful counts
        article = await self.get_article_by_id(article_id)
        if article:
            if is_helpful:
                article.helpful_count += 1
            else:
                article.not_helpful_count += 1
        
        await self.db.commit()
        await self.db.refresh(feedback)
        
        return feedback

    async def create_category(
        self,
        slug: str,
        name: str,
        description: Optional[str] = None,
        parent_id: Optional[int] = None,
        order: int = 0,
        icon: Optional[str] = None
    ) -> DocumentationCategory:
        """Create a documentation category"""
        category = DocumentationCategory(
            slug=slug,
            name=name,
            description=description,
            parent_id=parent_id,
            order=order,
            icon=icon
        )
        
        self.db.add(category)
        await self.db.commit()
        await self.db.refresh(category)
        
        return category

    async def get_categories(self, parent_id: Optional[int] = None) -> List[DocumentationCategory]:
        """Get categories"""
        query = select(DocumentationCategory)
        
        if parent_id is not None:
            query = query.where(DocumentationCategory.parent_id == parent_id)
        else:
            query = query.where(DocumentationCategory.parent_id == None)
        
        result = await self.db.execute(query.order_by(DocumentationCategory.order))
        return list(result.scalars().all())

    async def update_article(
        self,
        article_id: int,
        updates: Dict[str, Any]
    ) -> Optional[DocumentationArticle]:
        """Update an article"""
        article = await self.get_article_by_id(article_id)
        if not article:
            return None
        
        from datetime import datetime
        
        for key, value in updates.items():
            if hasattr(article, key) and value is not None:
                if key == 'tags' and isinstance(value, list):
                    setattr(article, key, json.dumps(value))
                elif key == 'is_published' and value and not article.published_at:
                    setattr(article, 'published_at', datetime.utcnow())
                else:
                    setattr(article, key, value)
        
        await self.db.commit()
        await self.db.refresh(article)
        
        return article

    async def delete_article(self, article_id: int) -> bool:
        """Delete an article"""
        article = await self.get_article_by_id(article_id)
        if not article:
            return False
        
        await self.db.delete(article)
        await self.db.commit()
        
        return True

