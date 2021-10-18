# Scrimpr
A monorepo to scrape grocery information and compare prices.

## Prerequisites
- Node 16
- NPM 7

## Getting Started

### 1. Set up environment variables
Sensitive credentials are not to be committed to the code base, and must be added locally as follows:
- copy the ".example.env" file at the top-level of the project, into a new file named ".env"
- fill in the missing variables inside that file (e.g. "DB_URI"), these may be obtained from a project member directly - _never commit these_

### 2. Install dependencies
Simply run the command `npm install` from your terminal.

### 3. Launch 🚀
Run `npm run watch` to start the Express server in "development" mode, which enables the following features:
- any file changes will automatically restart the server for you
- the frontend will direct all API requests to your local running server
This will enable you to tinker in localhost.

## Deployment
Run `npm start` to start the Express server
