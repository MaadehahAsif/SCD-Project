# Book Review App - Kubernetes Deployment

A full-stack MERN application for reviewing books, designed for containerized deployment with Docker, Kubernetes (Minikube), and GitHub Actions.

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
├── frontend/ # React app with Vite
├── backend/ # Express server
├── k8s/ # Kubernetes manifests
├── .github/workflows # GitHub Actions CI/CD
└── docker-compose.yml
```

## API Routes

- **GET /api/books**
- **GET /api/books/:id**
- **POST /api/books**
- **PUT /api/books/:id**
- **DELETE /api/books/:id**
- **GET /api/books/:id/reviews**
- **GET /api/reviews/:id**
- **POST /api/reviews**
- **PUT /api/reviews/:id**
- **DELETE /api/reviews/:id**

## Running Locally (Dev Mode)

### Prerequisites

- Node.js (v16 or higher)  
- MongoDB (local or Atlas)

### Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/book-review-app.git
cd book-review-app

# Install dependencies
npm run install:all
```

### Environment Variables

Create a `.env.local` in `frontend/` and `backend/` with the following:

**frontend/.env.local**

```bash
VITE_API_URL=http://localhost:5000/api
```

**backend/.env.local**

```ini
PORT=5000
MONGODB_URI=mongodb://localhost:27017/book-reviews
```

### Start Dev Servers

```bash
npm run dev
```

Then visit: [http://localhost:3000](http://localhost:3000)

## Docker Deployment

### Using Docker Compose

```bash
docker-compose up --build
```

App available at [http://localhost:3000](http://localhost:3000)

### Build Individually

```bash
# Backend
docker build -t yourusername/book-review-backend ./backend

# Frontend
docker build -t yourusername/book-review-frontend ./frontend
```

## Kubernetes Deployment (Minikube)

### Prerequisites

- Docker
- Minikube
- kubectl

### Steps

```bash
# Start Minikube
minikube start

# Use Minikube’s Docker daemon (for local images)
eval $(minikube docker-env)

# Apply Kubernetes manifests
kubectl create namespace bookreview
kubectl apply -f k8s/ --namespace=bookreview

# Access the frontend
minikube service frontend -n bookreview
```

## GitHub Actions CI/CD

A self-hosted runner can build, push, and deploy images to Minikube.

CI/CD config located in:

```
.github/workflows/deploy.yml
```

### Secrets Required

Add these in GitHub → Repo → Settings → Secrets → Actions:

- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`

## License

MIT