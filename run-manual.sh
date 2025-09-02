#!/bin/bash

echo "🚀 Starting Shop Management System manually..."

# Check prerequisites
echo "🔍 Checking prerequisites..."

# Check Java
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 21."
    exit 1
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+."
    exit 1
fi

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL client not found. Make sure database is running on port 5432."
fi

echo "✅ Prerequisites check completed"

# Start Backend
echo "🔧 Starting Backend..."
cd backend
mvn spring-boot:run &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 30

# Start Frontend
echo "🎨 Starting Frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "🎉 Services started successfully!"
echo ""
echo "📱 Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8080/api/v1"
echo ""
echo "🔑 Default login credentials:"
echo "   Admin: username=admin, password=admin123"
echo "   Staff: username=staff, password=staff123"
echo ""
echo "🛑 To stop services:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""

# Wait for user input to stop
read -p "Press Enter to stop all services..."
kill $BACKEND_PID $FRONTEND_PID
echo "✅ Services stopped"