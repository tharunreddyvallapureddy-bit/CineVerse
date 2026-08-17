import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-email']
}));

app.use(express.json());

const geminiApiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
let aiClient = null;
if (geminiApiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey: geminiApiKey });
  } catch (err) {
    console.warn('Gemini AI Client initialization warning:', err.message);
  }
}

// ==========================================
// DYNAMIC DATA STORE (CLEANED - NO FAKE MOVIES)
// ==========================================

const ADMIN_EMAIL = 'vallapureddytharunreddy6281@gmail.com';
const ADMIN_PASSWORD = '123456789';

const usersStore = [
  {
    id: 'usr-admin-master',
    name: 'Tharun Reddy (Admin)',
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    tier: 'CineVerse Master Admin',
    status: 'Active',
    isAdmin: true,
    joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    initials: 'TR'
  }
];

// Clean Dynamic Movies Catalog (starts empty until Admin uploads)
let moviesStore = [];

const reviewsStore = {};
const watchlistsStore = {};
const watchPartyRoomsStore = {};

// ==========================================
// REST API ENDPOINTS
// ==========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'CineVerse Neural Streaming API Server',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
    movieCount: moviesStore.length,
    adminEmail: ADMIN_EMAIL
  });
});

// Authentication: Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const existing = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    email,
    password,
    tier: isAdmin ? 'CineVerse Master Admin' : 'CineVerse VIP',
    status: 'Active',
    isAdmin,
    joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80`,
    initials
  };

  usersStore.push(newUser);
  const { password: _, ...userWithoutPassword } = newUser;

  res.status(201).json({
    message: 'User registered successfully',
    user: userWithoutPassword,
    token: `cv_token_${Date.now()}`
  });
});

// Authentication: Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const cleanEmail = email.trim().toLowerCase();
  let user = usersStore.find(u => u.email.toLowerCase() === cleanEmail);

  // Admin Master check
  if (cleanEmail === ADMIN_EMAIL.toLowerCase()) {
    if (password === ADMIN_PASSWORD) {
      if (!user) {
        user = usersStore[0];
      }
    } else {
      return res.status(401).json({ error: 'Invalid admin password' });
    }
  } else if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password credentials' });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json({
    message: 'Login successful',
    user: userWithoutPassword,
    token: `cv_token_${Date.now()}`
  });
});

// Movies Catalog Endpoint
app.get('/api/movies', (req, res) => {
  const { genre, type, search } = req.query;
  let result = [...moviesStore];

  if (type) {
    result = result.filter(m => m.type === type);
  }
  if (genre) {
    result = result.filter(m => m.genres && m.genres.some(g => g.toLowerCase() === String(genre).toLowerCase()));
  }
  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter(m =>
      m.title.toLowerCase().includes(q) ||
      (m.synopsis && m.synopsis.toLowerCase().includes(q)) ||
      (m.genres && m.genres.some(g => g.toLowerCase().includes(q)))
    );
  }

  res.json({
    count: result.length,
    movies: result
  });
});

// Add / Publish New Movie (Admin Action)
app.post('/api/movies', (req, res) => {
  const movieData = req.body;

  if (!movieData.title) {
    return res.status(400).json({ error: 'Movie title is required' });
  }

  const newMovie = {
    id: movieData.id || `movie-${Date.now()}`,
    title: movieData.title,
    subtitle: movieData.subtitle || movieData.year || 'New Release',
    year: movieData.year || '2025',
    duration: movieData.duration || movieData.runtime || '2h 00m',
    rating: movieData.rating || '5.0',
    ratingCount: '1',
    matchScore: movieData.matchScore || 98,
    type: movieData.type || 'movie',
    episodesInfo: movieData.episodesInfo || '',
    genres: Array.isArray(movieData.genres) ? movieData.genres : (movieData.genre ? [movieData.genre] : ['Sci-Fi']),
    tags: Array.isArray(movieData.tags) ? movieData.tags : ['4K Master', 'New Release'],
    features: Array.isArray(movieData.features) ? movieData.features : ['4K HDR', 'Dolby Atmos'],
    posterImage: movieData.posterImage || movieData.poster || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    backdropImage: movieData.backdropImage || movieData.poster || 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    synopsis: movieData.synopsis || 'Uploaded by Admin via Studio Console.',
    aiPickReason: 'Featured release uploaded by Studio Admin.',
    progressPercent: 0,
    remainingTime: movieData.duration || '2h 00m',
    cast: movieData.cast || [],
    mood: movieData.mood || {
      tension: 85,
      action: 80,
      visuals: 95,
      mystery: 88,
      pacing: 75,
      description: 'High sensory neural experience uploaded via Studio Master Ingestion.'
    },
    audienceConsensus: 'Official Studio Release uploaded by Admin.'
  };

  moviesStore.unshift(newMovie);
  res.status(201).json({ message: 'Movie published successfully', movie: newMovie, catalogSize: moviesStore.length });
});

// Delete Movie (Admin Action)
app.delete('/api/movies/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = moviesStore.length;
  moviesStore = moviesStore.filter(m => m.id !== id);

  if (moviesStore.length === initialLength) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  res.json({ message: 'Movie deleted successfully', remaining: moviesStore.length });
});

// Single Movie Details Endpoint
app.get('/api/movies/:id', (req, res) => {
  const movie = moviesStore.find(m => m.id === req.params.id);
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  const movieReviews = reviewsStore[movie.id] || [];
  res.json({
    ...movie,
    reviews: movieReviews
  });
});

// Add Movie Review Endpoint
app.post('/api/movies/:id/reviews', (req, res) => {
  const { id } = req.params;
  const { text, rating, author, initials } = req.body;

  if (!text || !rating) {
    return res.status(400).json({ error: 'Review text and rating are required' });
  }

  if (!reviewsStore[id]) {
    reviewsStore[id] = [];
  }

  const newReview = {
    id: `rev-${Date.now()}`,
    author: author || 'CineVerse Member',
    initials: initials || 'CM',
    text,
    rating: Number(rating),
    date: 'Just now'
  };

  reviewsStore[id].unshift(newReview);
  res.status(201).json({ message: 'Review added', review: newReview });
});

// CineAI Neural Search Endpoint
app.post('/api/ai/search', async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query prompt is required' });
  }

  if (moviesStore.length === 0) {
    return res.json({ query, results: [] });
  }

  const qLower = query.toLowerCase();
  const scored = moviesStore.map(m => {
    let score = 80;
    if (m.title.toLowerCase().includes(qLower)) score += 15;
    if (m.synopsis && m.synopsis.toLowerCase().includes(qLower)) score += 10;
    return {
      ...m,
      matchScore: Math.min(99, score)
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  res.json({ query, results: scored });
});

// Serve frontend static assets if dist folder exists
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));
app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) return next();
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.send('CineVerse Backend API Server is online. Connect Vercel frontend or visit /api/health.');
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`  CineVerse Backend Server running on port ${PORT}  `);
  console.log(`  Admin Email: ${ADMIN_EMAIL}                       `);
  console.log(`====================================================`);
});
