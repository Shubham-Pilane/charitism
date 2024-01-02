# charitism

# API Documentation

This document provides an overview of the API routes for the User and Todo functionalities in application.

## User Routes

### 1. Sign Up
- **Endpoint:** `/signup`
- **Method:** POST
- **Description:** Create a new user account.
- **Body:** 
  - `username` - The user's name.
  - `email` - The user's email address.
  - `password` - The user's password.

### 2. Login
- **Endpoint:** `/login`
- **Method:** POST
- **Description:** Authenticate an existing user.
- **Body:**
  - `email` - The user's email address.
  - `password` - The user's password.

## Todo Routes

### 1. Add a Todo
- **Endpoint:** `/addtodo`
- **Method:** POST
- **Description:** Create a new todo item.
- **Authorization:** Required
- **Body:**
  - Additional todo details.

### 2. Get All Todos
- **Endpoint:** `/`
- **Method:** GET
- **Description:** Retrieve all todo items for the logged-in user.
- **Authorization:** Required

### 3. Update a Todo
- **Endpoint:** `/update/:id`
- **Method:** PATCH
- **Description:** Update a specific todo item.
- **Authorization:** Required
- **Parameters:**
  - `id` - The ID of the todo to update.
- **Body:**
  - Fields to be updated.

### 4. Delete a Todo
- **Endpoint:** `/delete/:id`
- **Method:** DELETE
- **Description:** Delete a specific todo item.
- **Authorization:** Required
- **Parameters:**
  - `id` - The ID of the todo to delete.

## General Information

- All routes require JSON format for input and output.
- Authentication is required for accessing and manipulating todo items.
- Error handling is implemented for invalid routes, methods, or data.

## Setup and Installation

1) npm install
2) node index.js (Server will start locally)

## This server is deployed as well 


