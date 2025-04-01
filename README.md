# SKPro Project

This is the main repository for the SKPro project, organized with a monorepo structure containing both frontend and backend code.

## Project Structure

This project is organized into two main directories:

- **frontend/** - Next.js frontend application
- **backend/** - Firebase backend services

## Frontend

### Technology Stack

- [Next.js](https://nextjs.org) - React framework
- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

### Structure

- `frontend/src` - Source code
  - `/app` - Next.js App Router pages and layouts
  - `/components` - Reusable UI components
  - `/lib` - Utility functions and shared code
- `frontend/public` - Static assets

## Backend

### Technology Stack

- [Firebase](https://firebase.google.com/) - Backend platform
  - Cloud Functions - Serverless compute
  - Firestore - NoSQL database
  - Firebase Authentication - User authentication

### Structure

- `backend/functions` - Firebase Cloud Functions
- `backend/firebase.json` - Firebase configuration

## Getting Started

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at http://localhost:3000

### Backend Development

```bash
cd backend
npm install
npm run dev  # Starts Firebase emulators
```

The Firebase emulators will be available at http://localhost:4000 (Emulator UI)

## Deployment

- **Frontend**: Deploy to Vercel or other hosting providers
  ```bash
  cd frontend
  npm run build
  # Deploy using your preferred hosting platform
  ```

- **Backend**: Deploy to Firebase
  ```bash
  cd backend
  firebase deploy
  ```

## Learn More

### Frontend Resources

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

### Backend Resources

- [Firebase Documentation](https://firebase.google.com/docs) - comprehensive Firebase documentation
- [Firebase Functions](https://firebase.google.com/docs/functions) - Cloud Functions documentation
