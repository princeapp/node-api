# Node.js API Project

## Description

This is a Node.js API project using Express, PostgreSQL, and JWT for authentication. It includes basic CRUD operations for products.

## Prerequisites

- Node.js
- PostgreSQL
- pgAdmin (optional, for managing the PostgreSQL database)
- Git

## Project Setup

### Clone the Repository

```sh
git clone https://github.com/princeapp/node-api.git
cd node-api
 
 ## Install Dependencies
 npm install

## Configure Environment Variables
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/mydatabase
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

## Initialize the Database
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL NOT NULL
);

## Running the Server
npm start

## Using Nodemon
npm run dev

## API Endpoints
<--Authentication-->

POST /api/register
Request: { "username": "xyz", "password": "qwerty" }
Response: { "id":1, "username": "xyz", "password": "encrypted_password" }

POST /api/login
Request: { "username": "xyz", "password": "qwerty" }
Response: { "token": "jwt_token" }

<--Products-->

POST /api/products
Headers: { "Authorization": "<token>" }
Request: { "name": "Product Name", "price": 100 }
Response: { "id": 1, "name": "Product Name", "price": 100 }

GET /api/products
Headers: { "Authorization": "<token>" }
Response: [ { "id": 1, "name": "Product Name", "price": 100 } ]

PUT /api/products/:id
Headers: { "Authorization": "<token>" }
Request: { "name": "Updated Product Name", "price": 150 }
Response: { "id": 1, "name": "Updated Product Name", "price": 150 }

DELETE /api/products/:id
Headers: { "Authorization": "<token>" }
Response: 204 No Content


## Running Tests
npm test



