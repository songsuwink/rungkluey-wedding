// Wedding Configuration
// Edit these values to customize your wedding website

const weddingConfig = {
  // Couple Information
  bride: {
    name: 'Bride Name',
    fullName: 'Full Bride Name',
  },
  groom: {
    name: 'Groom Name',
    fullName: 'Full Groom Name',
  },

  // Wedding Date & Time
  wedding: {
    date: '2026-01-31T16:00:00', // ISO format for countdown
    displayDate: 'January 31, 2026',
    location: 'Beautiful Garden Venue, City',
  },

  // Ceremony Details
  ceremony: {
    time: '4:00 PM',
    venue: "St. Mary's Church",
    address: '123 Main Street, City, State 12345',
  },

  // Reception Details
  reception: {
    time: '6:00 PM',
    venue: 'Garden Pavilion',
    address: '456 Garden Avenue, City, State 12345',
  },

  // Dress Code
  dressCode: {
    title: 'Semi-formal / Cocktail Attire',
    note: 'Please avoid wearing white or cream colors',
  },

  // Website Customization - Warm Tone Theme
  theme: {
    primaryColor: '#8B4513', // Dark Brown
    secondaryColor: '#D2B48C', // Light Tan/Beige
    accentColor: '#800020', // Deep Burgundy
    terracotta: '#E2725B', // Terracotta
    darkGreen: '#355E3B', // Dark Green
    warmCream: '#FDF5E6', // Warm Cream
    fontFamily: {
      heading: "'Playfair Display', serif",
      script: "'Dancing Script', cursive",
      body: "'Poppins', sans-serif",
    },
  },

  // Social Media (optional)
  social: {
    hashtag: '#YourWeddingHashtag',
    instagram: '@yourweddinghandle',
  },
};

// Export for use in other files (if using modules)
// export default weddingConfig;
