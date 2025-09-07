# Khắc phục vấn đề Liquibase không chạy sample data

## 🔍 **Nguyên nhân chính**

Liquibase chưa chạy insert sample data vì:

1. **PostgreSQL chưa được cài đặt**
2. **Database `shop_management` chưa được tạo**
3. **Backend chưa kết nối được database**
4. **Liquibase chưa được khởi động**

## 🛠️ **Cách khắc phục**

### **Bước 1: Cài đặt PostgreSQL**

```bash
# Cài đặt PostgreSQL
brew install postgresql

# Khởi động PostgreSQL service
brew services start postgresql

# Cài đặt PostgreSQL client tools
brew install postgresql-client
```

### **Bước 2: Tạo Database**

```bash
# Kết nối PostgreSQL
psql postgres

# Tạo database
CREATE DATABASE shop_management;

# Tạo user (tùy chọn)
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE shop_management TO postgres;

# Thoát
\q
```

### **Bước 3: Kiểm tra kết nối**

```bash
# Test kết nối database
psql -U postgres -d shop_management -c "SELECT version();"
```

### **Bước 4: Khởi động Backend**

```bash
cd backend
mvn spring-boot:run
```

### **Bước 5: Kiểm tra Liquibase logs**

Trong logs backend, tìm các dòng:
```
INFO  - Starting Liquibase...
INFO  - Running Changeset: db-changelog-001-initial-schema.sql::001
INFO  - Running Changeset: db-changelog-002-sample-data.sql::002
```

## 🔧 **Cấu hình cần kiểm tra**

### **application.yml**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/shop_management
    username: postgres
    password: postgres
    driver-class-name: org.postgresql.Driver
  
  liquibase:
    enabled: true
    change-log: classpath:db/changelog/db-changelog-master.xml
    contexts: dev
```

### **pom.xml dependencies**
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>org.liquibase</groupId>
    <artifactId>liquibase-core</artifactId>
</dependency>
```

## 🧪 **Test Liquibase**

### **Kiểm tra database có dữ liệu**

```sql
-- Kết nối database
psql -U postgres -d shop_management

-- Kiểm tra tables
\dt

-- Kiểm tra dữ liệu
SELECT COUNT(*) FROM categories;
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM products;

-- Kiểm tra users
SELECT username, role, email FROM users;

-- Kiểm tra products
SELECT name, price, condition FROM products LIMIT 5;
```

### **Kiểm tra Liquibase tracking table**

```sql
-- Kiểm tra changelog tracking
SELECT * FROM databasechangelog;

-- Kiểm tra lock table
SELECT * FROM databasechangeloglock;
```

## 🚨 **Các lỗi thường gặp**

### **1. Database connection failed**
```
Error: Connection to localhost:5432 refused
```
**Giải pháp**: Khởi động PostgreSQL service

### **2. Database does not exist**
```
Error: database "shop_management" does not exist
```
**Giải pháp**: Tạo database `shop_management`

### **3. Permission denied**
```
Error: permission denied for database shop_management
```
**Giải pháp**: Cấp quyền cho user postgres

### **4. Liquibase lock**
```
Error: Could not acquire change log lock
```
**Giải pháp**: 
```sql
DELETE FROM databasechangeloglock;
```

## 🔄 **Reset và chạy lại**

### **Reset database hoàn toàn**

```bash
# Xóa database
psql -U postgres -c "DROP DATABASE IF EXISTS shop_management;"

# Tạo lại database
psql -U postgres -c "CREATE DATABASE shop_management;"

# Khởi động backend
cd backend
mvn spring-boot:run
```

### **Force Liquibase update**

```bash
# Chạy Liquibase manually
mvn liquibase:update
```

## 📋 **Checklist khắc phục**

- [ ] PostgreSQL đã cài đặt và chạy
- [ ] Database `shop_management` đã tạo
- [ ] User `postgres` có quyền truy cập
- [ ] Backend có thể kết nối database
- [ ] Liquibase enabled trong application.yml
- [ ] Changelog files tồn tại và đúng format
- [ ] Backend khởi động thành công
- [ ] Liquibase logs hiển thị changesets đã chạy
- [ ] Database có dữ liệu sample

## 🎯 **Kết quả mong đợi**

Sau khi khắc phục thành công:

1. **Database tables**: categories, users, products, orders, order_items, inventory
2. **Sample data**:
   - 9 categories
   - 4 users (admin, staff1, customer1, john_doe)
   - 24 products (8 new phones, 8 used phones, 8 accessories)
   - 2 sample orders
3. **Liquibase tracking**: databasechangelog table có records

## 🆘 **Nếu vẫn không hoạt động**

1. **Kiểm tra logs backend** chi tiết
2. **Test database connection** manually
3. **Kiểm tra file permissions** của changelog files
4. **Verify PostgreSQL version** compatibility
5. **Check Spring Boot version** và Liquibase compatibility

## 📞 **Debug commands**

```bash
# Kiểm tra PostgreSQL status
brew services list | grep postgresql

# Kiểm tra port 5432
lsof -i :5432

# Test connection
telnet localhost 5432

# Kiểm tra logs
tail -f /usr/local/var/log/postgres.log
```
