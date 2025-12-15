# US Elite Investment Club

A premium investment education platform featuring real-time trader profiles, video libraries, and strategy analysis. Built with Vue 3 (Frontend) and Node.js/Express (Backend).

## Deployment Guide

### Prerequisites

- Node.js v16+
- NPM or Yarn

### Backend Deployment (Node.js)

1. Navigate to `investment-club-backend`.
2. Set environment variables (e.g., in Render dashboard or `.env`):
   - `PORT=3000`
   - `JWT_SECRET=production_secret_key_here`
   - `FRONTEND_URL=https://your-frontend-domain.com`
3. Install dependencies: `npm install --production`.
4. Start command: `npm start`.

### Frontend Deployment (Static/SPA)

1. Navigate to `investment-club-frontend`.
2. Set environment variable (e.g., in Vercel dashboard):
   - `VITE_API_BASE_URL=https://your-backend-domain.com/api`
3. Run build: `npm run build`.
4. Output directory is `dist`.
5. For SPAs, ensure all routes rewrite to `index.html`.

### Local Development

1. Start Backend:

   ```bash
   cd investment-club-backend
   npm install
   npm run dev
   ```

2. Start Frontend:

   ```bash
   cd investment-club-frontend
   npm install
   npm run dev
   ```
