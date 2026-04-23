# Lakhara Digital News - Java Backend

This is the secure and powerful Java backend for the Lakhara Digital News Network, built with **Spring Boot 3**, **Spring Security**, and **JPA**.

## 🚀 Key Features
- **Secure REST API**: Protected by JWT (JSON Web Tokens).
- **Role-Based Access Control**: Different permissions for ADMIN, EDITOR, and USER.
- **Unified Database**: Supports Articles, Categories, Matrimonial Profiles, Products, and more.
- **AI-Ready Schema**: Designed to easily accommodate future AI features.
- **Admin Panel Ready**: Backend support for the complete administrative dashboard.

## 🛠️ Technology Stack
- **Framework**: Spring Boot 3.x
- **Security**: Spring Security + JWT
- **Data**: Spring Data JPA + Hibernate
- **Database**: H2 (In-memory for Dev) / MySQL (For Production)
- **Tooling**: Maven, Lombok

## 📋 Prerequisites
- **Java 17** or higher installed.
- **Maven** installed.

## 🏃 How to Run

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2.  **Build the project**:
    ```bash
    mvn clean install
    ```

3.  **Run the application**:
    ```bash
    mvn spring-boot:run
    ```

The server will start on `http://localhost:8080`.

## 🔒 Security
The APIs are secured. You must first register/login to get a JWT token.
- `POST /api/auth/register`: Create a new user.
- `POST /api/auth/login`: Get a JWT token.
- Use the token in the `Authorization: Bearer <token>` header for protected routes.

## 📂 Project Structure
- `com.lakhara.news.entity`: JPA Database entities.
- `com.lakhara.news.repository`: Data access interfaces.
- `com.lakhara.news.service`: Business logic layer.
- `com.lakhara.news.controller`: REST API endpoints.
- `com.lakhara.news.security`: JWT and Security configurations.

## 🔗 Frontend Integration
Update your React frontend services (e.g., `samajService.ts`, `database.ts`) to fetch data from `http://localhost:8080/api/...` instead of Firebase.

Example:
```typescript
const response = await fetch('http://localhost:8080/api/articles');
const data = await response.json();
```
