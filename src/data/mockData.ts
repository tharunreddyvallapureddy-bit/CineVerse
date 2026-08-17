import { Movie, UserSubscription, SystemActivity, CMSItem, WatchPartyParticipant, ChatMessage } from '../types';

export const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDilcDMjT2IMKobG2PyWehScaJvKbUzg9MkB6w4eeqvxXR4i-ChPCDLEC-R37U4yqdeC9NW0cgahKokMWK01DBU8_RIOmB7yvS75Fs-jT-hxmbxwA_gOtwZvDAcrb6wPmfKPqc5CpzrENCYguTEN-Celvs46Fd6moUQG-ku_5TZGqDilarCVrs4XFM9AbxyIvGiL3PEQGevNi7rdMTgGBC5Cc5diTf9sE1NcvYdYPH5Bf2q7hWuJoVw";

export const ADMIN_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";

// Empty initial movie catalog - populated dynamically by Admin uploads
export const MOVIES_DATA: Movie[] = [];

export const TOP_10_TODAY: Array<{ rank: number; title: string; genreDuration: string; image: string }> = [];

export const PREMIERE_ATTENDEES: string[] = [];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [];

export const WATCH_PARTY_PARTICIPANTS: WatchPartyParticipant[] = [];

export const USERS_DATA: UserSubscription[] = [
  {
    id: 'u-admin-master',
    name: 'Tharun Reddy',
    email: 'vallapureddytharunreddy6281@gmail.com',
    avatar: ADMIN_AVATAR,
    joinDate: 'Aug 2026',
    tier: 'CineVerse Master Admin',
    status: 'Active'
  }
];

export const SYSTEM_ACTIVITIES: SystemActivity[] = [
  {
    id: 'a1',
    time: 'Just Now',
    title: 'CineVerse Platform Initialized:',
    highlight: 'Clean Master Store',
    subtitle: 'Ready for Admin movie uploads via Studio Console.',
    type: 'ingest'
  }
];

export const CMS_RECENT_ITEMS: CMSItem[] = [];
