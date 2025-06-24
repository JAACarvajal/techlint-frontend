# Frontend Setup Guide

## Prerequisites

Make sure you have the following installed on your system:

- [Git](https://git-scm.com/)
- [NPM](https://www.npmjs.com/)
- [Node](https://nodejs.org/en)

## Setup Instructions

1. **Clone repository**
   ```sh
   # Using https
   git clone https://github.com/JAACarvajal/techlint-frontend.git
   ```
2. **Create your `.env` file**
   Copy the example environment file and adjust variables as needed:

   ```sh
   cp .env.example .env
   # Edit .env as required
   ```

3. **To install dependencies, you can choose either of the following methods:**

   - Though when running docker compose automatically installs dependencies, this is to make sure you have installed them
   - **A. On your local machine:**
     1. Run `npm install` in your project directory
     2. Run:
        ```sh
        docker compose up --build -d
        ```
   - **B. Inside the Docker container:**
     1. Run:
        ```sh
        docker compose up --build -d
        ```
     2. Enter the `techlint-frontend-app-1` container (via Docker CLI or Docker Desktop)
     3. Inside the container, run:
        ```sh
        npm install
        ```

4. **Check webpage:**
   Access [http://localhost:5173](http://localhost:5173) in your browser

---

## Pages

#### Prerequisites

- Make sure you have setup all backend services

1. **[Login](http://localhost:5173/login)**
2. **[Register](http://localhost:5173/register)**
3. **[Home](http://localhost:5173/home)**
   - Tabs
     - IP Addresses
       - Features
         - Add IP address
         - Update IP addresses
         - Delete IP addresses
         - Logout User
         - Filter IP addresses based on date and columns
         - Sort IP addresses based on columns
         - Pagination
     - Audit Log
       - Features
         - Filter audit logs based on date and columns
         - Sort audit logs based on columns
         - Pagination
