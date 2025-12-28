# Notification System - Testing Guide

## 📋 Overview

This guide provides comprehensive testing instructions for the notification system.

## 🧪 Testing Checklist

### Backend Tests

- [ ] Database migration runs successfully
- [ ] Notification model creates correctly
- [ ] NotificationService CRUD operations work
- [ ] API endpoints return correct responses
- [ ] Authentication required for all endpoints
- [ ] Users can only access their own notifications
- [ ] WebSocket connection works with authentication
- [ ] Celery tasks create notifications correctly

### Frontend Tests

- [ ] NotificationBell displays correctly
- [ ] Badge shows correct unread count
- [ ] Dropdown opens and closes correctly
- [ ] NotificationCenter displays notifications
- [ ] Mark as read works
- [ ] Mark all as read works
- [ ] Delete notification works
- [ ] WebSocket receives new notifications
- [ ] Filters work correctly
- [ ] Pagination works correctly

### Integration Tests

- [ ] Create notification via API → appears in UI
- [ ] Mark as read → badge count updates
- [ ] WebSocket notification → appears instantly
- [ ] Email notification → email sent (if configured)

## 🚀 Quick Test

### 1. Setup

```bash
# Backend
cd backend
alembic upgrade head
uvicorn app.main:app --reload

# Frontend (new terminal)
cd apps/web
npm run dev
```

### 2. Create Test Notification

```bash
# Get auth token first (login via frontend or API)
TOKEN="your_jwt_token"

curl -X POST http://localhost:8000/api/v1/notifications \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "title": "Test Notification",
    "message": "This is a test notification",
    "notification_type": "info",
    "action_url": "/dashboard",
    "action_label": "Go to Dashboard"
  }'
```

### 3. Verify in Frontend

1. Login to application
2. Check notification bell in header (should show badge)
3. Click bell to see dropdown
4. Navigate to `/profile/notifications-list` for full list

### 4. Test WebSocket

1. Open browser console
2. Create notification via API
3. Should see notification appear instantly (no refresh needed)

## 📝 Manual Test Cases

### Test Case 1: Create Notification

**Steps:**
1. Login as user
2. Create notification via API
3. Check notification appears in bell dropdown
4. Check notification appears in notification center

**Expected:**
- Notification appears immediately
- Badge count increases
- Notification shows correct type, title, message

### Test Case 2: Mark as Read

**Steps:**
1. Create unread notification
2. Click "Mark as read" in dropdown
3. Check badge count decreases
4. Check notification shows as read in center

**Expected:**
- Badge count decreases
- Notification marked as read
- `read_at` timestamp set

### Test Case 3: Mark All as Read

**Steps:**
1. Create multiple unread notifications
2. Click "Mark all as read"
3. Check all notifications marked as read
4. Check badge count is 0

**Expected:**
- All notifications marked as read
- Badge count is 0
- All `read_at` timestamps set

### Test Case 4: Delete Notification

**Steps:**
1. Create notification
2. Click delete button
3. Check notification removed from list
4. Check badge count decreases

**Expected:**
- Notification removed from list
- Badge count decreases
- Notification deleted from database

### Test Case 5: WebSocket Real-Time

**Steps:**
1. Open application in browser
2. Open browser console
3. Create notification via API (different terminal)
4. Check notification appears instantly

**Expected:**
- Notification appears without page refresh
- Badge count updates automatically
- WebSocket connection logs visible in console

### Test Case 6: Filtering

**Steps:**
1. Create notifications of different types
2. Navigate to `/profile/notifications-list?filter=unread`
3. Check only unread shown
4. Navigate to `/profile/notifications-list?type=info`
5. Check only info notifications shown

**Expected:**
- Filters work correctly
- URL params update correctly
- Correct notifications displayed

### Test Case 7: Pagination

**Steps:**
1. Create more than 100 notifications
2. Navigate to notification center
3. Check pagination controls
4. Navigate through pages

**Expected:**
- Pagination works correctly
- Correct number of notifications per page
- Navigation between pages works

## 🔧 Automated Tests

### Backend Tests

```bash
cd backend
pytest tests/test_notifications.py -v
```

### Frontend Tests

```bash
cd apps/web
npm run test notifications
```

## 🐛 Common Issues

### Issue: Notifications not appearing

**Check:**
- Database migration ran: `alembic upgrade head`
- User is authenticated
- API endpoint returns 200
- WebSocket connected (check console)

### Issue: WebSocket not connecting

**Check:**
- Token is valid
- WebSocket URL correct (ws://localhost:8000/api/v1/ws/notifications)
- Backend WebSocket endpoint running
- CORS configured correctly

### Issue: Badge count incorrect

**Check:**
- `useNotificationCount` hook is used
- Query key matches
- Cache invalidation working
- API returns correct count

### Issue: Email notifications not sending

**Check:**
- Celery worker running
- Email service configured
- SMTP settings correct
- Email templates exist

## 📊 Performance Testing

### Load Test

```bash
# Create 1000 notifications
for i in {1..1000}; do
  curl -X POST http://localhost:8000/api/v1/notifications \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"user_id\": 1, \"title\": \"Test $i\", \"message\": \"Test\", \"notification_type\": \"info\"}"
done
```

### Check Performance

- Page load time with 1000 notifications
- Filter performance
- WebSocket message handling speed
- Database query performance

## ✅ Acceptance Criteria

- [ ] All notifications persist in database
- [ ] Real-time updates work via WebSocket
- [ ] Badge count is accurate
- [ ] All CRUD operations work
- [ ] Filters and pagination work
- [ ] Email notifications send (if configured)
- [ ] Performance is acceptable (< 500ms for list)
- [ ] No memory leaks
- [ ] WebSocket reconnects on disconnect

---

**Last Updated:** January 2025  
**Status:** ✅ Ready for Testing
