# Blog_App

Monorepo for a microservices-style blog platform. This repository contains a Gateway and multiple services (Authentication and others). This README summarizes the project structure, how to run services locally, and the current status of services (including which are pending / under construction).

## Project Structure

- `Server/`
  - `Gateway/` — API gateway that routes requests to services.
  - `Services/`
    - `Authentication-Service/` — Handles user login, registration, tokens.
    - `Notification-Service/` — Pending / Under Construction
    - `Follow-Service/` — Pending / Under Construction
    - (Other services may be added here)

> Note: Some service folders may be present or planned; notification and follow services are currently pending or under construction.

## Current Service Status

- Authentication-Service: Ready / Active (development in progress)

  - Entry: `Server/Services/Authentication-Service/src`
  - Start (development):
    - Ensure `.env` contains required variables (see "Environment Variables")
    - From `Server/Services/Authentication-Service`: `npm install` then `npm start`
  - Main endpoints (example):
    - `POST /api/auth/register` — Register/login user with googleId, email, name, picture
      - Example body:
        ```json
        {
          "googleId": "user-google-id-123",
          "email": "user@example.com",
          "name": "John Doe",
          "picture": "https://example.com/avatar.jpg"
        }
        ```

- Gateway: Ready / Active

  - Entry: `Server/Gateway/src`
  - Start: `npm install` then `npm start` (from `Server/Gateway`)

- Notification-Service: Pending / Under Construction

  - Status: Not yet implemented. Add a service under `Server/Services/Notification-Service` when ready.
  - Suggested endpoints:
    - `POST /api/notifications` — create notification
    - `GET /api/notifications/:userId` — list notifications for user

- Follow-Service: Pending / Under Construction
  - Status: Not yet implemented. Add a service under `Server/Services/Follow-Service` when ready.
  - Suggested endpoints:
    - `POST /api/follow` — follow a user
    - `POST /api/unfollow` — unfollow a user
    - `GET /api/followers/:userId` — list followers

## Blog-Service (recommended)

- Status: Recommended / Suggested (add under `Server/Services/Blog-Service`)

- Purpose: Manage blog posts, drafts, comments, tags and categories. Integrates with Authentication-Service for author identity and with Notification/Follow services when available.

- Suggested Entry: `Server/Services/Blog-Service/src`

- Suggested Features:

  - Create, update, delete and fetch posts (drafts and published)

- Suggested Models (Mongoose example fields):

  - `Post`:

  - userid: the user who create the blog,
  - title: the title of the blog.
  - content : the content of the post or blog.
  - timestamps

  - `Comment`:
    - `postId` (ObjectId ref `Post`)
    - `authorId` (ObjectId ref `User`)
    - `body` (String)
    - `createdAt`

- Suggested Endpoints (example base `/api/blog`):

  - `POST /api/blog/posts` — Create post (auth required)
  - `GET /api/blog/posts` — List posts (query: page, limit, tag, author, status)
  - `GET /api/blog/posts/:id` — Get post by id (or slug)
  - `PUT /api/blog/posts/:id` — Update post (auth/owner)
  - `DELETE /api/blog/posts/:id` — Delete post (auth/owner)
  - `POST /api/blog/posts/:id/comments` — Add comment
  - `GET /api/blog/posts/:id/comments` — List comments

- Environment variables (examples):

  - `PORT` — service port (e.g. `8002`)
  - `MONGODB_URI` — DB connection
  - `STORAGE_PROVIDER` — `local|cloudinary|s3`
  - `CLOUDINARY_URL` or `S3_*` credentials if using cloud storage

- Example curl to create a post:

```bash
curl -X POST http://localhost:8002/api/blog/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT>" \
  -d '{"title":"My post","body":"Contents...","tags":["node","express"]}'
```

- Implementation notes & recommendations:

  - Use `multer` (or a cloud SDK) for file uploads; store URLs in the DB.
  - Validate inputs with `Joi` or similar before controller logic.
  - Protect write endpoints with JWT middleware using `Authentication-Service` tokens.
  - Use indexes on `slug`, `authorId`, `tags`, and `publishedAt` for fast queries.
  - Implement optimistic counters for `likesCount` and `commentsCount` or update with incremental operators.

- Testing & CI suggestions:
  - Add unit tests for controllers and services.
  - Add integration tests against a test DB (or use in-memory MongoDB).
  - Add basic API contract tests for endpoints.

## Environment Variables (example)

Each service may require its own .env. Typical variables used across services include:

- `PORT` — port to run the service
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWT tokens
- `NODE_ENV` — `development` or `production`

Place a `.env` file inside the service folder (e.g. `Server/Services/Authentication-Service/.env`). Example:

```
PORT=8001
MONGODB_URI=mongodb://localhost:27017/blog_app
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

## Running the Project Locally

1. Install dependencies per service

```bash
# From the gateway folder
cd Server/Gateway
npm install

# From the authentication service
cd ../Services/Authentication-Service
npm install
```

2. Start services (in separate terminals)

```powershell
# Start Authentication Service
cd Server/Services/Authentication-Service
npm start

# Start Gateway
cd Server/Gateway
npm start
```

3. Test endpoints with curl/Postman

```bash
curl -X POST http://localhost:8001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"googleId":"g123","email":"user@example.com","name":"User"}'
```

Adjust's the host/port according to each service's `PORT` env var.

## Development Notes & Conventions

- Routes are typically mounted under `/api/<service>` (e.g. `/api/auth`).
- Use `node` v16+ or modern LTS.
- Use `nodemon` for live reload during development (many services already include it in `package.json`).
- Keep `.env` files out of source control — they are included in `.gitignore`.

## TODO / Roadmap

- [ ] Implement `Notification-Service` (pending)
- [ ] Implement `Follow-Service` (pending)
- [ ] Add CI / tests for services
- [ ] Add docker-compose for local multi-service orchestration

## Helpful Tips

- If controller endpoints aren't receiving expected data, confirm the gateway (if used) forwards JSON body and that the route and middleware ordering are correct (body parser before routes).
- Check console logs for debug messages (the authentication service logs incoming bodies to help debug registration flows).

---

If you want, I can:

- Add skeleton directories and starter files for `Notification-Service` and `Follow-Service` (controllers/routes/models)
- Create a `docker-compose.yml` to run MongoDB + services locally
- Expand the README with per-service detailed docs and environment requirements

Tell me which next step you want me to take.
