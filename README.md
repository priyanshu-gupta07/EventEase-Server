# EventEase Server

A microservices-based event management platform built with Node.js and MongoDB, featuring real-time updates and secure authentication.

![Screenshot from 2024-11-16 00-43-30](https://github.com/user-attachments/assets/82fe0002-2d8a-40f8-81ca-b46e9de9538f)

![Screenshot from 2024-11-16 00-43-46](https://github.com/user-attachments/assets/13b49819-aa29-410e-92ab-bbc967ba4148)

The front-end part is [here](https://github.com/priyanshu-gupta07/EventEase).

The website is live [here](https://event-ease-lyart.vercel.app)

## Architecture Overview

The system consists of three main microservices:
- User Service (Authentication & User Management)
- Event Service (Event Management & Real-time Updates)
- Booking Service (Booking Management)

## Tech Stack

- Node.js (18.x)
- Express.js
- MongoDB
- Socket.IO (Real-time updates)
- JWT (Authentication)
- Cloudinary (Image storage)
- Docker
- Cors (Cross-origin resource sharing)

## Prerequisites

- Node.js 18 or higher
- MongoDB
- Docker (optional)
- Cloudinary account

## Environment Variables

Create `.env` files in each service directory:

### User Service (.env)
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Event Service (.env)
```
PORT=3001
MONGODB_URI=your_mongodb_uri
APP_URL=your_frontend_url
GATEWAY_URL=your_gateway_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Booking Service (.env)
```
PORT=3002
MONGODB_URI=your_mongodb_uri
```

## Local Setup

### Without Docker

1. Clone the repository:
```bash
git clone https://github.com/priyanshu-gupta07/eventease-server.git
cd eventease-server
```

2. Install dependencies for each service:
```bash
# User Service
cd Server
npm install

# Event Service
cd ../EventService
npm install

# Booking Service
cd ../BookingService
npm install
```

3. Start each service:
```bash
# User Service
cd Server
node index.js

# Event Service
cd ../EventService
node index.js

# Booking Service
cd ../BookingService
node Server.js
```
4. Start Services simultaneously
``` bash
npm install
npm run start:all
```

### With Docker

1. Build Docker images for each service:
```bash
# User Service
cd Server
docker build -t eventease-user-service .

# Event Service
cd ../EventService
docker build -t eventease-event-service .

# Booking Service
cd ../BookingService
docker build -t eventease-booking-service .
```

2. Run Docker containers:
```bash
# User Service
docker run -p 3000:3000 --env-file .env eventease-user-service

# Event Service
docker run -p 3001:3001 --env-file .env eventease-event-service

# Booking Service
docker run -p 3002:3002 --env-file .env eventease-booking-service
```

3. You can All use the docker-compose
```bash
docker-compose -f eventserver.yaml up
```
Replace the environment variables  in the file with your variables. Now the backend is live 3001.

## API Endpoints

### User Service
- `POST /signup` - User registration
- `POST /login` - User authentication
- `POST /logout` - User logout

### Event Service
- `POST /` - Create event
- `GET /` - Get all events
- `GET /:id` - Get single event
- `PUT /:id` - Update event
- `DELETE /:id` - Delete event
- `GET /date/:date` - Filter by date
- `GET /organizer/:email` - Filter by organizer
- `GET /title/:title` - Search by title
- `GET /location/:location` - Filter by location
- `GET /tag/:tag` - Filter by tag
- `PUT /updateSeats/:id` - Update available seats

### Booking Service
- `GET /` - Get all bookings
- `POST /` - Create booking
- `PUT /:bookingId/:booking_status` - Update booking status
- `DELETE /:bookingId` - Delete booking
- `GET /user/:userId` - Get user bookings
- `GET /event/:eventId` - Get event bookings

## Features

- Real-time event updates using WebSocket
- Automatic cleanup of past events and bookings
- Image upload and storage with Cloudinary
- JWT-based authentication
- Cross-origin resource sharing
- Microservices architecture for scalability

## Maintenance

- Past events and bookings are automatically cleaned up every 24 hours
- Real-time seat updates are handled through WebSocket connections
- Images are stored and managed in Cloudinary

## Error Handling

- CORS errors are handled with specific origin allowances
- JWT verification errors return 401 Unauthorized responses
- Database connection errors are logged to console
