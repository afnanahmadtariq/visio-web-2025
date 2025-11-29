# Visio Web 2025


A production-oriented Nx monorepo for an e-commerce platform consisting of:
- Frontend: Next.js 16 (React 19), Tailwind, Radix UI component suite.
- Backend: Express + Prisma (PostgreSQL) + optional MongoDB (logging/auxiliary data) + Redis (Upstash) + JWT auth.

This README covers setup, architecture, development workflow, security measures, database/DLL usage, and deployment.

## 1. Repository Structure
```
apps/
  frontend/      Next.js application (app router, components, UI, pages)
  backend/       Express API (controllers, services, routes, middlewares, Prisma schema)
```
Supporting config: nx.json, tsconfig.base.json, eslint.config.mjs.

Backend layered folders:
- config: environment handling/validation (env.ts)
- controllers: HTTP handlers (delegate to services)
- services: business logic
- routes: route grouping under /api
- middlewares: security, logging, error handling, validation
- validations: (Zod expected) request schemas
- db: Prisma + Mongo connectors
- utils/lib: helpers

## 2. Prerequisites
- Node.js 20+
- PostgreSQL database (DATABASE_URL)
- (Optional) MongoDB instance (MONGO_URL) for supplemental storage
- (Optional) Upstash Redis (REDIS_URL, REDIS_TOKEN)
- (Optional) Cloudinary for media (CLOUDINARY_*)
- npm 9+

## 3. Environment Variables (.env)
Required minimum:
```
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=CHANGE_ME
REFRESH_TOKEN_SECRET=CHANGE_ME_TOO
CORS_ORIGIN=http://localhost:3000
```
Additional (optional/enhanced features):
```
PORT=10000
NODE_ENV=development
MONGO_URL=mongodb://...
REDIS_URL=...
REDIS_TOKEN=...
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
MAX_FAILED_LOGIN_ATTEMPTS=5
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=200
LOGIN_RATE_LIMIT_WINDOW_MS=300000
LOGIN_RATE_LIMIT_MAX=10
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAILJS_PUBLIC_KEY=
EMAILJS_PRIVATE_KEY=
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
DLL_USERNAME=
DLL_PASSWORD=
```
Never commit .env.

## 4. DLL Usage
Env vars `DLL_USERNAME` / `DLL_PASSWORD` reserved for authenticating against an external legacy/DLL integration (e.g. ERP or shipping). Suggested pattern:
- Wrap in `dll.service.ts` (lazy init, retry, timeout, circuit breaker).
- Inject credentials only from runtime environment/secret manager.
- Log metadata excluding sensitive values.
Security: rotate credentials, audit access, handle failures gracefully, never expose raw DLL errors to clients.

## 5. Security Measures (Implemented)
- Helmet with CSP (restricts sources).
- CORS: explicit origins list (comma-separated in env).
- Rate limiting: global, login, API, admin variants.
- express-mongo-sanitize blocks operator injection.
- Body size limit 10kb reduces attack surface.
- Env validation halts startup if critical secrets missing.
- Graceful shutdown disconnects Prisma.
Recommended next steps: Zod validation everywhere, account lock + alerting, add Permissions-Policy & HSTS via reverse proxy, structured logging, CSRF mitigation if cookie-based auth.

Frontend security: dompurify for sanitizing user content, Radix primitives for accessible & consistent components.

## 6. Development Workflow
Install deps:
```
npm install
```
Generate Prisma client:
```
npx nx run @visio/backend:prisma-generate
```
Migrate (dev):
```
npx nx run @visio/backend:prisma-migrate
```
Backend dev serve:
```
npx nx serve @visio/backend
```
Frontend dev:
```
npx nx dev frontend
```
Prisma Studio:
```
npx nx run @visio/backend:prisma-studio
```
Build frontend:
```
npx nx build frontend
```
Build backend:
```
npx nx build @visio/backend --configuration=production
```
Start built backend:
```
npx nx start @visio/backend
```
Show targets:
```
npx nx show project frontend
npx nx show project @visio/backend
```

## 7. Prisma Schema Highlights
Models: User (+AuthProvider, Address), Category (hierarchical), Product (+Images, Categories), Cart (+Items), Order (+Items, Payment), Review, WishlistItem, CreditTransaction, BackInStockSubscription. Indexed + composite keys for integrity & performance. Use Decimal for pricing.

## 8. Adding Features
1. Data model: edit schema.prisma → migrate → regenerate client.
2. Backend endpoint: service → controller → route file → aggregate in routes index.
3. Frontend page: add route under app/ (e.g. products/[slug]/page.tsx).

## 9. Validation
Adopt Zod schemas per route; enforce via a shared `validateRequest.middleware.ts`. Reject invalid input early, return 400 with structured error payload.

## 10. Error Handling
Use domain-specific Error classes; globalErrorHandler centralizes JSON formatting & hides internal stack traces in production.

## 11. Logging & Monitoring (Recommended)
Add pino/winston, correlation IDs, health endpoint `/api/health`, metrics (Prometheus) and tracing (OpenTelemetry) for performance insights.

## 12. Testing (Planned)
- Unit: services (Jest)
- Integration: API + Postgres test DB
- E2E: Playwright (frontend critical flows)
- Security: dependency & secret scanning in CI

## 13. Deployment Flow (CI/CD)
1. Inject secrets.
2. Install deps (cache node_modules).
3. Build: `nx run-many --target=build --projects=frontend,@visio/backend --configuration=production`.
4. Migrations: `nx run @visio/backend:prisma-migrate-deploy`.
5. Publish artifacts (frontend to CDN, backend dist/ to container/serverless).
6. Configure reverse proxy (TLS, compression, caching headers).
7. Enable observability & scaling (HPA / auto-scaling).

## 14. Performance
- Next image optimization & caching headers.
- Add Redis caching for product/category lookups.
- Minimize payload size; paginate large lists.
- Use DB indices (already defined) + query profiling.

## 15. Nx Tips
Graph: `npx nx graph`
Affected builds: `npx nx affected --target=build`
Console extension improves DX.

## 16. Security Checklist
- Secrets externalized & rotated
- Enforce HTTPS + HSTS
- Add validation & normalization everywhere
- Rate limit sensitive endpoints (done)
- Implement account lockout (env-driven thresholds)
- Regular dependency updates
- Monitor auth anomalies

## 17. DLL Integration Guidelines
- Isolate adapter, never leak raw DLL errors.
- Implement retries (exponential backoff, max attempts 3-5).
- Timeout <5s per call; abort controller on exceed.
- Map DLL responses to internal DTOs.
- Include circuit breaker to prevent cascading failures.

## 18. Common Commands
```
# Dev
npx nx dev frontend
npx nx serve @visio/backend
# Prisma
npx nx run @visio/backend:prisma-generate
npx nx run @visio/backend:prisma-migrate
# Build all
npx nx run-many --target=build --all
```

## 19. License
MIT (see LICENSE).

## 20. Contributing
1. Branch from main.
2. Implement feature + tests.
3. Update README if exposing new env vars.
4. Open PR; request review.

## 21. Troubleshooting
- Startup fail: missing env (validateEnv message).
- 429 errors: rate limit thresholds too low.
- CORS blocked: verify CORS_ORIGIN matches deployed frontend.
- Prisma client errors: regenerate + migrate.

## 22. Future Enhancements
- Add full test suite & CI pipeline
- Implement caching layer
- Role/permission granularity (RBAC)
- Real-time features (WebSockets)
- Observability stack (logs, metrics, tracing)

---
Review security checklist before production deployment; never commit secrets.




