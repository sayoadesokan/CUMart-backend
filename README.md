# CUMart - CU Students E-commerce Store

CUMart is an e-commerce store exclusively for Covenant University students.
Link to the frontend - Backend build: https://jolly-florentine-15181f.netlify.app/

## Table of Contents

- [Endpoints](#endpoints)
  - [Student API](#student-api)
  - [Product API](#product-api)
  - [Admin API](#admin-api)
- [Packages Used](#packages-used)

## Endpoints

### Student API

- `POST /signup`: Register a new student account. (Endpoint: `studentRegister`)
- `POST /login`: Student login. (Endpoint: `studentLogin`)
- `GET /studentinfo`: Get student information. (Endpoint: `studentInfo`)
- `PUT /editaccount`: Edit student account. (Endpoint: `studentEditAccount`)
- `POST /addtowishlist`: Add a product to the student's wishlist. (Endpoint: `addToWishlist`)
- `GET /studentwishlist`: Get the student's wishlist. (Endpoint: `studentWishlist`)

### Product API

- `GET /getproduct`: Get all products. (Endpoint: `getProduct`)
- `GET /getsingleproduct/:productSlug`: Get a single product by its slug. (Endpoint: `getSingleProduct`)
- `GET /category/:category`: Get products by category. (Endpoint: `byCategory`)
- `GET /location/:hall`: Get products by hall location. (Endpoint: `byHall`)
- `POST /createproduct`: Create a new product. (Endpoint: `createProduct`)

### Admin API

- `POST /saveadmin`: Save admin login credentials. (Endpoint: `saveAdminLogin`)
- `POST /login`: Admin login. (Endpoint: `adminLogin`)
- `GET /loadallstudents`: Get access to all student accounts. (Endpoint: `getAccessAllStudents`)
- `GET /allgoods`: Admin access to all goods. (Endpoint: `adminAccessAllGoods`)
- `DELETE /deletegoods/:productslug`: Delete a product by its slug. (Endpoint: `adminDeleteGood`)

## Packages Used

- `bcrypt`: ^5.1.0
- `cloudinary`: ^1.37.1
- `cors`: ^2.8.5
- `express`: ^4.18.2
- `helmet`: ^7.0.0
- `jsonwebtoken`: ^9.0.0
- `mongoose`: ^7.2.2
- `multer`: ^1.4.5-lts.1
- `sharp`: ^0.32.1
