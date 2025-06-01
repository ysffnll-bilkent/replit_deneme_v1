#!/bin/bash

echo "Building Crystal 3D Viewer Application..."

# Navigate to the customize-app directory
cd customize-app/ThreeDModelViewer

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building application..."
npm run build

# Go back to root
cd ../../

# Clean and create crystal directory
echo "Preparing crystal directory..."
rm -rf public/crystal
mkdir -p public/crystal

# Copy build output to public/crystal
echo "Copying build files..."
if [ -d "customize-app/ThreeDModelViewer/dist" ]; then
    cp -r customize-app/ThreeDModelViewer/dist/* public/crystal/
    echo "✓ Crystal app build completed successfully!"
else
    echo "✗ Build directory not found. Build may have failed."
fi