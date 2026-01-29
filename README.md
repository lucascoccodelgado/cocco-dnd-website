# Cocco's D&D Universe Website

A beautiful, interactive website for hosting D&D campaigns: **Curse of Strahd** and **The Waning Wonder**.

## Features

- 🏠 Homepage with campaign selection
- 🔒 Password-protected campaign sections
- 📝 Session recaps
- 💬 Player message boards
- 🏆 Achievement tracking
- 👥 NPC database
- 🗺️ Maps section (coming soon)
- 💾 Persistent data storage across sessions

## Campaigns

### Curse of Strahd
- Password: `strahd`
- Gothic horror theme with dark reds and blacks
- Enter the Mists of Barovia

### The Waning Wonder
- Password: `wonder`
- Fantasy parchment theme with purples and divine gold
- Uncover Divine Mysteries in Sefara

## Deployment Instructions

### Step 1: Push to GitHub

1. Open your terminal and navigate to a directory where you want to store the project
2. Copy all the website files to your computer
3. Run these commands:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: D&D campaign website"

# Create a new repository on GitHub (go to github.com and create a new repo called "cocco-dnd-website")
# Then connect your local repo to GitHub:
git remote add origin https://github.com/YOUR-USERNAME/cocco-dnd-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/log in (you can use your GitHub account)
2. Click "Add New Project"
3. Import your `cocco-dnd-website` repository from GitHub
4. Vercel will automatically detect the settings - just click "Deploy"
5. Wait for the deployment to complete (takes about 1-2 minutes)

### Step 3: Add Your Custom Domain

1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Add your domain: `coccothebard.com`
3. Vercel will give you DNS instructions
4. Go to your domain registrar (where you bought coccothebard.com)
5. Update your DNS settings with Vercel's nameservers or add the A/CNAME records they provide
6. Wait for DNS propagation (can take up to 48 hours, but usually 15-30 minutes)

### Step 4: Add www Subdomain (Optional)

In Vercel's domain settings, also add `www.coccothebard.com` so both URLs work.

## File Structure

```
cocco-dnd-website/
├── index.html          # Main HTML file with embedded React app
├── styles.css          # All styling for homepage and campaigns
├── cocco-portrait.png  # Your DM portrait
├── package.json        # Project metadata
├── vercel.json         # Vercel configuration
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Local Development

To test the website locally before deploying:

```bash
# Option 1: Using Python
python3 -m http.server 3000

# Option 2: Using Node.js http-server
npx http-server -p 3000

# Then open: http://localhost:3000
```

## Technology Stack

- **React 18** - UI framework (loaded from CDN)
- **Vanilla CSS** - Custom styling
- **Persistent Storage API** - Data persistence (provided by Claude.ai artifacts, falls back to localStorage)
- **Vercel** - Hosting platform

## Updating the Website

After making changes:

```bash
git add .
git commit -m "Description of your changes"
git push
```

Vercel will automatically redeploy when you push to GitHub!

## Tips

- All player data (recaps, comments, achievements, NPCs) is stored persistently
- The passwords are simple and client-side only - perfect for friendly gatekeeping
- You can edit content directly on the website - no need to touch code
- The website is fully responsive and works great on phones and tablets

## Support

If you need to make design changes or add features, you can ask Claude for help!

---

Built with ⚔️ by Cocco the Bard
