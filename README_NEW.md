# ShopNext - Modern E-Commerce Platform

A full-stack e-commerce application built with **Next.js 16**, **MongoDB**, **NextAuth**, and **Stripe**. Features a responsive design, real-time shopping cart, flash sales with countdown timers, admin dashboard, and secure payment processing.

## 🎯 Features

### Customer Features
- 🛍️ **Product Browsing** - Browse products with category filtering (Men, Women, Accessories)
- 🔥 **Flash Sales** - Limited-time deals with countdown timers
- 🛒 **Shopping Cart** - Persistent cart with Zustand state management
- 💳 **Checkout** - Secure checkout process with Stripe integration
- 👤 **User Authentication** - Sign up, login, and profile management with NextAuth
- 🔍 **Product Search** - Search products by name, description, and tags
- ⭐ **Product Details** - View detailed product information with images and reviews
- 📱 **Responsive Design** - Mobile-friendly interface using Tailwind CSS
- 💬 **Toast Notifications** - Real-time user feedback with React Hot Toast

### Admin Features
- 📊 **Admin Dashboard** - Overview of sales and statistics
- 📦 **Product Management** - Create, edit, and delete products
- 📋 **Order Management** - View and manage customer orders
- 🏷️ **Flash Sale Management** - Create and manage flash sales with timers
- 🔐 **Admin Authentication** - Role-based access control

### Technical Features
- ⚡ **Server-Side Rendering** - Optimized performance with Next.js App Router
- 🗄️ **MongoDB** - NoSQL database for scalability
- 🔐 **Password Hashing** - Secure user authentication with bcryptjs
- 📧 **NextAuth** - Session management and authentication
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔌 **RESTful APIs** - Comprehensive backend API endpoints
- 📸 **Image Optimization** - Next.js Image component for performance

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.1.6 |
| **Frontend** | React 19.2.3, TypeScript 5 |
| **Styling** | Tailwind CSS 4, PostCSS 4 |
| **Database** | MongoDB 8.23.0 |
| **ODM** | Mongoose 8.23.0 |
| **Authentication** | NextAuth 4.24.13 |
| **Payment** | Stripe 20.3.1 |
| **State Management** | Zustand 5.0.11 |
| **Icons** | Lucide React 0.575.0 |
| **Toast Notifications** | React Hot Toast 2.6.0 |
| **Security** | bcryptjs 3.0.3 |
| **HTTP Client** | Axios 1.13.5 |
| **UI Components** | Headlessui React 2.2.9 |

## 📁 Project Structure

```
my-ecommerce/
├── app/                           # Next.js App Router
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page with hero & flash sales
│   ├── (auth)/                   # Auth pages group
│   │   ├── login/page.tsx        # Login page
│   │   └── register/page.tsx     # Registration page
│   ├── (shop)/                   # Shop pages group
│   │   ├── products/page.tsx     # Products listing with filters
│   │   └── [slug]/page.tsx       # Product detail page
│   ├── cart/page.tsx             # Shopping cart page
│   ├── checkout/page.tsx         # Checkout page
│   ├── admin/                    # Admin pages (protected)
│   │   ├── layout.tsx            # Admin layout
│   │   ├── dashboard/page.tsx    # Admin dashboard
│   │   ├── products/page.tsx     # Product management
│   │   └── orders/page.tsx       # Order management
│   └── api/                      # API routes
│       ├── auth/[...nextauth]/   # NextAuth configuration
│       ├── products/             # Products endpoints
│       │   ├── route.ts          # GET products, POST new product
│       │   ├── [id]/route.ts     # Product by ID operations
│       │   ├── flash-sale/       # Flash sale products
│       │   └── slug/[slug]/      # Product by slug
│       ├── admin/orders/         # Admin order endpoints
│       ├── cart/                 # Cart operations
│       ├── orders/               # Order placement
│       ├── seed/route.ts         # Database seeding
│       ├── test-db/route.ts      # DB connection test
│       └── webhooks/stripe/      # Stripe webhooks
├── components/                   # Reusable React components
│   ├── layout/
│   │   ├── Navbar.tsx           # Navigation bar
│   │   └── Providers.tsx        # Context providers (NextAuth, Zustand)
│   ├── product/
│   │   ├── ProductCard.tsx      # Product card component
│   │   ├── ProductGrid.tsx      # Product grid layout
│   │   ├── FlashSaleCard.tsx    # Flash sale card with timer
│   │   ├── FlashSaleSection.tsx # Flash sale section
│   │   └── FlashBanner.tsx      # Flash sale countdown banner
│   ├── cart/
│   │   └── CartDrawer.tsx       # Shopping cart drawer
│   └── ui/                      # UI utility components
├── hooks/
│   └── useFlashSale.ts          # Flash sale countdown logic
├── lib/
│   ├── auth.ts                  # NextAuth configuration
│   └── db.ts                    # MongoDB connection
├── models/                      # Mongoose schemas
│   ├── Product.ts               # Product model
│   ├── Order.ts                 # Order model
│   └── User.ts                  # User model
├── store/
│   └── cartStore.ts             # Zustand cart store
├── types/
│   └── index.ts                 # TypeScript type definitions
├── public/                      # Static assets
├── middleware.ts                # Next.js middleware
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
├── .env.local                   # Environment variables
└── package.json                 # Dependencies & scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB Atlas account (or local MongoDB)
- Stripe account (optional, for payment testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   # Database
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ecommerce

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # Stripe (optional)
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...

   # Admin
   ADMIN_EMAIL=admin@example.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Seed the database with sample products**
   Visit: `http://localhost:3000/api/seed`

6. **Open in browser**
   Navigate to `http://localhost:3000`

## 📌 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products with filtering/sorting |
| GET | `/api/products/flash-sale` | Get active flash sale products |
| GET | `/api/products/[id]` | Get product by ID |
| GET | `/api/products/slug/[slug]` | Get product by slug |
| POST | `/api/products` | Create new product (admin only) |
| PUT | `/api/products/[id]` | Update product (admin only) |
| DELETE | `/api/products/[id]` | Delete product (admin only) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create new order |
| GET | `/api/admin/orders` | Get all orders (admin only) |
| GET | `/api/admin/orders/[id]` | Get order details (admin only) |
| PUT | `/api/admin/orders/[id]` | Update order status (admin only) |

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| GET | `/api/auth/[...nextauth]` | NextAuth endpoints |

## 🔑 Key Routes

### Customer Routes
- `/` - Home page
- `/products` - All products
- `/products?category=men` - Men's products
- `/products?category=women` - Women's products
- `/products?category=sale` - Flash sales with timers
- `/products/[slug]` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/login` - Login page
- `/register` - Registration page

### Admin Routes
- `/admin/dashboard` - Dashboard overview
- `/admin/products` - Product management
- `/admin/orders` - Order management

## 💾 Database Schema

### Product Model
```typescript
{
  name: string
  slug: string (unique)
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  category: string
  tags: string[]
  stock: number
  rating: { average: number, count: number }
  isFlashSale: boolean
  flashSaleEndsAt?: Date
  createdAt: Date
  updatedAt: Date
}
```

### Order Model
```typescript
{
  userId: ObjectId
  items: [{ productId, quantity, price }]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  shippingAddress: { street, city, state, zip, country }
  stripePaymentId?: string
  createdAt: Date
  updatedAt: Date
}
```

### User Model
```typescript
{
  name: string
  email: string (unique)
  password: string (hashed)
  role: 'customer' | 'admin'
  image?: string
  emailVerified?: Date
  createdAt: Date
  updatedAt: Date
}
```

## 🎨 Features Walkthrough

### Flash Sales with Countdown
- Products marked as `isFlashSale: true` appear in the Flash Sales section
- Countdown timer shows time remaining until sale ends
- Special pricing during the last hour (higher discount)
- Beautiful gradient UI that changes color based on time remaining

### Shopping Cart
- Persistent cart using Zustand state management
- Add/remove items
- Update quantities
- View total price
- Cart drawer accessible from navbar

### Admin Dashboard
- View sales statistics
- Manage products (create, edit, delete)
- Manage orders (view, update status)
- Manage flash sales

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ NextAuth session management
- ✅ Role-based access control (admin only routes)
- ✅ Secure payment processing with Stripe
- ✅ CSRF protection
- ✅ HTTP-only cookies for sessions

## 📦 Build & Deployment

### Build for production
```bash
npm run build
npm run start
```

### Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy with one click

## 🐛 Troubleshooting

### Products not loading
- Run seed endpoint: `http://localhost:3000/api/seed`
- Check MongoDB connection in `.env.local`
- Verify MONGODB_URI is correct

### Categories not filtering
- Ensure products have correct category values: "men", "women", "accessories", "sale"
- Check browser console for API errors

### Cart not persisting
- Ensure browser allows localStorage
- Check Zustand store initialization

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

ShopNext - A modern e-commerce platform for the future of online shopping.
