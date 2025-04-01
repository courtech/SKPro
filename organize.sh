#!/bin/bash

# Organize.sh - Script to clean up project structure

echo "Starting project cleanup and organization..."

# Make the script executable
chmod +x organize.sh

# Remove duplicate README files (keeping only the root README)
echo "Removing duplicate README files..."
rm -f frontend/README.md backend/README.md

# Remove duplicate configuration files from root (now in frontend/)
echo "Removing duplicate config files from root directory..."
rm -f jsconfig.json next.config.mjs postcss.config.mjs eslint.config.mjs

# Remove duplicate src and public directories from root (now in frontend/)
echo "Moving any remaining content from src/ to frontend/src/..."
if [ -d "src" ]; then
  mkdir -p frontend/src
  cp -rn src/* frontend/src/ 2>/dev/null
  echo "Removing src/ directory from root..."
  rm -rf src
fi

echo "Moving any remaining content from public/ to frontend/public/..."
if [ -d "public" ]; then
  mkdir -p frontend/public
  cp -rn public/* frontend/public/ 2>/dev/null
  echo "Removing public/ directory from root..."
  rm -rf public
fi

# Remove root package.json and package-lock.json (now in frontend/)
echo "Removing duplicate package files from root directory..."
rm -f package.json package-lock.json

# Copy .gitignore to frontend and backend if they don't have one
echo "Ensuring .gitignore exists in subdirectories..."
if [ ! -f "frontend/.gitignore" ]; then
  cp .gitignore frontend/.gitignore
fi

if [ ! -f "backend/.gitignore" ]; then
  cp .gitignore backend/.gitignore
fi

# Make sure node_modules are in the right place
echo "Checking node_modules locations..."
if [ -d "node_modules" ]; then
  echo "Moving node_modules to frontend directory..."
  if [ ! -d "frontend/node_modules" ]; then
    mv node_modules frontend/
  else
    rm -rf node_modules
  fi
fi

# Remove PROJECT_STRUCTURE.md as it's now part of README.md
echo "Removing PROJECT_STRUCTURE.md as the content is now in README.md..."
rm -f PROJECT_STRUCTURE.md

echo "Cleanup complete! Project is now organized with a single README.md in the root directory."
echo "You can now safely commit these changes." 