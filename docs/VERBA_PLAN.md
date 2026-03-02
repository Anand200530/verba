# VERBA - Project Plan & Roadmap

## Last Updated: 2026-03-02

---

## Overview

**Verba** — Dating app for introverts
- **Tagline:** "Words before looks"
- **Core Concept:** Photos stay hidden until BOTH people agree to reveal them

---

## Tech Stack

| Part | Technology |
|------|------------|
| Mobile | React Native (Expo) |
| Backend | Supabase (BaaS - Free) |
| Auth | Supabase Auth |
| Database | Supabase PostgreSQL |

---

## Supabase Config

- **URL:** `https://miqwzfetdtwxtditzczw.supabase.co`
- **anon key:** Configured in app/lib/supabase.js

---

## MVP Plan

### Phase 1: Supabase Setup ✅

| Status | Step | Description |
|--------|------|-------------|
| ✅ | 1 | Create Supabase account |
| ✅ | 2 | Create new project |
| ✅ | 3 | Setup database tables (profiles, matches, messages) |
| ⏳ | 4 | Configure auth (in progress) |
| ⏳ | 5 | Setup storage for photos |

### Phase 2: Mobile App

| Status | Step | Description |
|--------|------|-------------|
| ✅ | 1 | Install Supabase SDK |
| ✅ | 2 | Connect to Supabase |
| ✅ | 3 | Auth flow (signup/login) |
| ✅ | 4 | Quiz flow |
| ✅ | 5 | Profile creation |
| ✅ | 6 | Discover screen (no photos) |
| ✅ | 7 | Chat screen (with blur) |
| ✅ | 8 | Settings (ghost mode) |
| ⏳ | 9 | Connect to real backend |
| ⏳ | 10 | Matching system |

### Phase 3: Polish

| Status | Step | Description |
|--------|------|-------------|
| ⏳ | 1 | Voice notes (optional) |
| ⏳ | 2 | Video call (mutual consent) |
| ⏳ | 3 | Icebreakers |

---

## Progress Log

### 2026-03-02
- Created GitHub repo: https://github.com/Anand200530/verba
- Initial commit with mobile app skeleton (8 screens)
- Project plan documented
- Decided on Supabase for backend (free tier)
- Database tables created (profiles, matches, messages)
- Added Supabase client (lib/supabase.js)
- Updated all screens with Supabase integration:
  - OnboardingScreen: Sign up/in with Supabase Auth
  - QuizScreen: 5 personality questions
  - ProfileScreen: Create profile with story
  - DiscoverScreen: Browse profiles (no photos)
  - ChatScreen: Chat with photo blur reminder
  - SettingsScreen: Ghost mode toggle

---

## Notes

- Using Supabase (BaaS) instead of custom backend — free and no server management
- Database is ready — now building mobile app
- App is ready to run! Run `npm start` in app/ folder

---

*This document is updated with every change. Check git history for full log.*
