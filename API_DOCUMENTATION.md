# Smart Leads Dashboard API Documentation

Base URL:
- Local: `http://localhost:5000/api`
- Production: `https://<your-render-domain>/api`

Auth:
- JWT in `Authorization` header
- Format: `Bearer <token>`

## Health

### GET `/health`
Response `200`:
```json
{ "ok": true }
```

## Authentication

### POST `/auth/register`
Body:
```json
{
  "name": "John Doe",
  "email": "john@mail.com",
  "password": "password123",
  "role": "sales"
}
```
Notes:
- `role` is optional in request; backend currently registers new users as `sales`.

Response `201`:
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@mail.com",
    "role": "sales"
  }
}
```

### POST `/auth/login`
Body:
```json
{
  "email": "john@mail.com",
  "password": "password123"
}
```

Response `200`:
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@mail.com",
    "role": "sales"
  }
}
```

## Leads

### GET `/leads`
Query params:
- `status`: `new | contacted | qualified | lost`
- `source`: `website | instagram | referral`
- `search`: string (matches name/email)
- `sort`: `latest | oldest` (default `latest`)
- `page`: number (default `1`)
- `limit`: number (default `10`, max `100`)

Response `200`:
```json
{
  "data": [
    {
      "id": "lead-id",
      "name": "Rahul Sharma",
      "email": "rahul@mail.com",
      "status": "qualified",
      "source": "instagram",
      "createdAt": "2026-05-20T10:00:00.000Z",
      "createdById": "user-id"
    }
  ],
  "total": 1,
  "page": 1,
  "pages": 1
}
```

### GET `/leads/:id`
Response `200`:
```json
{
  "id": "lead-id",
  "name": "Rahul Sharma",
  "email": "rahul@mail.com",
  "status": "qualified",
  "source": "instagram",
  "createdAt": "2026-05-20T10:00:00.000Z",
  "createdById": "user-id"
}
```

### POST `/leads`
Roles:
- `admin`
- `sales`

Body:
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@mail.com",
  "status": "new",
  "source": "website"
}
```

Response `201`: created lead object.

### PUT `/leads/:id`
Roles:
- `admin`
- `sales` (own leads only)

Body same as create.
Response `200`: updated lead object.

### DELETE `/leads/:id`
Roles:
- `admin`
- `sales` (own leads only, as currently implemented)

Response `204` with no body.

## Error Format

Validation or auth errors are returned by route handlers with status codes like `400`, `401`, `403`, `404`, `409`.

Unhandled errors use centralized middleware:
```json
{
  "success": false,
  "message": "Internal server error"
}
```
