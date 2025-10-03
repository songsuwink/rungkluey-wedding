# Wedding Invitation Website

A beautiful, responsive wedding invitation website built with HTML, CSS, and JavaScript. Features elegant design, smooth animations, countdown timer, photo gallery, and RSVP functionality.

## Features

✨ **Responsive Design** - Works perfectly on all devices (desktop, tablet, mobile)
💕 **Elegant Theme** - Soft colors, floral accents, and modern typography
⏰ **Countdown Timer** - Live countdown to your wedding day
📸 **Photo Gallery** - Showcase your engagement photos with lightbox view
📝 **RSVP Form** - Collect guest responses with local storage
🎨 **Smooth Animations** - Fade-in and slide-up effects
💌 **Modern UI** - Clean, minimal design with Bootstrap framework

## Customization Guide

### 1. Update Wedding Information

Edit `index.html` to customize your wedding details:

```html
<!-- Update couple names -->
<span class="bride-name">Your Bride Name</span>
<span class="groom-name">Your Groom Name</span>

<!-- Update wedding date and location -->
<p class="wedding-date mb-4">Your Wedding Date</p>
<p class="wedding-location mb-5">Your Wedding Venue, City</p>
```

### 2. Set Wedding Date for Countdown

In `js/script.js`, update the wedding date:

```javascript
// Line 11: Change this to your actual wedding date
const weddingDate = new Date('2025-12-25T16:00:00').getTime();
```

### 3. Update Wedding Details

Modify the ceremony and reception details in `index.html`:

```html
<!-- Ceremony Details -->
<p class="detail-time">Your Ceremony Time</p>
<p class="detail-venue">Your Ceremony Venue</p>
<p class="detail-address">Ceremony Address</p>

<!-- Reception Details -->
<p class="detail-time">Your Reception Time</p>
<p class="detail-venue">Your Reception Venue</p>
<p class="detail-address">Reception Address</p>
```

### 4. Add Your Photos

Replace the placeholder images in `js/script.js`:

```javascript
// Line 47: Update with your actual photo URLs
const photos = [
  {
    src: 'path/to/your/photo1.jpg',
    alt: 'Your Photo Description',
  },
  // Add more photos...
];
```

### 5. Customize Colors

Modify the color scheme in `css/style.css`:

```css
:root {
  --primary-color: #d4a574; /* Main accent color */
  --secondary-color: #f7e7ce; /* Light accent */
  --accent-color: #8b5a3c; /* Text and headers */
  --text-dark: #2c2c2c; /* Main text */
  --text-light: #666; /* Secondary text */
  --light-pink: #faf5f0; /* Background */
  --soft-pink: #f4e4e0; /* Alternate background */
}
```

## File Structure

```
rungkluey-wedding/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Custom styles
├── js/
│   └── script.js       # JavaScript functionality
└── README.md           # This file
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with animations
- **JavaScript (ES6+)** - Interactive functionality
- **Bootstrap 5** - Responsive framework
- **Google Fonts** - Typography (Dancing Script, Playfair Display, Poppins)
- **Font Awesome** - Icons

## How to Use

1. **Download/Clone** the project files
2. **Customize** the content (names, dates, photos, etc.)
3. **Open** `index.html` in a web browser
4. **Deploy** to your web hosting service

## Deployment Options

### GitHub Pages (Free)

1. Create a GitHub repository
2. Upload your files
3. Go to Settings → Pages
4. Select source branch (main)
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify (Free)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Your site will be live instantly with a custom URL

### Vercel (Free)

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy with one click

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## RSVP Data

RSVPs are stored in the browser's localStorage. To collect RSVPs properly, you would need to:

1. Set up a backend service (Firebase, Netlify Forms, etc.)
2. Or use a form service like Google Forms, Typeform, or Formspree
3. Replace the current form handling in `js/script.js`

## Customization Tips

- **Fonts**: Change Google Fonts imports in `index.html`
- **Animations**: Adjust timing and effects in `css/style.css`
- **Layout**: Modify Bootstrap classes in `index.html`
- **Additional Sections**: Add new sections following the existing pattern

## Support

This is a static website template. For questions or customizations, refer to:

- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [CSS Animation Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [JavaScript DOM Manipulation](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

---

**Made with 💕 for your special day**
