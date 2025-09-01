# Shop Management System

A fullstack web application for managing an e-commerce shop with user management, product catalog, and order processing.

## Features

- **User Management**: Multi-role system (ADMIN, STAFF, CUSTOMER)
- **Product Catalog**: Product management with categories and inventory
- **Order Processing**: Complete order lifecycle management
- **Security**: JWT-based authentication and authorization
- **Modern UI**: Responsive design with TailwindCSS

## Tech Stack

### Backend
- Java 21
- Spring Boot 3.x
- Spring Data JPA
- Spring Security (JWT)
- PostgreSQL
- Maven

### Frontend
- React 18 with TypeScript
- Vite
- TailwindCSS
- Redux Toolkit
- React Router

## Project Structure

```
shop-management/
├── backend/                 # Spring Boot application
├── frontend/               # React application
├── docker-compose.yml      # Docker orchestration
└── README.md              # This file
```

## Quick Start

### Using Docker (Recommended)

1. Clone the repository
2. Run the entire stack:
   ```bash
   docker-compose up -d
   ```
3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - PostgreSQL: localhost:5432

### Manual Setup

#### Backend Setup
1. Navigate to `backend/`
2. Ensure Java 21 and Maven are installed
3. Run: `mvn spring-boot:run`

#### Frontend Setup
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`

## API Documentation

The backend API is versioned under `/api/v1` and includes:

- Authentication endpoints
- User management
- Product catalog
- Order management
- Inventory tracking

## Database Schema

- **User**: Authentication and user management
- **Product**: Product catalog with categories
- **Order**: Order processing and tracking
- **OrderItem**: Individual items in orders
- **Category**: Product categorization
- **Inventory**: Stock management

## Development

### Backend Development
- API endpoints follow REST conventions
- JWT-based authentication
- Comprehensive validation using Jakarta Validation
- DTOs for data transfer

### Frontend Development
- TypeScript for type safety
- Redux Toolkit for state management
- Responsive design with TailwindCSS
- React Router for navigation

## License

MIT License
