# Troubleshooting Guide

## Common Issues and Solutions

### 1. Docker Build Errors

#### Issue: "COPY target/*.jar app.jar" Error
**Solution**: The backend Dockerfile has been updated to build the JAR file during the Docker build process. This error should no longer occur.

#### Issue: "No space left on device"
**Solution**: 
```bash
# Clean up Docker system
docker system prune -a
docker volume prune
```

#### Issue: "Connection refused" or "Port already in use"
**Solution**: 
```bash
# Check if ports are in use
lsof -i :3000
lsof -i :8080
lsof -i :5432

# Stop any conflicting services
sudo systemctl stop postgresql  # if using local PostgreSQL
```

### 2. Memory Issues

#### Issue: "Out of memory" during build
**Solution**: 
- Increase Docker memory limit to at least 4GB
- In Docker Desktop: Settings → Resources → Memory → 4GB

### 3. Service Startup Issues

#### Issue: Services not starting properly
**Solution**: 
```bash
# Check service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres

# Restart services
docker-compose down
docker-compose up --build -d
```

#### Issue: Database connection errors
**Solution**: 
```bash
# Wait for database to be ready
docker-compose logs postgres

# Check if database is accessible
docker exec -it shop_management_db psql -U postgres -d shop_management
```

### 4. Frontend Issues

#### Issue: Frontend not loading
**Solution**: 
```bash
# Check if frontend is built correctly
docker-compose logs frontend

# Rebuild frontend
docker-compose build frontend
docker-compose up -d frontend
```

### 5. Backend Issues

#### Issue: Backend not starting
**Solution**: 
```bash
# Check backend logs
docker-compose logs backend

# Check if Java/Maven build succeeded
docker-compose build backend --no-cache
```

### 6. Network Issues

#### Issue: Services can't communicate
**Solution**: 
```bash
# Check network
docker network ls
docker network inspect shop-management_shop_network

# Recreate network
docker-compose down
docker network prune
docker-compose up -d
```

## Manual Setup (Alternative to Docker)

If Docker continues to cause issues, you can run the services manually:

### Backend Setup
```bash
cd backend

# Install Java 21 and Maven
# On macOS: brew install openjdk@21 maven
# On Ubuntu: sudo apt install openjdk-21-jdk maven

# Build and run
mvn clean install
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend

# Install Node.js 18+
# On macOS: brew install node
# On Ubuntu: curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install dependencies and run
npm install
npm run dev
```

### Database Setup
```bash
# Install PostgreSQL
# On macOS: brew install postgresql
# On Ubuntu: sudo apt install postgresql postgresql-contrib

# Create database
createdb shop_management

# Update backend/src/main/resources/application.yml with your database credentials
```

## Environment Variables

If you need to customize the setup, you can create a `.env` file:

```bash
# .env
POSTGRES_DB=shop_management
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/shop_management
```

## Performance Optimization

### For Development
```bash
# Use volume mounts for faster development
docker-compose -f docker-compose.dev.yml up -d
```

### For Production
```bash
# Use production-optimized images
docker-compose -f docker-compose.prod.yml up -d
```

## Logs and Debugging

### View All Logs
```bash
docker-compose logs -f
```

### View Specific Service Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Debug Container
```bash
# Access running container
docker exec -it shop_management_backend bash
docker exec -it shop_management_frontend sh
```

## Reset Everything

If you need to start completely fresh:

```bash
# Stop and remove everything
docker-compose down -v --rmi all

# Remove all Docker resources
docker system prune -a -f
docker volume prune -f
docker network prune -f

# Rebuild from scratch
./setup.sh
```

## Getting Help

If you continue to experience issues:

1. Check the logs: `docker-compose logs`
2. Verify Docker installation: `docker --version && docker-compose --version`
3. Check system resources: `docker system df`
4. Review the setup script output for specific error messages
