# Doctor Appointment Booking System

## Overview

This project is a **Doctor Appointment Booking System** developed using the **MERN** stack (MongoDB, Express.js, React.js, Node.js). It allows patients to easily book appointments with doctors online, make secure payments via **M-Pesa** (through the M-Pesa STK Push API), and manage appointments effectively. The system is designed to be user-friendly, mobile-responsive, and offers real-time booking and payment functionality.

## Project Structure

This project consists of three main parts:

- **Frontend:** React.js application that handles user interactions (patient booking, payment processing).
- **Backend:** Node.js server with Express.js for handling API requests, business logic, and integration with the M-Pesa payment gateway.
- **Admin Panel (Optional):** A management interface to manage doctor profiles, appointments, and patient data.

## Features

- **Patient Account Creation and Login:** Secure patient authentication and profile management.
- **Doctor Listings:** View available doctors, their specialties, and consultation hours.
- **Real-Time Appointment Booking:** Book appointments based on available time slots.
- **M-Pesa Payment Integration:** Seamless payment processing through M-Pesa STK Push.
- **Appointment and Payment Confirmation:** Automatic recording and confirmation of appointments and payments.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Payment Integration:** M-Pesa Daraja API (STK Push)

## Installation Guide

To get started with the project, follow these steps:

### Prerequisites

Make sure you have **Node.js** and **npm** installed. You can check if you have them by running:

```bash
node -v
npm -v

Steps
Clone the repository:
  git clone https://github.com/odhiambow2354/DocAppointmentSystem.git
Navigate into the project directory:
  cd DocAppointmentSystem
Install the dependencies:

Navigate into the backend, frontend, and admin subdirectories, and install the necessary packages using npm install.
  cd backend && npm install
  cd frontend && npm install
  cd admin && npm install
Run the backend server:
  npm run server
Run the frontend:
  npm run dev
Run the admin interface
  npm run dev
