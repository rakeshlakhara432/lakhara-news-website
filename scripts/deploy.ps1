# Deploy script for Lakhara Digital News
# This script commits changes, pushes to GitHub, and deploys to Firebase + GitHub Pages.

Write-Host "🚀 Starting Deployment Process..." -ForegroundColor Cyan

# 1. Add changes
Write-Host "📦 Staging changes..." -ForegroundColor Yellow
git add .

# 2. Commit changes
$commitMessage = "feat: ARHLM Membership Congratulations PDF certificate auto-generated on registration"
Write-Host "💾 Committing changes: $commitMessage" -ForegroundColor Yellow
git commit -m $commitMessage

# 3. Push to GitHub
Write-Host "☁️ Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

# 4. Build and Deploy to GitHub Pages
Write-Host "🛠️ Deploying to GitHub Pages..." -ForegroundColor Yellow
npm run deploy

# 5. Deploy to Firebase (Hosting + Functions)
Write-Host "🔥 Deploying to Firebase..." -ForegroundColor Yellow
firebase deploy

Write-Host "✅ Deployment Complete!" -ForegroundColor Green
