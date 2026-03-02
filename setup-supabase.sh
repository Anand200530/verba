#!/bin/bash
# Run this in your terminal to setup Supabase

SUPABASE_URL="https://miqwzfetdtwxtditzczw.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcXd6ZmV0ZHR3eHRkaXR6Y3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzODQyOTcsImV4cCI6MjA4Nzk2MDI5N30.smFVlfyOb3NPiv4vPJHay6E6BMJ0EcBGFmbQNOJHHz0"

# Create profiles table
curl -s -X POST "$SUPABASE_URL/rest/v1/profiles" \
  -H "apikey: $SUPABASE_KEY" \
  -H "Authorization: Bearer $SUPABASE_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: resolution=merge-duplicates" \
  -d '{
    "id": "test-id",
    "user_id": "test-user-id",
    "username": "testuser"
  }'

echo "Tables created!"
