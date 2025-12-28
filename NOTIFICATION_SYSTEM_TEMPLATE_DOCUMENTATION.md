# Notification System - Template Documentation

## 📋 Overview

This template includes a complete notification system with real-time updates via WebSocket, database persistence, and a full-featured UI.

## ✨ Features

- **Database Persistence** - All notifications stored in PostgreSQL
- **Real-Time Updates** - WebSocket integration for instant notifications
- **Multiple Types** - Support for info, success, warning, and error notifications
- **Read/Unread Tracking** - Track notification status with timestamps
- **Action Buttons** - Optional action URLs and labels
- **Pagination & Filtering** - Efficient notification management
- **Email Integration** - Optional email notifications via Celery
- **Badge Counter** - Unread count badge in navbar
- **Notification Center** - Full-featured notification management UI

## 🏗️ Architecture

### Backend

- **Model**: `backend/app/models/notification.py`
  - SQLAlchemy model with proper indexes
  - Support for metadata (JSONB)
  - Relationship with User model

- **Service**: `backend/app/services/notification_service.py`
  - CRUD operations
  - Pagination and filtering
  - Batch operations (mark all as read, delete all read)

- **API**: `backend/app/api/v1/endpoints/notifications.py`
  - RESTful endpoints
  - Authentication required
  - User-scoped (users can only access their own notifications)

- **Tasks**: `backend/app/tasks/notification_tasks.py`
  - Celery tasks for async notification creation
  - Email notification support
  - WebSocket notification sending

- **WebSocket**: `backend/app/api/v1/endpoints/websocket.py`
  - Real-time notification delivery
  - Authentication via token

### Frontend

- **Types**: `apps/web/src/types/notification.ts`
  - TypeScript types aligned with backend
  - NotificationUI type for components

- **API Client**: `apps/web/src/lib/api/notifications.ts`
  - API functions for all endpoints
  - Error handling

- **Hooks**: 
  - `apps/web/src/hooks/useNotifications.ts` - Full notification management
  - `apps/web/src/hooks/useNotificationCount.ts` - Lightweight badge counter

- **WebSocket**: `apps/web/src/lib/websocket/notificationSocket.ts`
  - WebSocket client with auto-reconnection
  - Ping/pong keepalive

- **Components**:
  - `NotificationBell` - Badge with dropdown
  - `NotificationBellConnected` - Connected version with hooks
  - `NotificationCenter` - Full notification list
  - `NotificationCenterConnected` - Connected version with hooks

- **Pages**:
  - `/profile/notifications` - Preferences + preview
  - `/profile/notifications-list` - Full notification list

## 🚀 Usage

### Backend - Creating Notifications

#### Via API

```python
from app.services.notification_service import NotificationService
from app.models.notification import NotificationType

# In your endpoint
service = NotificationService(db)
notification = await service.create_notification(
    user_id=user.id,
    title="Welcome!",
    message="Welcome to the platform",
    notification_type=NotificationType.INFO,
    action_url="/dashboard",
    action_label="Go to Dashboard"
)
```

#### Via Celery Task

```python
from app.tasks.notification_tasks import send_notification_task

# Send notification asynchronously
send_notification_task.delay(
    user_id=1,
    title="New Feature",
    message="Check out our new feature!",
    notification_type="info",
    email_notification=True,
    action_url="/features/new"
)
```

### Frontend - Using Components

#### Notification Bell in Layout

The `NotificationBellConnected` component is already integrated in the Header component. It automatically:
- Fetches notifications
- Shows unread count badge
- Connects to WebSocket for real-time updates
- Handles all user interactions

#### Notification Center in Page

```tsx
import { NotificationCenterConnected } from '@/components/notifications';

export default function MyPage() {
  return (
    <NotificationCenterConnected
      initialFilters={{ skip: 0, limit: 100 }}
      enableWebSocket={true}
    />
  );
}
```

#### Using Hooks Directly

```tsx
import { useNotifications } from '@/hooks/useNotifications';
import { useNotificationCount } from '@/hooks/useNotificationCount';

function MyComponent() {
  const { notifications, markAsRead, deleteNotification } = useNotifications({
    enableWebSocket: true,
  });
  
  const { count } = useNotificationCount({ pollInterval: 60000 });
  
  return (
    <div>
      <p>Unread: {count}</p>
      {notifications.map(notif => (
        <div key={notif.id}>
          {notif.title}
          <button onClick={() => markAsRead(notif.id)}>Mark as read</button>
        </div>
      ))}
    </div>
  );
}
```

## 📡 API Endpoints

All endpoints require authentication. See `backend/API_ENDPOINTS.md` for complete documentation.

- `GET /api/v1/notifications` - List notifications
- `GET /api/v1/notifications/unread-count` - Get unread count
- `GET /api/v1/notifications/{id}` - Get notification
- `PATCH /api/v1/notifications/{id}/read` - Mark as read
- `PATCH /api/v1/notifications/read-all` - Mark all as read
- `DELETE /api/v1/notifications/{id}` - Delete notification
- `POST /api/v1/notifications` - Create notification
- `WS /api/v1/ws/notifications` - WebSocket for real-time updates

## 🗄️ Database Schema

See `backend/DATABASE_SCHEMA.md` for complete schema documentation.

**Table: `notifications`**
- `id` (Integer, Primary Key)
- `user_id` (Integer, Foreign Key → users.id)
- `title` (String(200))
- `message` (Text)
- `notification_type` (String(20)) - info, success, warning, error
- `read` (Boolean, default: False)
- `read_at` (DateTime, nullable)
- `action_url` (String(500), nullable)
- `action_label` (String(100), nullable)
- `metadata` (JSONB, nullable)
- `created_at` (DateTime)
- `updated_at` (DateTime)

**Indexes:**
- `idx_notifications_user_id` - User lookup
- `idx_notifications_read` - Read status filtering
- `idx_notifications_created_at` - Date sorting
- `idx_notifications_type` - Type filtering
- `idx_notifications_user_read` - Composite (user_id, read)

## 🔧 Configuration

### Backend

No special configuration required. The notification system uses:
- Existing database connection
- Existing Celery setup (if using email notifications)
- Existing WebSocket infrastructure

### Frontend

The notification system is automatically configured. WebSocket connection:
- Uses `NEXT_PUBLIC_API_URL` environment variable
- Automatically converts HTTP to WebSocket protocol (ws/wss)
- Includes authentication token from TokenStorage

## 🧪 Testing

See `NOTIFICATION_SYSTEM_TESTING_GUIDE.md` for complete testing instructions.

### Quick Test

1. **Start backend:**
   ```bash
   cd backend
   alembic upgrade head  # Run migration
   uvicorn app.main:app --reload
   ```

2. **Start frontend:**
   ```bash
   cd apps/web
   npm run dev
   ```

3. **Create a notification:**
   ```bash
   curl -X POST http://localhost:8000/api/v1/notifications \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "user_id": 1,
       "title": "Test Notification",
       "message": "This is a test",
       "notification_type": "info"
     }'
   ```

4. **Check frontend:**
   - Login to the application
   - See notification bell in header
   - Click to see notification dropdown
   - Navigate to `/profile/notifications-list` for full list

## 📚 Related Documentation

- `NOTIFICATION_SYSTEM_IMPLEMENTATION_PLAN.md` - Complete implementation plan
- `NOTIFICATION_SYSTEM_TESTING_GUIDE.md` - Testing guide
- `NOTIFICATION_SYSTEM_QUICK_REFERENCE.md` - Quick reference
- `backend/API_ENDPOINTS.md` - API documentation
- `backend/DATABASE_SCHEMA.md` - Database schema
- `apps/web/src/components/notifications/README.md` - Component documentation

## 🎯 Customization

### Adding Custom Notification Types

1. Update `NotificationType` enum in `backend/app/models/notification.py`
2. Update TypeScript type in `apps/web/src/types/notification.ts`
3. Update component styles if needed

### Customizing Notification Display

The `NotificationCenter` component can be customized via props. For more control, use the base components (`NotificationBell`, `NotificationCenter`) with custom data.

### Email Templates

Email notifications use the EmailService. Customize templates in `backend/app/services/email_service.py` or create custom templates.

## ⚠️ Important Notes

- **User Scoping**: All endpoints automatically scope to the authenticated user
- **WebSocket**: Requires authentication token in query string
- **Celery**: Email notifications require Celery worker running
- **Database**: Run migration `021_add_notifications` before use
- **Performance**: Indexes are optimized for common queries

## 🔗 Integration Points

The notification system integrates with:
- **User System** - Notifications linked to users
- **Email System** - Optional email notifications
- **WebSocket System** - Real-time delivery
- **Celery** - Background task processing
- **Authentication** - JWT-based auth required

---

**Last Updated:** January 2025  
**Template Version:** Latest  
**Status:** ✅ Production Ready

