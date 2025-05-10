🛒 ecommerce_app
A full-stack E-Commerce Web Application built using Spring Boot (Java) for the backend and React.js with Material UI for the frontend. The app supports features like product catalog, user authentication (JWT), cart management, and a secure checkout process.

🚀 Features
✅ User Features
User registration and login with JWT-based authentication

Browse products in a responsive, dynamic catalog

Add/remove items from cart

View total quantity and price in cart

Secure checkout with customer details and order summary

🛠 Admin Features (optional)
Add, update, or delete products

View user orders and analytics (if extended)

🧰 Tech Stack
🔹 Backend – Spring Boot
Java 17

Spring MVC (REST APIs)

Spring Security (JWT Authentication, Role-Based Access)

Spring Data JPA

PostgreSQL

Maven

🔹 Frontend – React.js
React 18

Material UI

Axios

React Router

🗂 Folder Structure
bash
Copy
Edit
ecommerce_app/
├── backend/                # Spring Boot App
│   ├── src/main/java/com/shwetashaw/ecommerce_app
│   └── ...
├── frontend/               # React App
│   ├── public/
│   ├── src/
│   └── ...
└── README.md
📦 Setup & Installation
🔧 Backend
bash
Copy
Edit
cd backend
mvn clean install
# Run the Spring Boot app
mvn spring-boot:run
Make sure PostgreSQL is running and your application.properties is configured with correct DB credentials.

💻 Frontend
bash
Copy
Edit
cd frontend
npm install
npm start
The React app will start on http://localhost:3000 and make API calls to http://localhost:8080.

📌 API Endpoints (Sample)
POST /api/auth/register – Register a new user

POST /api/auth/login – Authenticate user

GET /api/products – Get product list

POST /api/cart – Add item to cart

POST /api/checkout – Checkout and place order

🔐 Security
JWT Token Authentication

Role-based Authorization (USER, ADMIN)

Secure API access using Spring Security

📸 Screenshots
(Add screenshots of product listing, cart, and checkout flow if available.)

📈 Future Enhancements
Admin dashboard with analytics

Search and filtering by category

Payment gateway integration

Order history and tracking

🧑‍💻 Author
Shweta Shaw
Connect on LinkedIn
Feel free to fork, clone, and contribute!
