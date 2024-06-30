
## Setting Up the Project

### Prerequisites

- Node.js (version 18.x or higher)
- MongoDB (running instance or MongoDB Atlas)

### Installation Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/heis-abhinav/ecommerce_microservice.git
    cd ecommerce_microservice
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file at the root of the project by renaming sample.env and add the following:
    ```env
    MONGO_URI=mongodb://your_mongo_db_uri
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

4. **Start the server:**
    ```bash
    node server.js
    ```

Your server should now be running on the port specified in your `.env` file (default is 5000).

## API Documentation

### User Authentication

#### Register User
- **URL:** `/api/users/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```
- **Responses:**
    - `201 Created`: User registered successfully.
    - `400 Bad Request`: User already exists.
    - `500 Internal Server Error`: Server error.

#### Login User
- **URL:** `/api/users/login`
- **Method:** `POST`
- **Description:** Logs in a user and returns a JWT token.
- **Request Body:**
    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```
- **Responses:**
    - `200 OK`: Returns a JWT token.
    - `400 Bad Request`: Invalid credentials.
    - `500 Internal Server Error`: Server error.

### Product Management

#### Create Product
- **URL:** `/api/products/create`
- **Method:** `POST`
- **Description:** Creates a new product.
- **Request Headers:**
    - `x-auth-token`: JWT token
- **Request Body:**
    ```json
    {
        "name": "string",
        "description": "string",
        "price": "number",
        "quantity": "number"
    }
    ```
- **Responses:**
    - `201 Created`: Product created successfully.
    - `500 Internal Server Error`: Server error.

#### Get All Products
- **URL:** `/api/products/all`
- **Method:** `GET`
- **Description:** Retrieves all products.
- **Responses:**
    - `200 OK`: Returns a list of products.
    - `500 Internal Server Error`: Server error.

#### Get Product by ID or Name
- **URL:** `/api/products/:identifier`
- **Method:** `GET`
- **Description:** Retrieves a product by its ID or name.
- **Path Parameters:**
    - `identifier`: Product ID or name.
- **Responses:**
    - `200 OK`: Returns the product.
    - `404 Not Found`: Product not found.
    - `500 Internal Server Error`: Server error.

#### Update Product
- **URL:** `/api/products/update/:id`
- **Method:** `PUT`
- **Description:** Updates a product.
- **Request Headers:**
    - `x-auth-token`: JWT token
- **Path Parameters:**
    - `id`: Product ID.
- **Request Body:**
    ```json
    {
        "name": "string",
        "description": "string",
        "price": "number",
        "quantity": "number"
    }
    ```
- **Responses:**
    - `200 OK`: Product updated successfully.
    - `404 Not Found`: Product not found.
    - `500 Internal Server Error`: Server error.

#### Delete Product
- **URL:** `/api/products/delete/:id`
- **Method:** `DELETE`
- **Description:** Deletes a product.
- **Request Headers:**
    - `x-auth-token`: JWT token
- **Path Parameters:**
    - `id`: Product ID.
- **Responses:**
    - `200 OK`: Product deleted successfully.
    - `404 Not Found`: Product not found.
    - `500 Internal Server Error`: Server error.

### Protected Route Example

#### Access Protected Route
- **URL:** `/api/protected`
- **Method:** `GET`
- **Description:** Example of a protected route.
- **Request Headers:**
    - `x-auth-token`: JWT token
- **Responses:**
    - `200 OK`: Access to protected route.
    - `401 Unauthorized`: No token or invalid token.
