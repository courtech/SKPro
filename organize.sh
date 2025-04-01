#!/bin/bash

# Organize.sh - Script to clean up project structure

echo "Starting project cleanup and organization..."

# Make the script executable
chmod +x organize.sh

# Remove duplicate configuration files from root (now in frontend/)
echo "Removing duplicate config files from root directory..."
rm -f jsconfig.json next.config.mjs postcss.config.mjs eslint.config.mjs

# Remove duplicate src and public directories from root (now in frontend/)
echo "Moving any remaining content from src/ to frontend/src/..."
if [ -d "src" ]; then
  cp -rn src/* frontend/src/ 2>/dev/null
  echo "Removing src/ directory from root..."
  rm -rf src
fi

echo "Moving any remaining content from public/ to frontend/public/..."
if [ -d "public" ]; then
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

echo "Cleanup complete! Project is now organized according to the structure in PROJECT_STRUCTURE.md"
echo "You can now safely commit these changes." 