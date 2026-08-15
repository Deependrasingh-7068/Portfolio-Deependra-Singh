export const projects = [
  {
    id: 'jobelevate',
    title: 'JobElevate',
    category: 'MERN Stack Job Portal',
    featured: true,
    image: '/projects/jobelevate.png',
    description:
      'JobElevate is a full-stack job portal designed to connect job seekers and recruiters through a modern and responsive platform.',
    longDescription:
      'JobElevate handles two distinct user journeys, recruiters posting and managing roles, and job seekers discovering and applying, on a single shared platform. Authentication is role-aware, media (resumes, company logos) is handled through Cloudinary, and the whole experience is built to feel fast on mobile.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Vite', 'Tailwind CSS', 'Cloudinary'],
    features: [
      'Recruiter authentication',
      'Student / job seeker authentication',
      'Job posting workflow',
      'Job search & filtering',
      'Save jobs for later',
      'Profile management',
      'End-to-end job application workflow',
      'Cloudinary media integration'
    ],
    github: 'http://github.com/Deependrasingh-7068/JobElevate',
    live: 'https://your-jobelevate-demo.example.com',
    accent: 'blue'
  },
  {
    id: 'steganography',
    title: 'Secure Steganography',
    category: 'Web Security Project',
    featured: false,
    description:
      'A web-based security application that hides encrypted messages inside images using image steganography.',
    longDescription:
      'Messages are AES-encrypted with CryptoJS before being embedded pixel-by-pixel using least-significant-bit encoding, so the hidden data survives casual inspection while staying password-protected. The extraction flow reverses the process client-side, with no data ever leaving the browser.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'CryptoJS'],
    features: [
      'Image upload',
      'Message encryption',
      'AES encryption',
      'LSB encoding',
      'Password protection',
      'Hidden message extraction',
      'Image download'
    ],
    github: 'https://github.com/yourusername/secure-steganography',
    live: 'https://your-steganography-demo.example.com',
    accent: 'orange'
  },
  {
    id: 'spotify-ui',
    title: 'Spotify UI Clone',
    category: 'Music Streaming Interface',
    featured: false,
    image: '/projects/spotify-ui.png',
    description: 'A responsive music streaming interface inspired by modern music platforms.',
    longDescription:
      'A pixel-conscious rebuild of a modern music streaming layout, focused on getting the sidebar navigation, playlist grid, and now-playing bar feeling native and responsive across breakpoints.',
    technologies: ['React', 'JavaScript', 'CSS', 'Vite'],
    features: ['Responsive layout', 'Sidebar navigation', 'Music cards', 'Playlist UI', 'Player interface'],
    github: 'https://github.com/yourusername/spotify-ui-clone',
    live: 'https://your-spotify-clone-demo.example.com',
    accent: 'blue'
  },
  {
    id: 'pinterest-ui',
    title: 'Pinterest UI Clone',
    category: 'Visual Discovery Interface',
    featured: false,
    image: '/projects/pinterest-ui.png',
    description: 'A responsive visual discovery interface inspired by Pinterest.',
    longDescription:
      'A masonry-driven image grid built to explore CSS column layout and responsive image handling, with hover interactions and a card-based navigation pattern.',
    technologies: ['React', 'JavaScript', 'CSS'],
    features: ['Masonry-style layout', 'Image cards', 'Responsive design', 'Navigation', 'Hover interactions'],
    github: 'https://github.com/yourusername/pinterest-ui-clone',
    live: 'https://your-pinterest-clone-demo.example.com',
    accent: 'orange'
  }
]
