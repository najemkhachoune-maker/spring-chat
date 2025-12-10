# 🚀 How to Push Your Code to GitHub

Since Git wasn't installed, you'll need to install it first.

## Step 1: Install Git

1.  Run `install-git.bat` in this folder.
2.  Choose **Option 1** (if you have Chocolatey) or **Option 2** (Manual download).
3.  **IMPORTANT:** Close all terminal windows and open a new one after installing.

## Step 2: Create a GitHub Repository

1.  Go to [GitHub.com/new](https://github.com/new).
2.  Name your repository (e.g., `my-chat-app`).
3.  Make it **Public** or **Private**.
4.  **Do NOT** initialize with README, .gitignore, or License (we already have them).
5.  Click **Create repository**.

## Step 3: Push Your Code

Open a terminal in this folder and run:

```bash
push-code.bat
```

Or if you prefer manual commands:

```bash
# 1. Link to your GitHub repo (REPLACE THE URL!)
git remote add origin https://github.com/YOUR_USERNAME/my-chat-app.git

# 2. Push to GitHub
git push -u origin main
```

## 🐛 Troubleshooting

**"git is not recognized..."**
- Git isn't installed or you didn't restart your terminal.
- Re-run `install-git.bat` or try restarting your computer.

**"Authentication failed"**
- A window should pop up asking you to sign in to GitHub.
- If not, you may need to generate a Personal Access Token.
