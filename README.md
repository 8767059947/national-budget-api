National Budget API System
A robust and secure backend API built with Node.js, Express, and MongoDB to manage and track national budget allocations and expenditures for various government departments. This project features a complete authentication system with role-based access control, designed to serve as the foundation for a financial transparency web application.

## Features
Secure User Authentication: Full user registration and login system using JSON Web Tokens (JWTs).

Session Management: Secure session handling with HttpOnly cookies to protect against XSS attacks.

Password Hashing: User passwords are securely hashed using bcrypt before being stored.

Role-Based Access Control (RBAC): Custom middleware to differentiate between admin and viewer roles, protecting sensitive routes.

Department Management API: Full CRUD (Create, Read, Update, Delete) functionality for managing government departments (Admin only).

Budget Management API: Full CRUD functionality for managing budgets, which are linked to specific departments (Admin only).

Expenditure Tracking: Core feature to add and track individual expenditure records against a budget's total allocation.

## Tech Stack
Backend: Node.js, Express.js

Database: MongoDB with Mongoose (ODM)

Authentication: JSON Web Tokens (jsonwebtoken), Password Hashing (bcryptjs)

Middleware: cookie-parser for cookie management, cors for resource sharing.

## API Endpoints
### Authentication
Method	Endpoint	Description	Access
POST	/api/v1/users/register	Register a new user.	Public
POST	/api/v1/users/login	Log in a user and set auth cookie.	Public
POST	/api/v1/users/logout	Log out a user and clear cookie.	User
GET	/api/v1/users/profile	Get the current user's profile.	User

Export to Sheets
### Departments
Method	Endpoint	Description	Access
POST	/api/v1/departments	Create a new department.	Admin
GET	/api/v1/departments	Get a list of all departments.	User
PUT	/api/v1/departments/:id	Update a department by ID.	Admin
DELETE	/api/v1/departments/:id	Delete a department by ID.	Admin

Export to Sheets
### Budgets & Expenditures
Method	Endpoint	Description	Access
POST	/api/v1/budgets	Create a new budget for a department.	Admin
GET	/api/v1/budgets/department/:departmentId	Get all budgets for a specific department.	User
PUT	/api/v1/budgets/:budgetId	Update a budget's details by ID.	Admin
DELETE	/api/v1/budgets/:budgetId	Delete a budget by ID.	Admin
POST	/api/v1/budgets/:budgetId/expenditures	Add an expenditure record to a specific budget.	Admin

Export to Sheets
## Environment Variables
To run this project, you will need to add the following environment variables to a .env file in the root directory.

Code snippet

# Port for the server to run on
PORT=8080

# Your MongoDB connection string
MONGODB_URI=mongodb+srv://<username>:<password>@cluster-name.mongodb.net/your_db_name

# A strong, secret key for signing JWTs
JWT_SECRET=your-super-strong-and-secret-key

# The origin for CORS (e.g., your frontend URL)
CORS_ORIGIN=http://localhost:3000
## Installation and Setup
Follow these steps to get the project running on your local machine.

Clone the repository

Bash

git clone https://github.com/your-username/national-budget-api.git
Navigate to the project directory

Bash

cd national-budget-api
Install dependencies

Bash

npm install
Create a .env file in the root directory and add the environment variables as specified above.

Start the server

Bash

npm start
The server should now be running on the port you specified in your .env file.

