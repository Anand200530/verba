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
- **anon key:** Stored in app config

---

## MVP Plan

### Phase 1: Supabase Setup ✅

| Status | Step | Description |
|--------|------|-------------|
| ✅ | 1 | Create Supabase account |
| ✅ | 2 | Create new project |
| ✅ | 3 | Setup database tables (profiles, matches, messages) |
| ⏳ | 4 | Configure auth |
| ⏳ | 5 | Setup storage for photos |

### Phase 2: Mobile App

| Status | Step | Description |
|--------|------|-------------|
| ⏳ | 1 | Install Supabase SDK |
| ⏳ | 2 | Connect to Supabase |
| ⏳ | 3 | Auth flow (signup/login) |
| ⏳ | 4 | Quiz flow |
| ⏳ | 5 | Profile creation |
| ⏳ | 6 | Discover screen (no photos) |
| ⏳ | 7 | Matching system |
| ⏳ | 8 | Chat with blur |
| ⏳ | 9 | Settings (ghost mode) |

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
- Started building mobile app

---

## Notes

- Using Supabase (BaaS) instead of custom backend — free and no server management
- Database is ready — now building mobile app

---

*This document is updated with every change. Check git history for full log.*
