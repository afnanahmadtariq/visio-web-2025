# Backend Modifications Log

This document tracks all architectural decisions and modifications made to the backend system.

---

## Overview

The backend has been completely restructured to follow enterprise-grade patterns with a multi-layer architecture optimized for an e-commerce platform.

---

## Architecture

### 4-Layer Database Strategy

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Layer 1** | PostgreSQL + Prisma | Core relational data (users, products, orders, etc.) |
| **Layer 2** | MongoDB + Mongoose | Logs, monitoring, AI chat, analytics |
| **Layer 3** | Redis (Upstash) | Caching, rate-limiting, real-time features |
| **Layer 4** | Zod | API request validation and sanitization |

### Directory Structure

```
apps/backend/
├── prisma/
│   └── schema.prisma          # Complete e-commerce schema
├── src/
│   ├── config/
│   │   ├── env.ts             # Centralized environment config
│   │   └── index.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── product.controller.ts
│   │   ├── category.controller.ts
│   │   ├── cart.controller.ts
│   │   ├── order.controller.ts
│   │   ├── review.controller.ts
│   │   ├── wishlist.controller.ts
│   │   ├── address.controller.ts
│   │   └── index.ts
│   ├── db/
│   │   ├── prisma.ts          # Prisma client
│   │   ├── mongo.ts           # MongoDB connection
│   │   ├── redis.ts           # Redis/Upstash client
│   │   ├── models/            # MongoDB models
│   │   │   ├── AuthLog.ts
│   │   │   ├── AdminActionLog.ts
│   │   │   ├── PaymentLog.ts
│   │   │   ├── ErrorLog.ts
│   │   │   ├── RequestLog.ts
│   │   │   ├── AiChatLog.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── middlewares/
│   │   ├── validateRequest.middleware.ts
│   │   ├── security.middleware.ts
│   │   ├── auth.middleware.ts
│   │   ├── errorHandler.middleware.ts
│   │   ├── requestLogger.middleware.ts
│   │   └── index.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── product.routes.ts
│   │   ├── category.routes.ts
│   │   ├── cart.routes.ts
│   │   ├── order.routes.ts
│   │   ├── review.routes.ts
│   │   ├── wishlist.routes.ts
│   │   ├── address.routes.ts
│   │   ├── admin.routes.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── product.service.ts
│   │   ├── category.service.ts
│   │   ├── cart.service.ts
│   │   ├── order.service.ts
│   │   ├── review.service.ts
│   │   ├── wishlist.service.ts
│   │   ├── address.service.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── helpers.ts
│   │   ├── response.ts
│   │   └── index.ts
│   ├── validations/
│   │   ├── auth.validation.ts
│   │   ├── product.validation.ts
│   │   ├── category.validation.ts
│   │   ├── cart.validation.ts
│   │   ├── order.validation.ts
│   │   ├── payment.validation.ts
│   │   ├── review.validation.ts
│   │   ├── wishlist.validation.ts
│   │   ├── address.validation.ts
│   │   └── index.ts
│   └── main.ts                # Application entry point
├── .env.example
└── package.json
```

---

## Database Schema (Prisma)

### Core Models

| Model | Description |
|-------|-------------|
| `User` | User accounts with role-based access (USER/ADMIN) |
| `UserAuthProvider` | OAuth provider connections (Google, GitHub, etc.) |
| `UserAddress` | User shipping/billing addresses |
| `Category` | Product categories with hierarchical parent-child support |
| `Product` | Products with pricing, stock, and sale support |
| `ProductImage` | Product image gallery |
| `ProductCategory` | Many-to-many product-category relations |
| `Cart` & `CartItem` | Shopping cart system |
| `Order` & `OrderItem` | Order management with status tracking |
| `Payment` | Payment processing records |
| `Review` | Product reviews with ratings |
| `WishlistItem` | User wishlists |
| `CreditTransaction` | Virtual credit system |
| `BackInStockSubscription` | Stock notification subscriptions |

### Key Features

- **Soft Delete Support**: `deletedAt` field on critical models
- **Proper Indexing**: Optimized database queries
- **Cascade Deletes**: Automatic cleanup of related records
- **Decimal Precision**: Financial fields use Decimal type

---

## Security Implementation

### Middlewares Applied (in order)

1. **Helmet** - Security headers (XSS, CSP, etc.)
2. **CORS** - Cross-origin resource sharing
3. **Rate Limiting** - DDoS protection
4. **Body Parsing** - JSON/URL-encoded with size limits
5. **Mongo Sanitize** - NoSQL injection prevention
6. **Request Logger** - Audit logging to MongoDB

### Rate Limiters

| Limiter | Window | Max Requests |
|---------|--------|--------------|
| Global | 1 min | 100 |
| Login | 15 min | 5 |
| API | 1 min | 60 |
| Admin | 1 min | 30 |

### Authentication

- **JWT Access Tokens**: Short-lived (15min default)
- **JWT Refresh Tokens**: HTTP-only cookies (7 days)
- **Password Hashing**: bcrypt with 12 rounds
- **Account Locking**: After 5 failed login attempts

---

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | Login user | Public |
| POST | `/refresh` | Refresh access token | Public |
| POST | `/logout` | Logout user | Public |
| GET | `/me` | Get current profile | Private |
| PUT | `/password` | Change password | Private |

### Products (`/api/products`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | List products (filtered/paginated) | Public |
| GET | `/sale` | Get products on sale | Public |
| GET | `/category/:slug` | Get products by category | Public |
| GET | `/:idOrSlug` | Get product details | Public |
| GET | `/:id/reviews` | Get product reviews | Public |

### Categories (`/api/categories`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | List all categories | Public |
| GET | `/root` | List root categories | Public |
| GET | `/:idOrSlug` | Get category details | Public |

### Cart (`/api/cart`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get user's cart | Private |
| POST | `/` | Add item to cart | Private |
| PUT | `/:itemId` | Update item quantity | Private |
| DELETE | `/:itemId` | Remove item | Private |
| DELETE | `/` | Clear cart | Private |

### Orders (`/api/orders`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/checkout` | Create order | Private |
| GET | `/` | List user's orders | Private |
| GET | `/:id` | Get order details | Private |
| POST | `/:id/cancel` | Cancel order | Private |

### Reviews (`/api/reviews`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/my-reviews` | Get user's reviews | Private |
| POST | `/` | Create/update review | Private |
| PUT | `/:id` | Update review | Private |
| DELETE | `/:id` | Delete review | Private/Admin |

### Wishlist (`/api/wishlist`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get wishlist | Private |
| POST | `/:productId` | Add to wishlist | Private |
| DELETE | `/:productId` | Remove from wishlist | Private |
| GET | `/check/:productId` | Check if in wishlist | Private |
| DELETE | `/` | Clear wishlist | Private |

### Addresses (`/api/addresses`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get user's addresses | Private |
| GET | `/:id` | Get address details | Private |
| POST | `/` | Create address | Private |
| PUT | `/:id` | Update address | Private |
| DELETE | `/:id` | Delete address | Private |
| PUT | `/:id/default` | Set as default | Private |

### Admin (`/api/admin`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/products` | Create product | Admin |
| PUT | `/products/:id` | Update product | Admin |
| DELETE | `/products/:id` | Delete product | Admin |
| POST | `/categories` | Create category | Admin |
| PUT | `/categories/:id` | Update category | Admin |
| DELETE | `/categories/:id` | Delete category | Admin |
| PUT | `/orders/:id/status` | Update order status | Admin |

---

## MongoDB Logging Models

### AuthLog
- Tracks all authentication events (login, register, failures)
- Includes IP, user agent, and failure reasons

### AdminActionLog
- Tracks admin CRUD operations
- Stores before/after states for auditing

### PaymentLog
- Records all payment attempts and results
- Includes provider, amount, and status

### ErrorLog
- Captures all application errors
- Includes stack traces and request context

### RequestLog
- HTTP request/response logging
- Sanitizes sensitive data (passwords, tokens)

### AiChatLog
- AI chat conversation history
- User context and AI responses

---

## Caching Strategy (Redis)

### Cache Keys

| Key Pattern | TTL | Description |
|-------------|-----|-------------|
| `product:{id}` | 1 hour | Single product details |
| `products:list:*` | 5 min | Product listings |
| `categories:all` | 1 hour | All categories |
| `user:session:{id}` | 15 min | User session data |

### Cache Invalidation

- Products are invalidated on create/update/delete
- Automatic TTL expiration for time-sensitive data

---

## Credit System

The platform includes a virtual credit system for purchases:

- **Initial Bonus**: New users receive 500 credits
- **Transaction Types**:
  - `INITIAL_BONUS` - Welcome bonus
  - `PURCHASE_DEBIT` - Order payment
  - `REFUND_CREDIT` - Order cancellation refund
  - `MANUAL_ADJUSTMENT` - Admin adjustments

---

## Dependencies Added

### Production

```json
{
  "@prisma/client": "^6.0.0",
  "@upstash/redis": "^1.34.3",
  "bcrypt": "^5.1.1",
  "compression": "^1.7.4",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.21.2",
  "express-mongo-sanitize": "^2.2.0",
  "express-rate-limit": "^7.4.0",
  "helmet": "^8.0.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.8.0",
  "zod": "^3.23.8"
}
```

### Development

```json
{
  "@types/bcrypt": "^5.0.2",
  "@types/compression": "^1.7.5",
  "@types/cookie-parser": "^1.4.7",
  "@types/cors": "^2.8.17",
  "@types/express": "^5.0.0",
  "@types/jsonwebtoken": "^9.0.7",
  "prisma": "^6.0.0"
}
```

---

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd apps/backend
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Generate Prisma Client**
   ```bash
   npx nx run backend:prisma-generate
   ```

4. **Run Database Migrations**
   ```bash
   npx prisma migrate dev --schema apps/backend/prisma/schema.prisma
   ```

5. **Start Development Server**
   ```bash
   npx nx serve backend
   ```

---

## Pending/Future Enhancements

- [ ] DLL integration for admin product management
- [ ] OAuth providers (Google, GitHub)
- [ ] Email notifications
- [ ] Payment gateway integration (Stripe)
- [ ] WebSocket for real-time updates
- [ ] Image upload to cloud storage
- [ ] API documentation (Swagger/OpenAPI)

---

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2024-XX-XX | Initial backend architecture implementation | AI Assistant |
