// API Client for CineVerse Backend (Render deployed & Local Dev)

const BACKEND_HOST = import.meta.env.VITE_BACKEND_URL || '';
export const API_BASE_URL = BACKEND_HOST ? `${BACKEND_HOST}/api` : '/api';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  tier: string;
  status: string;
  joinDate: string;
  avatar: string;
  initials: string;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
  message?: string;
}

// 1. Health check
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    return await res.json();
  } catch (err) {
    console.warn('Backend health check fallback to local mode:', err);
    return { status: 'fallback', service: 'Local Client' };
  }
}

// 2. User Authentication
export async function registerUser(name: string, email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Registration failed' }));
    throw new Error(errorData.error || 'Registration failed');
  }
  return await res.json();
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Login failed' }));
    throw new Error(errorData.error || 'Invalid credentials');
  }
  return await res.json();
}

// 3. Movies Catalog & Search
export async function fetchMoviesApi(params?: { type?: string; genre?: string; search?: string }) {
  try {
    const query = new URLSearchParams();
    if (params?.type) query.append('type', params.type);
    if (params?.genre) query.append('genre', params.genre);
    if (params?.search) query.append('search', params.search);

    const res = await fetch(`${API_BASE_URL}/movies?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch movies');
    const data = await res.json();
    return data.movies;
  } catch (err) {
    console.warn('API fetchMovies failed, using local catalog:', err);
    return null;
  }
}

export async function fetchMovieByIdApi(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/movies/${id}`);
    if (!res.ok) throw new Error('Movie not found');
    return await res.json();
  } catch (err) {
    console.warn('API fetchMovieById failed:', err);
    return null;
  }
}

export async function postReviewApi(movieId: string, review: { text: string; rating: number; author?: string; initials?: string }) {
  try {
    const res = await fetch(`${API_BASE_URL}/movies/${movieId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    if (!res.ok) throw new Error('Failed to post review');
    return await res.json();
  } catch (err) {
    console.warn('API postReview failed:', err);
    return null;
  }
}

// 4. CineAI Neural Search
export async function searchAIApi(promptQuery: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: promptQuery })
    });
    if (!res.ok) throw new Error('AI Search request failed');
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.warn('API searchAI failed:', err);
    return null;
  }
}

// 5. Watch Party Synchronization
export async function fetchWatchPartyRoomApi(roomCode: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/watchparty/rooms/${roomCode}`);
    if (!res.ok) throw new Error('Room fetch failed');
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function postWatchPartyMessageApi(roomCode: string, messageData: { user: string; text?: string; reaction?: string; avatar?: string }) {
  try {
    const res = await fetch(`${API_BASE_URL}/watchparty/rooms/${roomCode}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    });
    return await res.json();
  } catch (err) {
    return null;
  }
}

// 6. Watchlist Sync
export async function toggleWatchlistApi(movieId: string, userEmail?: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/watchlist/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-email': userEmail || 'admin@cineverse.com'
      },
      body: JSON.stringify({ movieId })
    });
    return await res.json();
  } catch (err) {
    return null;
  }
}
