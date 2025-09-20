# 🛒 White Label Loyalty Supermarket

A modern grocery checkout application built with **React, TypeScript, and Next.js**, showcasing a complete e-commerce checkout flow with advanced discount logic, responsive design, and strong frontend architecture.

## 🌐 Live Demo
👉 [View Demo](https://white-label-loyalty-supermarket.vercel.app/)

## 🎯 Project Overview
Built as a technical assessment for a grocery business startup, this app demonstrates a supermarket checkout with product selection, cart management, discounts, and a smooth multi-step checkout experience.

### Core Products
| Code | Product       | Price  |
|------|---------------|--------|
| CA6  | Cake          | £2.00  |
| A21  | Kitty Litter  | £18.99 |
| G95  | Asparagus     | £0.83  |

## ✨ Features

- **Product Selection & Cart**: Add/remove with real-time quantity updates  
- **Discounts**:  
  - 20% off orders over £10  
  - BOGOF on Asparagus (G95)  
- **Checkout Flow**: Cart → Shipping → Payment → Confirmation  
- **Responsive UI**: Mobile-first design with Material-UI  
- **Dark Mode**: Toggle for light/dark themes with MUI theming  
- **Error & Loading States**: User-friendly feedback  
- **Validation**: Zod-powered forms with React Hook Form  

## 🛠️ Tech Stack

- **React 19 + Next.js 15** – Fullstack React framework  
- **TypeScript** – Static typing for reliability  
- **Material-UI (MUI)** – UI components and theming  
- **Redux Toolkit** – Global state management  
- **React Hook Form + Zod** – Form handling & validation  
- **Jest + RTL** – Unit and integration testing  

## 🏗️ Architecture & Approach

- **Frontend-first**: Emphasis on UI/UX, state management, and validation  
- **State Management**: Redux Toolkit for global state, local state for isolated UI logic  
- **Testing**: 100% coverage on Cart & Order logic, >80% on main checkout flow  
- **AI-Assisted Workflow**: Used Cursor AI for scaffolding and boilerplate, while **I owned architecture, design, reviews, and debugging**  

### Project Structure
```
src/
├── app/                    # Next.js app router
│   ├── api/               # API endpoints
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── checkout/          # Checkout flow components
│   ├── landing/           # Homepage components
│   ├── layout/            # Layout components
│   ├── shared/            # Shared components
│   └── ui/                # UI components
├── store/                 # Redux store
├── services/              # API services
├── types/                 # TypeScript types
├── hooks/                 # Custom hooks
├── utils/                 # Utility functions
└── theme/                 # MUI theme configuration
```

### State Management
- **Redux Toolkit** for global state (cart, user preferences)
- **React Hook Form** for form state management
- **Local state** for component-specific data

### API Design
- **RESTful endpoints** (`/api/products`, `/api/checkout`)
- **Type-safe request/response** with TypeScript interfaces
- **Error handling** with proper HTTP status codes
- **Validation** on both client and server side

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd white-lable-loyalty-supermarket

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## 🧪 Testing

The project includes comprehensive test coverage:

### Test Coverage
- **Cart Slice**: 100% coverage (Redux state management)
- **OrderService**: 100% coverage (API integration)
- **CartSummary**: 97.51% coverage (Checkout component)
- **CheckoutPage**: 82.14% coverage (Main checkout flow)

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Test Structure
- **Unit Tests**: Individual component and function testing
- **Integration Tests**: Component interaction testing
- **Mocking**: API calls and external dependencies
- **User Interactions**: Click events, form submissions, navigation

## 🎨 Design Decisions

### UI/UX Choices
- **Material-UI**: Chosen for rapid development and consistent design
- **Mobile-first**: Responsive design prioritizing mobile experience
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **Loading States**: Visual feedback for better user experience

## 🚀 Future Enhancements

### Potential Improvements
- **User Authentication**: Login/signup functionality
- **Order History**: Track previous orders
- **Inventory Management**: Stock levels and availability

### Technical Debt
- **Component Testing**: More comprehensive UI component tests
- **E2E Testing**: End-to-end test automation

## 🤝 Contributing

This project was built as a technical assessment. For any questions or feedback, please reach out through the appropriate channels.

## 📄 License

This project is proprietary and confidential.
