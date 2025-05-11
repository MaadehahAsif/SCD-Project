# Book Review App - Kubernetes Demo

A full-stack MERN application for reviewing books, designed for Kubernetes/Minikube deployment demonstration.

## Features

- Browse a collection of books with ratings
- View detailed book information and reviews
- Write, edit, and delete book reviews
- Rate books with a 5-star system
- Responsive design for all devices

## Tech Stack

- **Frontend**: React with TypeScript (Vite)
- **Backend**: Express.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS

## Project Structure

```
/app
├── frontend/         # React app with Vite
├── backend/          # Express server
└── database/         # Seed data (built into the app)
```

## API Routes

- **GET /api/books** - Get all books
- **GET /api/books/:id** - Get book by ID
- **POST /api/books** - Create new book
- **PUT /api/books/:id** - Update book
- **DELETE /api/books/:id** - Delete book
- **GET /api/books/:id/reviews** - Get reviews for a book
- **GET /api/reviews/:id** - Get review by ID
- **POST /api/reviews** - Create new review
- **PUT /api/reviews/:id** - Update review
- **DELETE /api/reviews/:id** - Delete review

## Running Locally

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install:all
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   # Frontend Environment Variables
   VITE_API_URL=http://localhost:5000/api

   # Backend Environment Variables
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/book-reviews
   ```
4. Start the development servers:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Docker Deployment

### Using Docker Compose

1. Build and start containers:
   ```bash
   docker-compose up --build
   ```
2. Access the app at [http://localhost:3000](http://localhost:3000)

### Using Individual Dockerfiles

1. Build the frontend image:
   ```bash
   docker build -t book-review-frontend -f Dockerfile.frontend .
   ```
2. Build the backend image:
   ```bash
   docker build -t book-review-backend -f Dockerfile.backend .
   ```
3. Create a Docker network:
   ```bash
   docker network create book-review-network
   ```
4. Start MongoDB:
   ```bash
   docker run -d --name mongodb --network book-review-network -p 27017:27017 mongo
   ```
5. Start the backend:
   ```bash
   docker run -d --name backend --network book-review-network -p 5000:5000 -e MONGODB_URI=mongodb://mongodb:27017/book-reviews book-review-backend
   ```
6. Start the frontend:
   ```bash
   docker run -d --name frontend --network book-review-network -p 3000:80 book-review-frontend
   ```

## Kubernetes Deployment

Coming soon - instructions for Kubernetes deployment

## License

MIT