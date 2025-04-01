# Backend

This directory contains all backend-related code for the SKPro application using Firebase.

## Structure
- `/functions` - Firebase Cloud Functions
- `firebase.json` - Firebase configuration

## Prerequisites
- Firebase account
- Firebase CLI installed globally:
  ```bash
  npm install -g firebase-tools
  ```
- Login to Firebase:
  ```bash
  firebase login
  ```

## Getting Started

```bash
cd backend
npm install
firebase use --add  # Select your Firebase project
npm run dev         # Start local emulators
```

## Deployment

```bash
npm run deploy
```

The Firebase Functions will be available at https://your-project-id.web.app/api/... 