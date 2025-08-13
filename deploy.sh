#!/bin/bash

# Exit on error
set -e

# Build the project
echo "Building the project..."
npm run build

# Create a temporary directory for the deployment
echo "Preparing deployment..."
rm -rf deploy
git clone --single-branch --branch gh-pages https://github.com/sahilthecoder/Sahil-Ali-Portfolio.git deploy

# Remove all files except .git
cd deploy
find . -not -path "./.git/*" -not -name ".git" -delete
cd ..

# Copy the built files
cp -r dist/* deploy/

# Create a no-jekyll file to prevent Jekyll processing
touch deploy/.nojekyll

# Create a CNAME file if you're using a custom domain
# echo "yourdomain.com" > deploy/CNAME

# Commit and push the changes
cd deploy
git add .

echo "Deploying to GitHub Pages..."
# Use the provided GitHub token if running in GitHub Actions
if [ -n "$GITHUB_TOKEN" ]; then
  git config --global user.email "github-actions[bot]@users.noreply.github.com"
  git config --global user.name "GitHub Actions"
  git remote set-url origin https://x-access-token:$GITHUB_TOKEN@github.com/sahilthecoder/Sahil-Ali-Portfolio.git
fi

git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# Clean up
cd ..
rm -rf deploy

echo "Deployment successful!"
echo "Your site should be live at: https://sahilthecoder.github.io/Sahil-Ali-Portfolio/"
