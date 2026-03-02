import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://miqwzfetdtwxtditzczw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcXd6ZmV0ZHR3eHRkaXR6Y3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzODQyOTcsImV4cCI6MjA4Nzk2MDI5N30.smFVlfyOb3NPiv4vPJHay6E6BMJ0EcBGFmbQNOJHHz0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Profile helpers
export const createProfile = async (userId, username, displayName, age, bio, quizResponses, interests) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([
      {
        user_id: userId,
        username,
        display_name: displayName,
        age,
        bio,
        quiz_responses: quizResponses,
        interests,
      },
    ])
    .select()
  return { data, error }
}

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  return { data, error }
}

export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
  return { data, error }
}

// Discovery - get profiles to discover (excluding own)
export const discoverProfiles = async (currentUserId) => {
  const { data: ownProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', currentUserId)
    .single()

  if (!ownProfile) return { data: [], error: null }

  // Get profiles that aren't matched with current user
  const { data: matchedUserIds } = await supabase
    .from('matches')
    .select('user1_id, user2_id')
    .or(`user1_id.eq.${ownProfile.id},user2_id.eq.${ownProfile.id}`)

  const excludedIds = matchedUserIds
    ? [ownProfile.id, ...matchedUserIds.map(m => m.user1_id === ownProfile.id ? m.user2_id : m.user1_id)]
    : [ownProfile.id]

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .not('id', 'in', `(${excludedIds.join(',')})`)
    .limit(20)

  return { data, error }
}

// Matching
export const createMatch = async (user1Id, user2Id) => {
  const { data, error } = await supabase
    .from('matches')
    .insert([{ user1_id: user1Id, user2_id: user2Id, status: 'pending' }])
    .select()
  return { data, error }
}

export const getMatches = async (userId) => {
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', userId)
    .single()

  if (!profile) return { data: [], error: null }

  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      profile1:profiles!matches_user1_id_fkey(*),
      profile2:profiles!matches_user2_id_fkey(*)
    `)
    .or(`user1_id.eq.${profile.id},user2_id.eq.${profile.id}`)
    .order('created_at', { ascending: false })

  return { data, error }
}

// Messages
export const sendMessage = async (matchId, senderId, content) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ match_id: matchId, sender_id: senderId, content }])
    .select()
  return { data, error }
}

export const getMessages = async (matchId) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('match_id', matchId)
    .order('created_at', { ascending: true })
  return { data, error }
}

// Photo reveal (mutual consent)
export const requestPhotoReveal = async (matchId, requesterId) => {
  const { data, error } = await supabase
    .from('photo_reveal_requests')
    .insert([{ match_id: matchId, requester_id: requesterId, status: 'pending' }])
    .select()
  return { data, error }
}

export const respondToPhotoReveal = async (requestId, accept) => {
  const { data, error } = await supabase
    .from('photo_reveal_requests')
    .update({ status: accept ? 'accepted' : 'rejected' })
    .eq('id', requestId)
    .select()
  return { data, error }
}
