export type ViewMode = 
  | 'home'
  | 'movies'
  | 'series'
  | 'categories'
  | 'movie-detail'
  | 'player'
  | 'console-overview'
  | 'console-cms'
  | 'console-users'
  | 'console-settings';

export interface CastMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  initials: string;
  rating: number; // 0 to 5
  text: string;
  source?: string;
}

export interface MoodProfile {
  tension: number; // 0-100
  action: number;
  visuals: number;
  romance: number;
  mystery: number;
  pacing: number;
  description: string;
}

export interface Movie {
  id: string;
  title: string;
  subtitle?: string;
  type: 'movie' | 'series';
  year: number;
  duration?: string;
  episodesInfo?: string;
  rating: number;
  ratingCount: string;
  matchScore: number;
  genres: string[];
  tags: string[];
  features: string[]; // e.g. ['4K HDR', 'Dolby Atmos', 'Sci-Fi', 'Thriller']
  synopsis: string;
  posterImage: string;
  backdropImage: string;
  videoPreviewUrl?: string;
  isCineAIPick?: boolean;
  aiPickReason?: string;
  progressPercent?: number;
  remainingTime?: string;
  cast: CastMember[];
  mood: MoodProfile;
  audienceConsensus: string;
  reviews: Review[];
}

export interface ChatMessage {
  id: string;
  user: string;
  avatar: string;
  isSelf: boolean;
  text: string;
  time?: string;
}

export interface WatchPartyParticipant {
  id: string;
  name: string;
  avatar: string;
  status: 'watching' | 'reacted' | 'paused';
  reaction?: string;
  micMuted: boolean;
}

export interface UserSubscription {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initials?: string;
  joinDate: string;
  tier: 'CineVerse Master Admin' | 'CineVerse AI VIP' | 'Pro' | 'Free' | string;
  status: 'Active' | 'Canceled' | 'Suspended';
}

export interface SystemActivity {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  type: 'ingest' | 'spike' | 'model' | 'alert';
  highlight?: string;
  badge?: string;
}

export interface CMSItem {
  id: string;
  title: string;
  status: 'Live' | 'Processing Metadata...' | 'Draft';
  genre: string;
  duration: string;
  progress?: number;
  poster: string;
}
