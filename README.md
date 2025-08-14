# 🏟️ Futsal Booking System

A MERN-stack web app to book futsal venues in Kathmandu with real-time availability, secure payments, and an admin dashboard.

---

## Features
- User registration/login.
- Search & filter venues.
- Real-time booking & Khalti payment integration.
- Venue owner portal for managing slots & pricing.
- Admin panel for user/venue management.
- Reviews & ratings.

---

## Tech Stack
**Frontend:** React.js, Next.js  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Payment:** Khalti API

---

## Setup

```bash
# Clone repo
git clone https://github.com/yourusername/futsal-booking-system.git
cd futsal-booking-system

# Install deps
npm install
cd client && npm install

# Environment variables (.env)
MONGO_URI=your_mongodb_uri
KHALTI_SECRET_KEY=your_khalti_secret
PORT=4000
NEXT_PUBLIC_API_URL=http://localhost:4000

# Run backend
npm run dev

# Run frontend
cd client && npm run dev
