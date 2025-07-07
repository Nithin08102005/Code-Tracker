🚀 CodeTracker
CodeTracker is a fullstack web application that helps competitive programmers organize their coding profiles, monitor contests, and manage personal problem-solving logs—all from a sleek, unified dashboard.
Built using Next.js, Supabase, and modern UI tools like Tailwind CSS and shadcn/ui, CodeTracker delivers a responsive, dark-mode-friendly experience for programmers who love clean design and performance.
🛠 Tech Stack

Frontend: Next.js, React.js, Tailwind CSS, shadcn/ui
Backend & Auth: Supabase
Database: Supabase PostgreSQL
Deployment: Vercel (Recommended)

📌 Features
👤 Profile Page

View and update handles from Codeforces, CodeChef, and LeetCode
See your coding profile data from all 3 platforms in one place

📅 Contest Tracker

View upcoming contests from Codeforces, CodeChef, and LeetCode
Add contests to your calendar instantly

📚 Problems Vault

Store detailed problem metadata:

Name, URL, Platform
Tags, Difficulty
Status, Time & Space Complexities
Notes, Starred flag


Powerful filtering and tag visibility controls
View personal statistics based on filters

🚀 Getting Started
This is a Next.js project bootstrapped with create-next-app.
📦 Installation
bash# Clone the repository
git clone https://github.com/Nithin08102005/Code-Tracker.git
cd Code-Tracker

# Install dependencies
npm install
🔐 Environment Variables
Create a .env.local file in the root and add:
envNEXT_PUBLIC_SUPABASE_URL=https://nvvveuokzshlcvqqqpvj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
Replace your_anon_key_here with your actual Supabase anon key.
▶️ Running the App
bashnpm run dev
# or
yarn dev
Open http://localhost:3000 to see it live.
