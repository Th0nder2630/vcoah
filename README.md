# VCoach — Valorant Pattern Coach

Real-time coaching overlay. Detects patterns in your gameplay and gives live tips.
Uses only Riot's official Local Client API — 100% Valorant TOS compliant.

---

## Get the .exe — 3 steps, ~5 minutes total

### Step 1 — Upload to GitHub (free)

1. Go to **github.com** → sign in or create a free account
2. Click **+** (top right) → **New repository**
3. Name it `vcoach`, set to **Public**, click **Create repository**
4. On the next screen click **"uploading an existing file"**
5. Drag everything in this folder into the upload box
6. Click **Commit changes**

### Step 2 — Wait ~3 minutes

Go to the **Actions** tab in your repo.
You'll see a workflow called "Build VCoach Installer" running.
Wait for the green checkmark.

### Step 3 — Download your installer

Go to the **Releases** tab.
Download **VCoach Setup 1.0.x.exe** — run it and you're done.

Every time you push a change, a fresh installer is built automatically.

---

## What it does

- Transparent always-on-top overlay while you play
- Detects: ability waste, death streaks, re-peeking same angles, economy mistakes
- Tracks which enemy keeps killing you
- Live tip cards with countdown timers
- Full dashboard with tip log, pattern history, and settings

## TOS compliance

Reads only from Riot's official Local Client API at 127.0.0.1:2999.
Same method used by Blitz.gg and all Overwolf apps.
No memory reading. No injection. No automation.
