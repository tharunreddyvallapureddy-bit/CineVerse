import { Movie, UserSubscription, SystemActivity, CMSItem, WatchPartyParticipant, ChatMessage } from '../types';

export const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuDilcDMjT2IMKobG2PyWehScaJvKbUzg9MkB6w4eeqvxXR4i-ChPCDLEC-R37U4yqdeC9NW0cgahKokMWK01DBU8_RIOmB7yvS75Fs-jT-hxmbxwA_gOtwZvDAcrb6wPmfKPqc5CpzrENCYguTEN-Celvs46Fd6moUQG-ku_5TZGqDilarCVrs4XFM9AbxyIvGiL3PEQGevNi7rdMTgGBC5Cc5diTf9sE1NcvYdYPH5Bf2q7hWuJoVw";

export const ADMIN_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuBCo7wqxUTzqQSgqyKiWBdBJdSSlux_uZRJGOHkuj-vdZxCXGIqb-lNwaWOus6Jr5E17VgiiCOwTfsrw2kLKa6-hZBy3kiZ5dN4Mf13tcwP-TbXqSQiGiB0TkxZSLP9WbnoqqZ8m9sHYmUUSWSJTQJmZdnNE9FbpRbx2W--Hh0evOWy9YC9V4J0XChxaJfMLr7zx3GksbGC-Tbwrk0YCQwsGL1Uo1tlzdVBw0MGxtcVvg_Rk2hBjgTn";

export const MOVIES_DATA: Movie[] = [
  {
    id: 'neon-shadows',
    title: 'Neon Shadows: The Genesis Protocol',
    subtitle: 'Season 1 • Episode 4: The Synthetic Dawn',
    type: 'series',
    year: 2024,
    duration: '58m',
    episodesInfo: 'S1 E4',
    rating: 4.9,
    ratingCount: '18.4k',
    matchScore: 98,
    genres: ['Sci-Fi', 'Thriller', 'Cyberpunk'],
    tags: ['#MindBending', '#Cyberpunk', '#SlowBurn', '#AI'],
    features: ['4K HDR', 'Dolby Atmos', 'Sci-Fi', 'Thriller'],
    synopsis: 'When a rogue AI intercepts a transmission from deep space, a lone detective must decipher its meaning before the megacorporations plunge the city into a digital dark age.',
    backdropImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTDel8D9qbTOOisBtXAS3fXjTfrc-NyvdIERYclsGXwoynaOZ90-8Q871deuR8bYfvh4toQJwdEj9CxvoUUfIPZZoDhWXFiVZKetB8du459i_4Im5q16ul5BCKVi-6IezgNqJhhOzf4wtPvLX0elw_-TEuRTKwck0ulOBcoVyit3Wcwx-Kg8NXzfDlcrdzYk_75Cc7a2URbXkDGiRz6mI971oBYMaOYCdawziDSpET6HzdFY_P-w12',
    posterImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDaceZBysi3PZxNpcJQN6pAlqIrd1TTrIy-UMhCqdyXrh2RfE0MZdwQ1SlrYp-23XJf4G-UbAHiBu-hZUb3-Zl33vcMMflnA8WuXTtnKQnfNN6gI2wUbsXQqfhuDEWT95Jp_X3tSAEXGqEB8kGWiaTdOlIRSpS7I6pHsBx-rCMeKFU0pKrvApxYgHaO5Iljccvh7trGILBdxMjS_dj0ZnBPtVMI55avN6yWzAh4uAJKrRKgDwLZeyt',
    isCineAIPick: true,
    aiPickReason: 'Because you watched "Blade Runner 2049" and highly rated "Altered Carbon". AI detected a 96% match for your preference in #Cyberpunk aesthetics and #SlowBurn pacing.',
    progressPercent: 41,
    remainingTime: '34m remaining',
    cast: [
      {
        id: 'c1',
        name: 'Elara Vance',
        role: 'The Archivist',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApD9BPGVZniueBjCIhLh67L-WLmn7vMzFkID3LTDK71oFzrAWX5AaJZWi3XoHyN7UkcqdVpXXxq9Ps5FPW2ZY3Gpg6UFAarRMAZoq-xYnBgnkdqIan_xRLgW2uSi5cOSUXD3XaBXblJPI81Wdn7F9nmqC_ztAO0BC6Zy5rAY6GS5iUQyvtt1MIdGVCltdjsRlqCQe3dMKuAzOmPbnxgQNfELjoM_-VJ4-BLifLjRsnDelHn2mdq6fv'
      },
      {
        id: 'c2',
        name: 'Silas Thorne',
        role: 'Lead Wiper',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWS0kepiCmvs-mhcFZTfztOIrEs2cv0WWrAJNtQE4zDpCuHAgGeB7yZ-8h8PoHkz1wowQp-EzYFVRTYjB-xjuej2jOf0ydw6sLIt80X1rKWIguAFWVXfEhSStF8tEpIAwMpH13FglwqpWTNMPa4cVtqzKlzbcYEXSd40goahfnVw2zTnJ6z2Rkei3m3XbsOPaC_QM9Y5SNHZmT_gaUN-p9saeWj7B4Sxz8QwwPINbbM1MiB7MZpQMr'
      },
      {
        id: 'c3',
        name: 'Jax',
        role: 'Smuggler',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy7KrDm4YWLCcPFi7p8aOmXQCAHGmbLT6hOlQgm8f8klLZtQ4athxe5en7-5N7xg_FhXlt7KYTAgdhHg8y2Vlzuw--GqTVhH06_xUrRyvj-XPEDAlxT-LX3njfh4pWPSlspU17NqPSjMbM4PkcVpJmucyxYTcgVmLi6f5WcinT8SZLr_PRWLjvXBDQ2A3Ti4-XP-gYJnZzt-GPEKO88EHM217WuvXWz3SJA-0uXH4SuDhQk26hIEJQ'
      }
    ],
    mood: {
      tension: 85,
      action: 78,
      visuals: 96,
      romance: 25,
      mystery: 92,
      pacing: 70,
      description: 'High tension and striking visuals match your recent watch history.'
    },
    audienceConsensus: 'Viewers are overwhelmingly praising the visually stunning world-building and relentless pacing. While some found the philosophical undertones slightly heavy-handed in the third act, the general consensus highlights Elara Vance\'s performance as a standout in modern cyberpunk cinema.',
    reviews: [
      {
        id: 'r1',
        author: 'J. Doe',
        initials: 'JD',
        rating: 4.5,
        text: 'A sensory overload in the best way possible. The score alone is worth the price of admission. Highly recommend watching with good headphones.'
      },
      {
        id: 'r2',
        author: 'A. Knight',
        initials: 'AK',
        rating: 4.0,
        text: 'Incredible visuals, but the plot gets a bit convoluted near the end. Still an absolute must-watch for sci-fi fans.'
      }
    ]
  },
  {
    id: 'neon-resonance',
    title: 'Neon Resonance',
    subtitle: 'Feature Film',
    type: 'movie',
    year: 2024,
    duration: '2h 14m',
    rating: 4.8,
    ratingCount: '12k',
    matchScore: 98,
    genres: ['Sci-Fi', 'Thriller', 'Mystery'],
    tags: ['#Cyberpunk', '#MemoryHeist', '#Noir'],
    features: ['4K HDR', 'Dolby Atmos', 'Sci-Fi', 'Thriller'],
    synopsis: 'In a future where memories are traded as currency, a rogue archivist discovers a fragmented recording that could unravel the fabric of society. As hunted by elite corporate memory-wipers, she must decode the truth before her own mind is erased.',
    backdropImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhAZTFesQAvwICHYZeq5Xm4jKnJV79Fok00jlD-O8Y7f3PU16xZZcXj2EXPS8LGmMn_sR0k8CxyXqX_SHrXuLCJmECQe0w9ATHIdSHObborJMdpausN08XMtsjS00xAV-iMBxnml4JW0U9ObueLnuS0n2Rl8UwNAZuiMoBSCC9IhkYQV8yZypD4Yzn4hfpmP5AuBgxHTrC7QRc4FETp3LWN4YILs0uCQ-at-wmItt30V9RRkg0i3Ic',
    posterImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFx53SJ5MjidzDPdnVtKJAFrVkpgWaVKB7-FXNHQHOJTEQGDJaw486CvEbOhhuhPwnEWvbMnGOsu57NCTzerC9ZgI7YJR18iCkU5KG-6LuS8KR8pgKfKkMkzCEx_FMwjgU5b8ZFCHx3WrbH9DtrpD6H6-J2pEflhv0LtpBt83Mqwas3M3xDCMAxO2YkTHvXvWEZFZZKIsibj8WKsW8KcnJp2bQRNlGaferTfLusecYfofDuCFPhmY7',
    isCineAIPick: true,
    aiPickReason: 'Neural similarity score 98% based on atmospheric neo-noir pacing and audio mastery preferences.',
    cast: [
      {
        id: 'c1',
        name: 'Elara Vance',
        role: 'The Archivist',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApD9BPGVZniueBjCIhLh67L-WLmn7vMzFkID3LTDK71oFzrAWX5AaJZWi3XoHyN7UkcqdVpXXxq9Ps5FPW2ZY3Gpg6UFAarRMAZoq-xYnBgnkdqIan_xRLgW2uSi5cOSUXD3XaBXblJPI81Wdn7F9nmqC_ztAO0BC6Zy5rAY6GS5iUQyvtt1MIdGVCltdjsRlqCQe3dMKuAzOmPbnxgQNfELjoM_-VJ4-BLifLjRsnDelHn2mdq6fv'
      },
      {
        id: 'c2',
        name: 'Silas Thorne',
        role: 'Lead Wiper',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWS0kepiCmvs-mhcFZTfztOIrEs2cv0WWrAJNtQE4zDpCuHAgGeB7yZ-8h8PoHkz1wowQp-EzYFVRTYjB-xjuej2jOf0ydw6sLIt80X1rKWIguAFWVXfEhSStF8tEpIAwMpH13FglwqpWTNMPa4cVtqzKlzbcYEXSd40goahfnVw2zTnJ6z2Rkei3m3XbsOPaC_QM9Y5SNHZmT_gaUN-p9saeWj7B4Sxz8QwwPINbbM1MiB7MZpQMr'
      },
      {
        id: 'c3',
        name: 'Jax',
        role: 'Smuggler',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy7KrDm4YWLCcPFi7p8aOmXQCAHGmbLT6hOlQgm8f8klLZtQ4athxe5en7-5N7xg_FhXlt7KYTAgdhHg8y2Vlzuw--GqTVhH06_xUrRyvj-XPEDAlxT-LX3njfh4pWPSlspU17NqPSjMbM4PkcVpJmucyxYTcgVmLi6f5WcinT8SZLr_PRWLjvXBDQ2A3Ti4-XP-gYJnZzt-GPEKO88EHM217WuvXWz3SJA-0uXH4SuDhQk26hIEJQ'
      }
    ],
    mood: {
      tension: 88,
      action: 82,
      visuals: 94,
      romance: 18,
      mystery: 90,
      pacing: 76,
      description: 'High tension and striking visuals match your recent watch history.'
    },
    audienceConsensus: 'Viewers are overwhelmingly praising the visually stunning world-building and relentless pacing. While some found the philosophical undertones slightly heavy-handed in the third act, the general consensus highlights Elara Vance\'s performance as a standout in modern cyberpunk cinema.',
    reviews: [
      {
        id: 'r1',
        author: 'J. Doe',
        initials: 'JD',
        rating: 4.5,
        text: 'A sensory overload in the best way possible. The score alone is worth the price of admission. Highly recommend watching with good headphones.'
      },
      {
        id: 'r2',
        author: 'A. Knight',
        initials: 'AK',
        rating: 4.0,
        text: 'Incredible visuals, but the plot gets a bit convoluted near the end. Still an absolute must-watch for sci-fi fans.'
      }
    ]
  },
  {
    id: 'echoes-in-the-rain',
    title: 'Echoes in the Rain',
    subtitle: 'Season 2 • Episode 4',
    type: 'series',
    year: 2024,
    duration: '52m',
    episodesInfo: 'S2 E4',
    rating: 4.7,
    ratingCount: '8.2k',
    matchScore: 95,
    genres: ['Crime', 'Drama', 'Noir'],
    tags: ['#Gritty', '#RainSlicked', '#Detective'],
    features: ['4K HDR', '5.1 Audio'],
    synopsis: 'Detective Miller uncovers a pattern in the cold cases spanning three decades along the northern bay district, pointing directly at the city council.',
    backdropImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqMporplH7_7Mhh-bcbjjL2eiTFJL28GXMrQ4-C0c-kzG5J_mmUCGjIYZvTf7ufkdArUvSL67ip2jPDd10vSsZwD8b26X_jdoeWx4tHuKuGqUxaGj22cDEFHo5o4PncOOKqMv2Ih4_YFY4jvknZ6078Sk_z-tcqaL1WUpgbOhd5tTCOck43lqtnIi91gaflzac73IO1r3T2RXS8C9K1tVpdU6sjiROPghATnb3X1ptbWX_q37ul_6R',
    posterImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqMporplH7_7Mhh-bcbjjL2eiTFJL28GXMrQ4-C0c-kzG5J_mmUCGjIYZvTf7ufkdArUvSL67ip2jPDd10vSsZwD8b26X_jdoeWx4tHuKuGqUxaGj22cDEFHo5o4PncOOKqMv2Ih4_YFY4jvknZ6078Sk_z-tcqaL1WUpgbOhd5tTCOck43lqtnIi91gaflzac73IO1r3T2RXS8C9K1tVpdU6sjiROPghATnb3X1ptbWX_q37ul_6R',
    progressPercent: 65,
    remainingTime: '42m remaining',
    cast: [],
    mood: { tension: 75, action: 50, visuals: 85, romance: 30, mystery: 95, pacing: 60, description: 'Atmospheric detective noir with rain-drenched intrigue.' },
    audienceConsensus: 'A masterclass in atmospheric slow-burn crime thriller storytelling.',
    reviews: []
  },
  {
    id: 'dune-chronicles',
    title: 'Dune: Chronicles',
    subtitle: 'Epic Sci-Fi Saga',
    type: 'movie',
    year: 2024,
    duration: '2h 45m',
    rating: 4.9,
    ratingCount: '45.1k',
    matchScore: 97,
    genres: ['Sci-Fi', 'Adventure'],
    tags: ['#Epic', '#Desert', '#SpaceOpera'],
    features: ['IMAX Enhanced', 'Dolby Atmos'],
    synopsis: 'A solitary explorer ventures across the twin-sun dunes of a forbidden planet to unlock ancient terraforming machinery.',
    backdropImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCougN2oReRlErMSGbNNUcrUlt4wA9CUy6vcQw5hL0ZMiq24BlI7mvhfUX6x5rAE6hBZwMBnKmgzD8oWVWnXoHvbpzzvNCAJZuWcLf_JpzHtD7Nwrijv1RJqOFhLvp7sz83fMW_c7IiFv_WnEBmgywrY8S67PnvW6v0mscCAIYsF7X1yURSyxRyXpUkUca9_dX3De37Pt0EDFFfzDhser3qYMBtUMMmmQE8aIKVzKJ6E1F48Spwa5cb',
    posterImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCougN2oReRlErMSGbNNUcrUlt4wA9CUy6vcQw5hL0ZMiq24BlI7mvhfUX6x5rAE6hBZwMBnKmgzD8oWVWnXoHvbpzzvNCAJZuWcLf_JpzHtD7Nwrijv1RJqOFhLvp7sz83fMW_c7IiFv_WnEBmgywrY8S67PnvW6v0mscCAIYsF7X1yURSyxRyXpUkUca9_dX3De37Pt0EDFFfzDhser3qYMBtUMMmmQE8aIKVzKJ6E1F48Spwa5cb',
    progressPercent: 15,
    remainingTime: '2h 15m remaining',
    cast: [],
    mood: { tension: 80, action: 70, visuals: 99, romance: 40, mystery: 85, pacing: 65, description: 'Sweeping planetary scale with unmatched cinematography.' },
    audienceConsensus: 'A visual titan that sets a new high benchmark for modern cinematic world-building.',
    reviews: []
  },
  {
    id: 'velocity-protocol',
    title: 'Velocity Protocol',
    subtitle: 'High Octane Action',
    type: 'movie',
    year: 2024,
    duration: '1h 50m',
    rating: 4.6,
    ratingCount: '9.8k',
    matchScore: 92,
    genres: ['Action', 'Thriller'],
    tags: ['#HighOctane', '#CarChase', '#Adrenaline'],
    features: ['4K HDR', 'Dolby 7.1'],
    synopsis: 'A high-octane car chase through narrow European city streets as an elite courier carries a stolen quantum encryption key.',
    backdropImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCglizO0rhmNH5KpCXXl6FMasvogJrGfIsGVwDwzWiqha_YXnQKotWdmgNDOzZZMiUUcpw22SGDWqP_Rf-l7kcOkZGsESRo6rF58YsDt1C-LE9baIARrpEFRM_Z_rlz1hJz8kj9jl890TEDpNPHq_qLmecKEO9pbiXPlz3Ebp6OL2C2Pr1u2uYAnQQkafDs9PmLXcf0R9EL6TAV6iOiZYXCaRXIF8Lt7LxoMsuvWvKfZ65CXMXTYKu1',
    posterImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCglizO0rhmNH5KpCXXl6FMasvogJrGfIsGVwDwzWiqha_YXnQKotWdmgNDOzZZMiUUcpw22SGDWqP_Rf-l7kcOkZGsESRo6rF58YsDt1C-LE9baIARrpEFRM_Z_rlz1hJz8kj9jl890TEDpNPHq_qLmecKEO9pbiXPlz3Ebp6OL2C2Pr1u2uYAnQQkafDs9PmLXcf0R9EL6TAV6iOiZYXCaRXIF8Lt7LxoMsuvWvKfZ65CXMXTYKu1',
    progressPercent: 89,
    remainingTime: '12m remaining',
    cast: [],
    mood: { tension: 95, action: 98, visuals: 88, romance: 10, mystery: 45, pacing: 95, description: 'Relentless speed, pulse-pounding vehicular choreography.' },
    audienceConsensus: 'Pure unadulterated stunt craft with non-stop adrenaline from start to finish.',
    reviews: []
  },
  {
    id: 'architecture-of-silence',
    title: 'The Architecture of Silence',
    subtitle: 'Surrealist Mind-Bender',
    type: 'movie',
    year: 2024,
    duration: '2h 08m',
    rating: 4.8,
    ratingCount: '15.3k',
    matchScore: 98,
    genres: ['Psychological', 'Mystery', 'Drama'],
    tags: ['#MindBending', '#Surreal'],
    features: ['4K HDR', 'Spatial Audio'],
    synopsis: 'Abstract geometric spaces and memory corridors where a mathematician discovers a doorway between reality layers.',
    backdropImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlTMuHkGqwQ8HGFDbzr0TzJBoqrkFDBnBTvFDDXCkdbzTmdbbctZkU81CTR5LA-XmJscCxInPg3OAUoIN2oQf_4CjvZvzLlfQBdAr6Hmx6Q7UfaqrLRw08GAcityGLLKCu69q1V3xM2a9BU4TuvGguMXVB4o-EvDq0c2A4wy8_dU0neeL16TtxOsesFHbDeBR7jmELMfeQcLrHkS7uwS3KwtthyTiZDx5i3tDlGWB4Zv6TJbBXxdeE',
    posterImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlTMuHkGqwQ8HGFDbzr0TzJBoqrkFDBnBTvFDDXCkdbzTmdbbctZkU81CTR5LA-XmJscCxInPg3OAUoIN2oQf_4CjvZvzLlfQBdAr6Hmx6Q7UfaqrLRw08GAcityGLLKCu69q1V3xM2a9BU4TuvGguMXVB4o-EvDq0c2A4wy8_dU0neeL16TtxOsesFHbDeBR7jmELMfeQcLrHkS7uwS3KwtthyTiZDx5i3tDlGWB4Zv6TJbBXxdeE',
    cast: [],
    mood: { tension: 70, action: 30, visuals: 96, romance: 20, mystery: 98, pacing: 65, description: 'Surreal geometries challenging perception.' },
    audienceConsensus: 'Hypnotic and intellectually daring with haunting visual symmetry.',
    reviews: []
  },
  {
    id: 'neon-requiem',
    title: 'Neon Requiem',
    subtitle: 'Cyberpunk Noir',
    type: 'movie',
    year: 2024,
    duration: '2h 10m',
    rating: 4.7,
    ratingCount: '11.4k',
    matchScore: 94,
    genres: ['Cyberpunk', 'Noir', 'Action'],
    tags: ['#Cyberpunk', '#Noir'],
    features: ['4K HDR', 'Dolby Atmos'],
    synopsis: 'A lone figure navigates rain-slicked alleyways lit by neon signs, uncovering a corporate coverup of synthetic human consciousness.',
    backdropImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANi1u3CFZEzSdUxsQaPiGR53cYo-5wdP7pY7ayR7v4PwrBZzNijlGaYxcS4YoCx7YeRnDGuYOAREdIL7i3-d4LBohoQimImb3G8vgDedNxpfaDeH0iAeoBT4ChbCdryW-rLqIxcJSd6gLcJM3mMqKWgS4bI2KVAk94sAo5dmOdJhX8Fnlp9hmS49gDeWq8TvWjmA3G7WiWrV8dHZJ2WFuSB-GA7xU5sucdpJbcz0MhgvJfZU4Uhil6',
    posterImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANi1u3CFZEzSdUxsQaPiGR53cYo-5wdP7pY7ayR7v4PwrBZzNijlGaYxcS4YoCx7YeRnDGuYOAREdIL7i3-d4LBohoQimImb3G8vgDedNxpfaDeH0iAeoBT4ChbCdryW-rLqIxcJSd6gLcJM3mMqKWgS4bI2KVAk94sAo5dmOdJhX8Fnlp9hmS49gDeWq8TvWjmA3G7WiWrV8dHZJ2WFuSB-GA7xU5sucdpJbcz0MhgvJfZU4Uhil6',
    cast: [],
    mood: { tension: 85, action: 75, visuals: 95, romance: 35, mystery: 85, pacing: 70, description: 'Classic noir tropes blended with cybernetic futurism.' },
    audienceConsensus: 'Electric atmosphere with gorgeous practical-lighting aesthetics.',
    reviews: []
  },
  {
    id: 'void-transit',
    title: 'Void Transit',
    subtitle: 'Hard Sci-Fi Deep Space',
    type: 'movie',
    year: 2024,
    duration: '2h 22m',
    rating: 4.8,
    ratingCount: '9.1k',
    matchScore: 91,
    genres: ['Hard Sci-Fi', 'Space', 'Thriller'],
    tags: ['#HardSciFi', '#Atmospheric'],
    features: ['4K HDR', 'Dolby Atmos'],
    synopsis: 'A deep space transport craft encounters a silent quantum anomaly on the edge of the Kuiper belt.',
    backdropImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHnEfku3o65s0vBDWftcs4vcgclWbX9g2TptmFX-Gr96LCuJrG1egBxT-46MV4ssCQFKGCca0AQix39Vffiqy1Hhjm18ZhPXW7gLRuEbJnvPW3ffKRmJBOXdKu_h4Tig5Pbld2R1OC8kOclRaXKcUwuJGIK5lQumO4dV9mDzmXcMqDei2LGQFJJqL5kevANZJ9l19-Qe6bdWcVin8HKER67fNGi61ZoBl-aTnhNNJHueNPFAbCnB2A',
    posterImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHnEfku3o65s0vBDWftcs4vcgclWbX9g2TptmFX-Gr96LCuJrG1egBxT-46MV4ssCQFKGCca0AQix39Vffiqy1Hhjm18ZhPXW7gLRuEbJnvPW3ffKRmJBOXdKu_h4Tig5Pbld2R1OC8kOclRaXKcUwuJGIK5lQumO4dV9mDzmXcMqDei2LGQFJJqL5kevANZJ9l19-Qe6bdWcVin8HKER67fNGi61ZoBl-aTnhNNJHueNPFAbCnB2A',
    cast: [],
    mood: { tension: 90, action: 40, visuals: 95, romance: 10, mystery: 95, pacing: 60, description: 'Realistic space physics meets cosmic horror.' },
    audienceConsensus: 'Chilling, scientifically grounded, and profoundly atmospheric.',
    reviews: []
  }
];

export const TOP_10_TODAY = [
  {
    rank: 1,
    title: 'The Crystal Throne',
    genreDuration: 'Fantasy · 2h 45m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcntQlVgyONoekkCevBFkD59nilGbAXs8r-HspLcIwPNQ75dPImrZt_RZxaOg1ntKHnBy_t566jwCrqDlWAkTm43Vj5CGGmNT4X-ezUuqX8diBIpYheFJvwbIUBwDk5sdbjGFCNQ0jbClwYkPwTyJSDIkdJruIz1cj77FprfKz6K7Kizr90cKQGlHDAG7Le8NKX4MNYfGGLxCZw5zuOkjdSwDLA1tlTrIsqwmBPOZQ_n4zHzHdWcDz'
  },
  {
    rank: 2,
    title: 'Corporate Synergy',
    genreDuration: 'Comedy · 1h 52m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7quEta7jQ5362RMkFYhEDAciHTsUH6lhybPR4GVTwlt1tUyC59p6IeEiE_YBIbLZVLRroIKjnT2NN2PaTqranqVAMZr1vBWVUrFKKGxf36Kj5qGBTuqjLil5-Y3Ikzob2w-o8JEDRcxy3ehNfgm_FoeDWeoH-4a0q011r1JpaqUdQZA0kffkjrc6YJjU8E9XMwGeS4bi6-UPj0wGTFrEG56exvFTFI4BCVXLXOh9cRfRnTOUJ0Alj'
  },
  {
    rank: 3,
    title: 'Shattered Glass',
    genreDuration: 'Horror · 1h 38m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCwjilQ8iz1XcTiTDNqZRVDYTNHc1X223K0TW9zHK0xXx5ayliWhsdts6P-jsB4GyOCPlTh1ZycqsMJqNCSIYAbBFS22F-60IjE1rcj54xu0wVLsUFHXYEH8lO8RG_b141w7oJlXg1JVKLr2LOHMyrQ-w-dAdqnmmhE7s6oBmuycqiejPZAYxliOvyj6-GrEFAlXaA7ti9LCDHVIBCZN8lxDfcjO6rTNxqUxVh7gYyOvqnFYdhT-_w'
  },
  {
    rank: 4,
    title: 'Quantum Drift',
    genreDuration: 'Sci-Fi · 2h 14m',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFx53SJ5MjidzDPdnVtKJAFrVkpgWaVKB7-FXNHQHOJTEQGDJaw486CvEbOhhuhPwnEWvbMnGOsu57NCTzerC9ZgI7YJR18iCkU5KG-6LuS8KR8pgKfKkMkzCEx_FMwjgU5b8ZFCHx3WrbH9DtrpD6H6-J2pEflhv0LtpBt83Mqwas3M3xDCMAxO2YkTHvXvWEZFZZKIsibj8WKsW8KcnJp2bQRNlGaferTfLusecYfofDuCFPhmY7'
  }
];

export const PREMIERE_ATTENDEES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDWiMYtTyrQ6yzcVTU1V2ag_a1558KqUGhXcc3JDI5y_Ro8V42MangmDWMJS7YrRPjEvNGemqzK85Okjt09JB1PlgatkajLq83OvyPC3Wjs7_Jn9OdpinuYfLptj7tuMfiA16rBgCqgl0ITKSlmk0jxOxHVs34a-Y_Lki5jmWCWa8KembZrVuBeEHPomx5GnJbEJxwPDsim5Kbws_hUeolWBo1QodpTW-iDEB4o_WNWGyRymp6vRT_4',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB09PmzPiZJGAGwZjWSHDH68XiLuMxqUpOqPTdP1efmbGfdPreqb35vWq8agtJmDlLY5TShElOtP1c1rXsxv5h50zbeHtqwRVcyWyMg45ehD88sDH1OtHZuw6j_6UJd41sznbVUrbiObm_YwXZq_04s3tfH8K-pJb4KfUtzkGidNc3Vpo6uFWdg3p4kAHNGckGaNGgnMHIV3w3fOgDGXU1yxFJd1bGAqB4mRUwFh_iusqzyjWUsufkv',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCk-jZR1X6jpfWgbLLKXthVjwo3qq64ukQ2IohfYTU4O7ossFbnnTzK6HyTsRVIWOumuTVtlHk7sZFIacO906yNuptCp_MTbXBg_izlKgPdw-cgwPkionUky_wv7W_FCu3jEMeAlX6ChDF-RXp78zW7VqfS7OSXF6W5VHakMgt-hlWnSWJhprEOzCzXDXqY2O7G0jN1-I4CE7JBUpJTTlUdq-vw-8Oqn_CCyRByzR7pmCWrCRXRn7NQ'
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    user: 'Alex Chen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtMAUW2MRBkQx4-p5Qp7NBw3URaovHzmpXL4ref8mgFYEaA7tW7Uu9JmWVhXHg00NGY4f4_0O2H4KMMXAK67aVhr_axHaiQm8OTRptC45n_DSA6lT9k-YvvMKjxujM8gyV3gv2ccNI5PLOsOsp6WzUcGbLxITWeUROxJT2OwJfwjTvAnNTET3nnJKFBkZlUdsZOz8wEYOPogexSXtmOCW4mt38x06ou-OdWGaYPIwka3X8FtJd6reD',
    isSelf: false,
    text: 'Did you see that plot twist coming?! 🤯',
    time: '24:05'
  },
  {
    id: 'm2',
    user: 'You',
    avatar: ADMIN_AVATAR,
    isSelf: true,
    text: 'No way! I thought it was the AI the whole time.',
    time: '24:08'
  },
  {
    id: 'm3',
    user: 'Sam Riley',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzWRJpmO2DhtEFaWf8oRnlKXoZCfdym2pjYi5ExBTEoelces38TDSUKpv2ffDatyMYnNsmnkLqAZx23Td68lQHnA0363oQQMpB7UG-6s_KdrtIFbJXHy0UsZUUgCvYqheZ4u0N0DGl8iz91VQuL-on9nmRivZKIqGTdFY6U7JKM1iwD1xWbMo_wnvz1m0AJyfwXpEeg1oO-KCnibwp2qXFndRDcWlsNXfNW5uSMzxJlSEXfqO8nRMv',
    isSelf: false,
    text: 'Wait, is that the same ship from episode 1?',
    time: '24:12'
  }
];

export const WATCH_PARTY_PARTICIPANTS: WatchPartyParticipant[] = [
  {
    id: 'p1',
    name: 'SarahM',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB72566Qgz41lww9d6rU5eE8fIb7Fe53y121txLvOZqZ6gYKul32dbGVQnAXqYbN1WfdTSWMo29MGSx9xzF4EBjFhhNSUgvw_Bzc7MmT-JEzMlXvVkNjN423JqKQVdtfwjZOpbq0C9qYapBYU2SWqVu4Uksi9c3swtFv6I4w7E3_9Jx_NqnwO1S2LPxvPaC-vdZ0LNQHJSaIVvlw-NohvWt9NeUfItsK6V57x5kZZX4LKPauZqTtbAY',
    status: 'watching',
    micMuted: true
  },
  {
    id: 'p2',
    name: 'David_99',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqVz_2yXw-11eUM5OTf_2RJyTXDVghJWWYL588QryXhp6PPSlpGupYcU2yE5pARfHmRGNhHD-jdda79oxfMuJOCL0KJ6NqkQONS2F2gNB6owd7yzFjQhtQEf5V_1iv42sXGVRrJD69zY0ItE_I5yobcIh-hEA7ICMYAIfDCx7Hs5ZhIvhMPzmjFx8gQ2x9R5CB4gVFlPL9vmZ6_x9qgKs8w98FjUG7vA4UiLRC3KA_4ZSdkjLIwdLu',
    status: 'reacted',
    reaction: '🤯',
    micMuted: false
  },
  {
    id: 'p3',
    name: 'AlexW',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOrWJb1hjLC6b0EsMb6Bcql3eogDyJPoxGc6pFB_HngzsWUl-megO_n17wwOGH-sKOU5SN-dwTDBTAhPk3pwb-8yFeNRNHQcufs7nV86Teu1Hs2f7pNQaX4CRMVnN-vKcVN2Lpsagxv0mskvN5QCdVkhxplNwsP_kGCJkalNDn8E8FCie8jljF3FueQ9N4v4_hV6snzhnYRbRh_tmxEg8_o14GFfmT0h0KCetsMUmen_BKB14mff2Q',
    status: 'paused',
    micMuted: true
  }
];

export const USERS_DATA: UserSubscription[] = [
  {
    id: 'u1',
    name: 'Marcus Thorne',
    email: 'm.thorne@example.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN5uYNqNWZvNi4-j5ZQTqU2mcq84kxnuRsUzJyCmmXTF1kvh4dZ9DrJDRi3byrSzFSXMzZgslMvml_io1JyUQ04is97VOJGLta_iefv7wnd9qml5Sc8tuCop3X_gRF0Ng5_XK_-0GSdiaq-2txnmml8c_XKfouiqEw4XHjNv2n74iwg3_FFmVFc9Q_3Dsb-umKMPafiuMrxDbXctNE92udZ2ust-mKdGtTjlel-RIl6KJyED5kISpg',
    joinDate: 'Oct 12, 2023',
    tier: 'CineVerse AI VIP',
    status: 'Active'
  },
  {
    id: 'u2',
    name: 'Elena Vance',
    email: 'elena.v@studio.net',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-0zpXrNfy5CVmXxpV60Sfx74vD0GZJfzBMNkLy1tmQBABXgZo_9FDO6W-HBsn7sCeIuk-7yL4C_mjlEWswwthe7U5wBt0NKM6fVLo12_QpdnGAg9V78CEw6MqUVHooGNiyruqdeoWd2qbb_U2GEQL89EFPz17gAh5CYsHLL7HFNN9EAhmr3yqt49wXwJSe70Xw9klIIcGRxql2061wyUxfvZqNBb-i9L1vxKHXD6GTdWb2jLJOyNb',
    joinDate: 'Nov 04, 2023',
    tier: 'Pro',
    status: 'Active'
  },
  {
    id: 'u3',
    name: 'James Doe',
    email: 'j.doe99@mail.com',
    initials: 'JD',
    joinDate: 'Jan 15, 2024',
    tier: 'Free',
    status: 'Canceled'
  },
  {
    id: 'u4',
    name: 'Robert Chen',
    email: 'r.chen.director@film.io',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdWSG9RmskgMLcx46ZCXYBZg7AQqgo0kHuV4zFqodlRYvq0ag3722GDq_nKkmB8_xC0BXkXGRUMpaFm3HnNdLxmrJxsz2500V_-M-KAzL90CccL8f39jAh6e6IBVsW5gcwaJlGGYqWqR0p-4n4rKnYTGIK4CIMfSjFTL0AiGSIE8iUx0V645dgNBx2kIQf5bgxmYALVlN13aaLvQZ4qD9MAGiH2O688is7ejzi5ntHg_guJWqtAWhX',
    joinDate: 'Feb 28, 2024',
    tier: 'CineVerse AI VIP',
    status: 'Active'
  },
  {
    id: 'u5',
    name: 'Maya Lin',
    email: 'm.lin@cybertech.org',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8us5b83fyiEYYty5Q-27cy1tf39OPHPrR6dovE78xqiGXE8mJM8Dc43oUeWCL0kQBnS9C4IOmsYdKQ-zuR0XEtj1dgU9XvymDmHR3UpcZN164KyOwWVH0KUTheAyv35OT_G-coRq-AwQ_JjPvC7TQWVnPS15MDzSZ4ruL3nxrOnmHAJTn-QlRx3bDMdJEfAF7tQ3A_4GmwINlJVIIZZWwDR4luNbJze7dDBZpJF---TNtFO-to7Zw',
    joinDate: 'Mar 10, 2024',
    tier: 'Pro',
    status: 'Active'
  }
];

export const SYSTEM_ACTIVITIES: SystemActivity[] = [
  {
    id: 'a1',
    time: 'Just Now',
    title: '4K HDR Master ingested:',
    highlight: 'Blade Runner 2049',
    subtitle: 'CDN propagation complete across 14 edge nodes.',
    type: 'ingest'
  },
  {
    id: 'a2',
    time: '20 Mins Ago',
    title: 'Spike detected in signups',
    subtitle: 'Region: Tokyo, JP',
    badge: '+1,240 Users',
    type: 'spike'
  },
  {
    id: 'a3',
    time: '2 Hours Ago',
    title: 'AI Recommendation Engine Updated',
    subtitle: 'Model v4.2 deployed with enhanced genre clustering.',
    type: 'model'
  }
];

export const CMS_RECENT_ITEMS: CMSItem[] = [
  {
    id: 'cms-1',
    title: 'Neon Drift',
    status: 'Live',
    genre: 'Sci-Fi',
    duration: '2h 14m',
    poster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFx53SJ5MjidzDPdnVtKJAFrVkpgWaVKB7-FXNHQHOJTEQGDJaw486CvEbOhhuhPwnEWvbMnGOsu57NCTzerC9ZgI7YJR18iCkU5KG-6LuS8KR8pgKfKkMkzCEx_FMwjgU5b8ZFCHx3WrbH9DtrpD6H6-J2pEflhv0LtpBt83Mqwas3M3xDCMAxO2YkTHvXvWEZFZZKIsibj8WKsW8KcnJp2bQRNlGaferTfLusecYfofDuCFPhmY7'
  },
  {
    id: 'cms-2',
    title: 'Crystal Age',
    status: 'Processing Metadata...',
    genre: 'Fantasy',
    duration: '1h 58m',
    progress: 68,
    poster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBV7JzGKCHn27US831JvFOI4hAp3XeqLHUXAPvJl9HwW172UJOnc9P8EZ2PyKnsMhlVx6z5Ja0NaqZPX0jziGIn8YZvMEEQYjQmqL5nCDsDtxLFlU2GzJM89yJsQiK17lCee-WMWpZKzgmgzLGelinToiMLtUW7dRYdPbNNputN2pLkzRNtP9Pw0yW72oTDP0mGJqXaN2VmCxavbS894yHECSpIgRL7dwlAn29P4gMvYwK4SiFaTeX_'
  }
];
