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

// Enable CORS for Vercel frontends and local dev
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-email']
}));

app.use(express.json());

// Initialize Gemini AI Client if API Key available
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
// IN-MEMORY DATA STORE (Seeded for Production)
// ==========================================

// Pre-seeded Users
const usersStore = [
  {
    id: 'usr-admin-01',
    name: 'V Tharun Reddy',
    email: 'admin@cineverse.com',
    password: 'password123',
    tier: 'CineVerse AI VIP',
    status: 'Active',
    joinDate: 'Jan 2024',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    initials: 'TR'
  },
  {
    id: 'usr-demo-02',
    name: 'Elena Rostova',
    email: 'elena@cineverse.com',
    password: 'password123',
    tier: 'CineVerse AI VIP',
    status: 'Active',
    joinDate: 'Feb 2024',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    initials: 'ER'
  }
];

// Pre-seeded Movies Catalog
const moviesStore = [
  {
    id: 'movie-1',
    title: 'Neon Shadows: Genesis Protocol',
    subtitle: 'Season 1 • 8 Episodes',
    year: '2025',
    duration: '2h 14m',
    rating: '4.9',
    ratingCount: '18.4k',
    matchScore: 98,
    type: 'series',
    episodesInfo: 'Season 1 • 8 Episodes',
    genres: ['Cyberpunk', 'Neo-Noir', 'Sci-Fi', 'Thriller'],
    tags: ['Neural Heist', 'Quantum AI', 'Mind-Bending', '4K Master'],
    features: ['4K HDR', 'Dolby Atmos', 'Vision+'],
    posterImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    backdropImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    synopsis: 'In neo-Tokyo 2088, memory broker Ren Kaeda extracts encrypted neural memories. When a high-profile heist unleashes a rouge quantum consciousness, Ren must navigate biometric megacorps to prevent complete digital extinction.',
    aiPickReason: '98% match based on your recent cyberpunk sci-fi viewing history & preference for deep spatial soundscapes.',
    progressPercent: 65,
    remainingTime: '38m left',
    cast: [
      { name: 'Kaito Ken', role: 'Ren Kaeda', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Sora Vance', role: 'Dr. Astra Lin', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { name: 'Marcus Thorne', role: 'Commander Steel', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' }
    ],
    mood: {
      tension: 88,
      action: 76,
      visuals: 96,
      mystery: 92,
      pacing: 70,
      description: 'High psychological tension driven by neon aesthetics, synthwave audio dynamics, and non-linear memory plot structures.'
    },
    audienceConsensus: 'Praised universally for ground-breaking 7.1.4 Dolby Atmos spatial audio mastering, stunning neon cinematography, and intricate neural heist storytelling.'
  },
  {
    id: 'movie-2',
    title: 'The Architecture of Silence',
    year: '2024',
    duration: '1h 58m',
    rating: '4.8',
    ratingCount: '12.1k',
    matchScore: 94,
    type: 'movie',
    genres: ['Surrealism', 'Psychological', 'Sci-Fi'],
    tags: ['Non-Linear', 'Spatial Physics', 'Minimalist'],
    features: ['4K HDR', 'Spatial Audio'],
    posterImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    backdropImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    synopsis: 'An acoustical architect stumbles upon an impossible sound frequency inside an abandoned brutalist monolith, revealing that human memories are physically reflected in architectural geometry.',
    aiPickReason: 'Chosen for your interest in mind-bending soundscapes and avant-garde surreal cinema.',
    progressPercent: 20,
    remainingTime: '1h 24m left',
    cast: [
      { name: 'Julian Cross', role: 'Arthur Pendelton', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' },
      { name: 'Maya Lin', role: 'Helena Vance', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
    ],
    mood: {
      tension: 65,
      action: 35,
      visuals: 94,
      mystery: 98,
      pacing: 55,
      description: 'Atmospheric, contemplative, with deep resonance and hypnotic structural pacing.'
    },
    audienceConsensus: 'A quiet masterwork of visual geometry and acoustic isolation that lingers long after viewing.'
  },
  {
    id: 'movie-3',
    title: 'Void Transit',
    year: '2025',
    duration: '2h 32m',
    rating: '4.9',
    ratingCount: '24.9k',
    matchScore: 91,
    type: 'movie',
    genres: ['Hard Sci-Fi', 'Deep Space', 'Action'],
    tags: ['Gravitational Anomaly', 'Quantum Transit', 'Action'],
    features: ['4K HDR10+', 'Dolby Atmos'],
    posterImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80',
    backdropImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80',
    synopsis: 'A deep-space cargo vessel passes through a gravitational rift near Jupiter, casting the crew into a temporal loop where every jump alters the ship structural physics.',
    aiPickReason: 'Top trending hard sci-fi interstellar thriller across global CineVerse servers.',
    progressPercent: 90,
    remainingTime: '15m left',
    cast: [
      { name: 'David Mercer', role: 'Captain Ross', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Elena Rostova', role: 'Dr. Zoya Nyland', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' }
    ],
    mood: {
      tension: 90,
      action: 85,
      visuals: 92,
      mystery: 80,
      pacing: 88,
      description: 'Adrenaline-fueled orbital survival combined with rigorous quantum physics dynamics.'
    },
    audienceConsensus: 'High-octane interstellar intensity combined with flawless physical simulation visuals.'
  },
  {
    id: 'movie-4',
    title: 'Echoes in the Rain',
    subtitle: 'Season 2 • 10 Episodes',
    year: '2024',
    duration: '52m per episode',
    rating: '4.7',
    ratingCount: '9.8k',
    matchScore: 88,
    type: 'series',
    episodesInfo: 'Season 2 • 10 Episodes',
    genres: ['Neo-Noir', 'Cyberpunk', 'Mystery'],
    tags: ['Rain-Slicked', 'Detective', 'Synths'],
    features: ['4K HDR', 'Dolby Atmos'],
    posterImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80',
    backdropImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80',
    synopsis: 'In perpetual rainfall in dystopian Seattle, detective Sean Miller investigates synthetic Android disappearances linked to illegal synthetic memory trading.',
    aiPickReason: 'Recommended for atmospheric neo-noir lovers.',
    mood: {
      tension: 78,
      action: 60,
      visuals: 90,
      mystery: 88,
      pacing: 65,
      description: 'Melancholic, rain-soaked synth noir mystery with deep emotional weight.'
    },
    audienceConsensus: 'Visually atmospheric and emotionally resonant with an exceptional synth soundtrack.'
  }
];

// Pre-seeded Reviews per Movie
const reviewsStore = {
  'movie-1': [
    {
      id: 'rev-1',
      author: 'Marcus Vance',
      initials: 'MV',
      text: 'The Dolby Atmos spatial track during Episode 4 memory heist scene is unmatched across any streaming platform. 10/10 master quality.',
      rating: 5,
      date: '2 hours ago'
    },
    {
      id: 'rev-2',
      author: 'Sarah Jenkins',
      initials: 'SJ',
      text: 'Visual masterpiece. The psychological tension vectors matched the narrative perfectly.',
      rating: 5,
      date: '1 day ago'
    }
  ]
};

// In-Memory Watchlists per User Email
const watchlistsStore = {
  'admin@cineverse.com': ['movie-1', 'movie-3']
};

// Watch Party Rooms State Store
const watchPartyRoomsStore = {
  'CYBER-404': {
    roomCode: 'CYBER-404',
    movieId: 'movie-1',
    participants: [
      { id: '1', name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80', status: 'watching', micMuted: false, reaction: '🔥' },
      { id: '2', name: 'Sarah J.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', status: 'watching', micMuted: true },
      { id: '3', name: 'Kenji Sato', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80', status: 'ready', micMuted: false }
    ],
    messages: [
      { id: 'm1', user: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80', text: 'Whoa, check out the spatial audio echo here! 🤯', time: '14:20', isSelf: false },
      { id: 'm2', user: 'Sarah J.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', text: 'The neon reflections in this scene look hyper-realistic on 4K HDR', time: '14:22', isSelf: false }
    ]
  }
};

// ==========================================
// REST API ENDPOINTS
// ==========================================

// 1. Health check for Render telemetry
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'CineVerse Neural Streaming API Server',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
    aiEngineActive: !!aiClient
  });
});

// 2. Authentication: Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const existing = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    email,
    password,
    tier: 'CineVerse AI VIP',
    status: 'Active',
    joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80`,
    initials
  };

  usersStore.push(newUser);
  watchlistsStore[email] = ['movie-1'];

  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({
    message: 'User registered successfully',
    user: userWithoutPassword,
    token: `cv_token_${Date.now()}`
  });
});

// 3. Authentication: Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password credentials' });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json({
    message: 'Login successful',
    user: userWithoutPassword,
    token: `cv_token_${Date.now()}`
  });
});

// 4. Movies Catalog Endpoint
app.get('/api/movies', (req, res) => {
  const { genre, type, search } = req.query;
  let result = [...moviesStore];

  if (type) {
    result = result.filter(m => m.type === type);
  }
  if (genre) {
    result = result.filter(m => m.genres.some(g => g.toLowerCase() === String(genre).toLowerCase()));
  }
  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.synopsis.toLowerCase().includes(q) ||
      m.genres.some(g => g.toLowerCase().includes(q))
    );
  }

  res.json({
    count: result.length,
    movies: result
  });
});

// 5. Single Movie Details Endpoint
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

// 6. Add Movie Review Endpoint
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

// 7. CineAI Neural Search Endpoint (Gemini AI or Smart Matcher)
app.post('/api/ai/search', async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query prompt is required' });
  }

  try {
    if (aiClient) {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are CineAI, an expert neural movie recommendation engine.
The user prompt is: "${query}".
Evaluate the following movie catalog: ${JSON.stringify(moviesStore.map(m => ({ id: m.id, title: m.title, genres: m.genres, synopsis: m.synopsis })))}.
Return a JSON array of objects with fields "id" and "matchScore" (integer 0-100) and "reason" (short 1 sentence string why it matches).
Return JSON ONLY.`
      });

      const responseText = response.text || '';
      const jsonMatch = responseText.match(/\[.*\]/s);
      if (jsonMatch) {
        const matches = JSON.parse(jsonMatch[0]);
        const matchedMovies = matches.map(match => {
          const original = moviesStore.find(m => m.id === match.id);
          return original ? { ...original, matchScore: match.matchScore, aiPickReason: match.reason } : null;
        }).filter(Boolean);

        return res.json({ query, results: matchedMovies });
      }
    }
  } catch (err) {
    console.warn('Gemini AI fallback triggered:', err.message);
  }

  // Smart Neural Fallback Scoring Algorithm
  const qLower = query.toLowerCase();
  const scored = moviesStore.map(m => {
    let score = 75;
    if (qLower.includes('cyber') || qLower.includes('neon') || qLower.includes('heist')) {
      if (m.genres.includes('Cyberpunk') || m.genres.includes('Neo-Noir')) score += 20;
    }
    if (qLower.includes('space') || qLower.includes('deep') || qLower.includes('quantum')) {
      if (m.genres.includes('Hard Sci-Fi') || m.genres.includes('Deep Space')) score += 20;
    }
    if (qLower.includes('mind') || qLower.includes('surreal') || qLower.includes('silence')) {
      if (m.genres.includes('Surrealism') || m.genres.includes('Psychological')) score += 20;
    }
    return {
      ...m,
      matchScore: Math.min(99, score)
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  res.json({
    query,
    results: scored
  });
});

// 8. Watch Party API Endpoints
app.get('/api/watchparty/rooms/:code', (req, res) => {
  const { code } = req.params;
  const room = watchPartyRoomsStore[code] || {
    roomCode: code,
    movieId: 'movie-1',
    participants: [],
    messages: []
  };
  res.json(room);
});

app.post('/api/watchparty/rooms/:code/join', (req, res) => {
  const { code } = req.params;
  const { name, avatar } = req.body;

  if (!watchPartyRoomsStore[code]) {
    watchPartyRoomsStore[code] = {
      roomCode: code,
      movieId: 'movie-1',
      participants: [],
      messages: []
    };
  }

  const room = watchPartyRoomsStore[code];
  const newParticipant = {
    id: `part-${Date.now()}`,
    name: name || 'Anonymous Guest',
    avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'watching',
    micMuted: false
  };

  room.participants.push(newParticipant);
  res.json({ message: 'Joined watch party room', room, participant: newParticipant });
});

app.post('/api/watchparty/rooms/:code/message', (req, res) => {
  const { code } = req.params;
  const { user, text, reaction, avatar } = req.body;

  if (!watchPartyRoomsStore[code]) {
    return res.status(404).json({ error: 'Watch party room not found' });
  }

  const room = watchPartyRoomsStore[code];
  const newMsg = {
    id: `msg-${Date.now()}`,
    user: user || 'Anonymous',
    avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    text: text || reaction || '',
    reaction: reaction || null,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isSelf: true
  };

  room.messages.push(newMsg);
  res.status(201).json({ message: 'Message sent', messageItem: newMsg });
});

// 9. Watchlist Endpoints
app.get('/api/watchlist', (req, res) => {
  const email = req.headers['x-user-email'] || 'admin@cineverse.com';
  const listIds = watchlistsStore[email] || [];
  const listMovies = moviesStore.filter(m => listIds.includes(m.id));
  res.json({ watchlist: listMovies, ids: listIds });
});

app.post('/api/watchlist/toggle', (req, res) => {
  const { movieId } = req.body;
  const email = req.headers['x-user-email'] || 'admin@cineverse.com';

  if (!watchlistsStore[email]) {
    watchlistsStore[email] = [];
  }

  const index = watchlistsStore[email].indexOf(movieId);
  let isAdded = false;
  if (index > -1) {
    watchlistsStore[email].splice(index, 1);
  } else {
    watchlistsStore[email].push(movieId);
    isAdded = true;
  }

  res.json({ message: 'Watchlist updated', movieId, isAdded, currentWatchlist: watchlistsStore[email] });
});

// 10. Studio Console Telemetry Analytics
app.get('/api/analytics', (req, res) => {
  res.json({
    totalArr: '$2.4M',
    active4KStreams: '45.2K',
    churnRate: '1.2%',
    aiAccuracy: '94%',
    edgeNodes: 14,
    trafficData: [
      { time: '00:00', val: 12 },
      { time: '04:00', val: 8 },
      { time: '08:00', val: 24 },
      { time: '12:00', val: 38 },
      { time: '16:00', val: 42, isPeak: true },
      { time: '20:00', val: 35 },
      { time: '23:59', val: 19 }
    ]
  });
});

// Serve frontend static assets if dist folder exists (for unified preview)
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
  console.log(`  Health check: http://localhost:${PORT}/api/health `);
  console.log(`====================================================`);
});
