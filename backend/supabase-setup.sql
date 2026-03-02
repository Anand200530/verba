-- VERBA Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL, -- Links to Supabase Auth
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  age INTEGER,
  bio TEXT, -- The "story" - text only
  voice_url TEXT, -- Optional voice note
  quiz_responses JSONB, -- Store quiz answers
  interests TEXT[], -- Array of interests
  photo_url TEXT, -- Hidden until mutual consent
  has_revealed_photos BOOLEAN DEFAULT FALSE, -- User's decision to reveal
  ghost_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Matches Table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id UUID NOT NULL REFERENCES profiles(id),
  user2_id UUID NOT NULL REFERENCES profiles(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'matched', 'rejected')),
  photo_reveal_user1 BOOLEAN DEFAULT FALSE,
  photo_reveal_user2 BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Messages Table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID NOT NULL REFERENCES matches(id),
  sender_id UUID NOT NULL REFERENCES profiles(id),
  content TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Photo Reveal Requests
CREATE TABLE photo_reveal_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID NOT NULL REFERENCES matches(id),
  requester_id UUID NOT NULL REFERENCES profiles(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_reveal_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: users can read all, update only own
CREATE POLICY "Public profiles are viewable by everyone" 
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" 
  ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Matches: users can see their own matches
CREATE POLICY "Users can view own matches" 
  ON matches FOR SELECT USING (
    user1_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    OR user2_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Messages: only matched users can see
CREATE POLICY "Matched users can view messages" 
  ON messages FOR SELECT USING (
    match_id IN (
      SELECT id FROM matches WHERE 
      user1_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
      OR user2_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages" 
  ON messages FOR INSERT WITH CHECK (
    sender_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Index for faster queries
CREATE INDEX idx_messages_match_id ON messages(match_id);
CREATE INDEX idx_matches_user1 ON matches(user1_id);
CREATE INDEX idx_matches_user2 ON matches(user2_id);
