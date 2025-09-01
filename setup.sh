#!/bin/bash

echo "🚀 Setting up Shop Management System..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Stop any existing containers
echo "🛑 Stopping any existing containers..."
docker-compose down

# Remove any existing images to ensure fresh build
echo "🧹 Cleaning up existing images..."
docker-compose down --rmi all

# Build and start the services
echo "🔨 Building and starting services..."
docker-compose up --build -d

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the error messages above."
    echo "💡 Common solutions:"
    echo "   - Make sure Docker has enough memory (at least 4GB)"
    echo "   - Try running: docker system prune -a"
    echo "   - Check if ports 3000, 8080, and 5432 are available"
    exit 1
fi

echo "⏳ Waiting for services to start..."
sleep 45

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

# Check if all services are healthy
echo "🏥 Checking service health..."
for i in {1..5}; do
    if docker-compose ps | grep -q "Up"; then
        echo "✅ Services are running successfully!"
        break
    else
        echo "⏳ Waiting for services to be ready... (attempt $i/5)"
        sleep 10
    fi
done

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📱 Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8080"
echo "   Database: localhost:5432"
echo ""
echo "🔑 Default login credentials:"
echo "   Admin: username=admin, password=admin123"
echo "   Staff: username=staff, password=staff123"
echo ""
echo "📚 Useful commands:"
echo "   View logs: docker-compose logs -f"
echo "   View specific service logs: docker-compose logs -f backend"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   Rebuild: docker-compose up --build -d"
echo ""
echo "🔧 Development:"
echo "   Backend: cd backend && mvn spring-boot:run"
echo "   Frontend: cd frontend && npm install && npm run dev"
echo ""
echo "📖 API Documentation:"
echo "   Backend API: http://localhost:8080/api/v1"
echo "   Order API: See backend/ORDER_API_DOCUMENTATION.md"
echo ""
