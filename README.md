# FC2026 T-Shirt Showcase 👕

Welcome to the **FC2026 T-Shirt Showcase**! This is a premium, modern e-commerce web application built to showcase and facilitate orders for exclusive Freedom Conference 2026 T-shirts. The application offers a stunning, fast, and responsive user experience designed to feel like a high-end fashion catalog.

## ✨ Features

- **Modern & Premium UI:** Crafted with Tailwind CSS, utilizing glassmorphism, clean typography, and subtle micro-animations to ensure a world-class aesthetic.
- **Dynamic Product Filtering:** Instantly filter between "Premium" and "Standard" categories.
- **Advanced Variation Selection:** Select between multiple quality tiers (e.g., Premium, Heavy Premium, Ultra Premium), sizes, and colors without losing cart context.
- **Cart Management:** Fully integrated global cart system that allows seamless quantity adjustments and safely stores intent.
- **Serverless Checkout Flow:** Users submit an "Order Intent" which securely dispatches an automated, elegantly-styled HTML email containing their order summary and payment instructions using **Google App Script**.
- **Fully Responsive:** Optimized for both desktop and mobile web experiences, featuring slide-out drawers and tailored modals.

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Library:** [React](https://reactjs.org/) 18+
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** React Context API
- **Deployment:** Ready for [Vercel](https://vercel.com)
- **Email Backend:** Google App Script (GAS) 

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or newer
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:asejik/FC-2026-Shirts.git
   cd FC-2026-Shirts
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root of the project and add your Google App Script webhook URL:
   ```env
   NEXT_PUBLIC_GAS_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the App:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment (Vercel)

Deploying this app is a breeze using Vercel.

1. Push your code to your GitHub repository.
2. Log in to your [Vercel Dashboard](https://vercel.com).
3. Click **Add New Project** and select this repository.
4. Expand the **Environment Variables** section and add `NEXT_PUBLIC_GAS_URL` with your webhook URL.
5. Click **Deploy**. Vercel will automatically build and launch the site.

## 📧 Google App Script Integration

This app relies on Google App Script (GAS) as a free backend for handling emails and spreadsheet logging.
1. The script is located in `gas-script.js`.
2. Deploy the script as a **Web App** in your Google Workspace.
3. Ensure the access is set to **"Anyone"** so the Next.js frontend can perform CORS-friendly POST requests to it.

## 📄 License

&copy; 2026 FC2026 T-Shirt Showcase. All rights reserved.
