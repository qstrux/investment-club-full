# 🚀 Your App is Ready for Deployment

I have fully prepared your production build. Because I am an AI running locally, I cannot log in to your Vercel or Render account directly. **You must perform the final "Upload" step.**

Here is the fastest way to get online (Drag & Drop):

## 1. Deploy Frontend (The Website)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** -> **"Project"**.
3. Choose **"Import"** next to your Git Repository (if you pushed to GitHub) OR use the Vercel CLI.
    * *Simplest Method*: Install Vercel CLI (`npm i -g vercel`) and run `vercel` in the `investment-club-frontend` folder.

## 2. Deploy Backend (The API)

1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Click **"New +"** -> **"Web Service"**.
3. Connect your GitHub repository.
4. Select the `investment-club-backend` folder.
    * **Runtime**: Node
    * **Build Command**: `npm install`
    * **Start Command**: `node server.js`
5. **Important**: Add your Environment Variables in the Render Dashboard:
    * `OPENAI_API_KEY`: (Copy from your local .env)
    * `JWT_SECRET`: (Set a random secret)

## 3. Connect Them

1. Once Backend is live, copy its URL (e.g., `https://my-api.onrender.com`).
2. Go back to Vercel (Frontend) settings.
3. Add an Environment Variable: `VITE_API_BASE_URL` = `https://my-api.onrender.com/api`.
4. Redeploy Frontend.

**Your app is now fully production-ready!** 🌍
