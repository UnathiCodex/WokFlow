# WokFlow 
*13.09.2026*

### Setup git

```bash
# Create an empty Git repository in this folder
git init 

# Stage all changes in this folder, for the next commit
git add . 

# Save staged changes as a new commit, -m: commit message
git commit -m "Message"

# Save the GitHub address under the name origin
git remote add origin git@github.com:UnathiCodex/WokFlow.git

# Rename the current branch to main, -M: rename even if main exists
git branch -M main

# Send commits to GitHub, -u: link main to origin/main, later just git push
git push -u origin main
```

### Setup npm

```bash
# Show the installed Node version, -v: version
node -v

# Install development tools, -D: save under devDependencies
npm install -D typescript @types/node@26 vite

# Install Dinero.js 2.0.2 for money amounts, saved under dependencies
npm install dinero.js@2.0.2

# Run the start script from package.json, starts the server
npm start
```

### Run with npm

```bash
# Build the page into the dist folder, runs vite build from package.json
npm run build

# Build the page again after each save, runs vite build --watch from package.json
npm run watch

# Start the server at localhost:3000, runs node src/server/index.ts from package.json
npm start

# Run all tests from the WokFlow folder, --test: finds test files
node --test
```
