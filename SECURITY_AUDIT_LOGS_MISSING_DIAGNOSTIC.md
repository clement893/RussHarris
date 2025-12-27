# Diagnostic: Security Audit Logs Not Being Logged

## Problem
No logs are being saved to the security audit logs table, even though the code attempts to log events (login, logout, etc.).

## Root Cause Analysis

### 1. **Missing Database Table**
The `security_audit_logs` table does not exist in the database because:
- ❌ **No Alembic migration exists** to create the table
- ❌ **Model not imported in `alembic/env.py`** - Alembic cannot auto-detect the table for migrations

### 2. **Silent Error Handling**
The audit logging code in `auth.py` wraps calls in try/except blocks that silently catch and log errors:
```python
try:
    await SecurityAuditLogger.log_authentication_event(...)
except Exception as e:
    # Don't fail the request if audit logging fails
    logger.error(f"Failed to log authentication event: {e}", exc_info=True)
```

When the table doesn't exist, the database throws an error, but:
- The error is caught silently
- The request continues normally
- The error is logged, but may not be visible depending on log level configuration
- **No audit logs are created**

### 3. **No Error Propagation**
The `log_event` method in `security_audit.py` doesn't handle database errors gracefully:
- If `db.commit()` fails (e.g., table doesn't exist), the exception bubbles up
- The caller catches it and logs it, but doesn't propagate it
- This makes debugging difficult

## Solution Applied

### 1. **Added Model Import to Alembic**
**File:** `backend/alembic/env.py`
- Added import: `from app.core.security_audit import SecurityAuditLog`
- This allows Alembic to detect the model for autogenerate migrations

### 2. **Created Migration**
**File:** `backend/alembic/versions/020_add_security_audit_logs_table.py`
- Created migration to create `security_audit_logs` table with all required columns
- Includes all indexes as defined in the model
- Handles case where table already exists (idempotent)

### 3. **Improved Error Handling**
**File:** `backend/app/core/security_audit.py`
- Added try/except block around `db.commit()` in `log_event` method
- Added `db.rollback()` on error to prevent transaction issues
- Enhanced error logging with full context
- Re-raises exception to allow caller to handle appropriately

## Next Steps

### 1. **Run Migration**
```bash
cd backend
alembic upgrade head
```

This will create the `security_audit_logs` table in the database.

### 2. **Verify Table Creation**
After running the migration, verify the table exists:
```sql
SELECT * FROM security_audit_logs LIMIT 1;
```

### 3. **Test Audit Logging**
After the table is created, test that logs are being saved:
- Login to the application
- Check the `security_audit_logs` table for new entries
- Verify logs appear in the audit trail API endpoint

### 4. **Monitor Error Logs**
Check application logs for any remaining errors:
- Look for "Failed to create security audit log" messages
- These will now include full context for debugging

## Files Modified

1. `backend/alembic/env.py` - Added SecurityAuditLog import
2. `backend/alembic/versions/020_add_security_audit_logs_table.py` - New migration file
3. `backend/app/core/security_audit.py` - Improved error handling

## Verification

After applying the migration, you should see:
- ✅ `security_audit_logs` table exists in database
- ✅ Login/logout events are logged to the table
- ✅ Audit trail API endpoint returns logs
- ✅ No silent errors in application logs

## Additional Notes

- The migration is idempotent (safe to run multiple times)
- If the table already exists, it will only create missing indexes
- Error handling now provides better visibility into failures
- Consider adding monitoring/alerting for audit log failures in production

