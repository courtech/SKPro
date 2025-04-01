# SKPro Project Structure

This document explains the organization of the SKPro project.

## Directory Structure

```
SKPro/
├── README.md             # Main project documentation
├── PROJECT_STRUCTURE.md  # This file
├── .gitignore            # Git ignore rules for the entire project
├── frontend/             # Next.js frontend application
│   ├── src/              # Frontend source code
│   │   └── app/          # Next.js App Router
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   ├── next.config.mjs   # Next.js configuration
│   └── ...               # Other frontend configuration files
│
└── backend/              # Firebase backend
    ├── functions/        # Firebase Cloud Functions
    │   ├── index.js      # Entry point for Firebase Functions
    │   └── package.json  # Function-specific dependencies
    ├── firebase.json     # Firebase configuration
    ├── package.json      # Backend dependencies
    └── ...               # Other backend configuration files
```

## Organization Guidelines

1. **Frontend Code**
   - All frontend code resides within the `frontend/` directory
   - Uses Next.js framework
   - Contains its own package.json and dependencies

2. **Backend Code**
   - All backend code resides within the `backend/` directory
   - Uses Firebase (Functions, Firestore, etc.)
   - Contains its own package.json and dependencies

3. **Git & Source Control**
   - Root .gitignore handles exclusions for both frontend and backend
   - Each directory can have additional .gitignore files if needed

4. **Dependencies**
   - Frontend and backend have separate package.json files
   - Each should manage its own dependencies independently

## Development Workflow

1. **For frontend development:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **For backend development:**
   ```bash
   cd backend
   npm install
   npm run dev  # Starts Firebase emulators
   ```

## Deployment

- Frontend can be deployed to Vercel or other hosting providers
- Backend deploys to Firebase using Firebase CLI 