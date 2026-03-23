# 🚀 DHARAYA - Deployment Guide

Complete guide to deploy DHARAYA to Vercel (Frontend) and Render (Backend).

---

## 📋 **Frontend Deployment (Vercel)**

### **Step 1: Create Vercel Account**
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel to access your GitHub account

### **Step 2: Import Project**
1. Click **"Add New..."** → **"Project"**
2. Select your GitHub account
3. Find and import **`dharaya`** repository
4. Click **"Import"**

### **Step 3: Configure Environment Variables**
1. In the **Environment Variables** section, add:
   ```
   NEXT_PUBLIC_BACKEND_URL = https://your-backend-url.onrender.com
   ```
   (Replace with your actual backend URL from Render)

2. Click **"Deploy"**

### **Step 4: Deploy**
- Vercel automatically builds and deploys
- Your site will be live at: `https://dharaya-xxx.vercel.app`
- Automatic deployments on every GitHub push

---

## 🟢 **Backend Deployment (Render)**

### **Step 1: Create Render Account**
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render

### **Step 2: Create Web Service**
1. Click **"New +"** → **"Web Service"**
2. Select **`dharaya`** repository
3. Choose the **`dharaya`** folder as root directory

### **Step 3: Configure Service**
- **Name:** `dharaya-api`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `node server.js`
- **Branch:** `main`

### **Step 4: Add Environment Variables**
In **Environment** section, add:
```
PORT = 7777
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/dharaya
NODE_ENV = production
```

### **Step 5: Deploy**
1. Click **"Create Web Service"**
2. Render auto-deploys from GitHub
3. Your API will be at: `https://dharaya-api.onrender.com`

---

## 📊 **Database Setup (MongoDB Atlas)**

### **Step 1: Create MongoDB Atlas Account**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)
3. Create a cluster (M0 free tier)

### **Step 2: Get Connection String**
1. Go to **"Connect"**
2. Choose **"Drivers"**
3. Copy the connection string
4. Replace `<password>` with your database password

### **Step 3: Update .env**
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/dharaya
```

### **Step 4: Seed Database**
In Render terminal or locally:
```bash
cd dharaya
node seed.js
```

---

## ✅ **Deployment Checklist**

- [ ] GitHub account created
- [ ] Repository pushed to GitHub
- [ ] Vercel account created
- [ ] Frontend imported to Vercel
- [ ] Backend environment variables set on Vercel
- [ ] Render account created
- [ ] Backend created on Render
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables set on Render
- [ ] Database seeded
- [ ] Frontend and backend URLs updated
- [ ] Test login at `https://dharaya-xxx.vercel.app`
- [ ] Test API at `https://dharaya-api.onrender.com/api/health`

---

## 🔗 **Final URLs**

```
Frontend: https://dharaya-xxx.vercel.app
Backend:  https://dharaya-api.onrender.com
API Docs: https://dharaya-api.onrender.com/api/health
```

---

## 🔧 **Troubleshooting**

**Frontend won't load?**
- Check `NEXT_PUBLIC_BACKEND_URL` is set in Vercel
- Check backend is running on Render

**API errors?**
- Check `MONGODB_URI` is correct on Render
- Check database is seeded: `node seed.js`
- Check `NODE_ENV = production` on Render

**CORS errors?**
- Backend already has CORS enabled
- Check `FRONTEND_URL` environment variable if needed

---

## 📚 **Resources**

- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.mongodb.com/manual/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Questions?** Check GitHub Issues or create a new one! 🎯
