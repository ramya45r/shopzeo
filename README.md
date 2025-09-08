# Project Name

## Features Implemented

* User authentication & authorization (JWT-based)
* Role-based access control (Admin & User)
* Product listing with search and filter
* Product details page with add-to-cart functionality
* Cart management with local storage persistence
* Order creation and order history view
* Category management (Admin only)
* Product CRUD operations (Admin only)
* Image upload for products
* Responsive design for mobile & desktop
* Popup modal for product update

## Technology Stack

* **Frontend:** React.js, React Router, Axios
* **Backend:** Express.js, MongoDB, Mongoose, JWT
* **Additional Tools:** Multer (image upload), bcrypt (password hashing), dotenv (environment variables), CORS, nodemon (development)

## Setup Instructions

### 1. Prerequisites

* **Node.js** (v14+ recommended)
* **MongoDB** (local or cloud like MongoDB Atlas)

### 2. Installation Steps

```bash
# Clone repository
git clone https://github.com/ramya45r/shopzeo.git

# Install server dependencies
npm install



### 3. Environment Variables Setup

#### **Backend** (`backend/.env`)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_assessment
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

```


### 4. Run the Application

```bash
# Start backend
npm start


## API Endpoints

### **Auth**

* `POST /api/auth/register` – Register user
* `POST /api/auth/login` – Login user

### **Products**

* `GET /api/products` – Get all products
* `GET /api/products/:id` – Get product by ID
* `POST /api/products` – Create product (Admin)
* `PUT /api/products/:id` – Update product (Admin)
* `DELETE /api/products/:id` – Delete product (Admin)

### **Categories**

* `GET /api/categories` – Get all categories
* `POST /api/categories` – Create category (Admin)

### **Orders**

* `POST /api/orders` – Create order
* `GET /api/orders/my` – Get logged-in user's orders
* `GET /api/orders` – Get all orders (Admin)

---



