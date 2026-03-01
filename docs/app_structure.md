# VERBA - App Structure

## Tech Stack

| Part | Technology |
|------|------------|
| Mobile | React Native (Expo) |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| Auth | Firebase |
| Storage | AWS S3 (photos) |

---

## App Screens

| Screen | Description |
|--------|-------------|
| Splash | Logo + loading |
| Onboarding | 3 slides explaining app |
| Quiz | Personality questions |
| Profile | Create profile (story + voice) |
| Discover | Browse profiles (no photos) |
| Match | When someone matches |
| Chat | Text conversation |
| Profile Reveal | See photo after mutual consent |
| Settings | App preferences |

---

## Core Features (MVP)

### Phase 1 - Must Have
- [ ] User registration
- [ ] Personality quiz
- [ ] Profile creation (story, voice optional)
- [ ] Browse profiles (no photos)
- [ ] Like/Pass
- [ ] Matching system
- [ ] Chat (1 active)
- [ ] Photo reveal (mutual)
- [ ] Ghost mode (no online status)

### Phase 2 - Polish
- [ ] Voice notes
- [ ] Icebreaker prompts
- [ ] Video call (mutual)
- [ ] Premium features

---

## Project Structure

```
VERBA/
├── app/                    # Mobile app (React Native)
├── backend/               # Server
└── docs/                 # Documentation
```

---

## Next Steps

1. Setup - Initialize project
2. Design - Create screen mockups  
3. Backend - API first
4. Mobile - Start coding screens
