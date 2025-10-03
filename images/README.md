# Images Folder

This folder is for your wedding photos. You can add:

- Engagement photos
- Pre-wedding photos
- Couple portraits
- Venue photos

## Recommended Image Specifications

- **Format**: JPG or PNG
- **Resolution**: At least 800x600 pixels
- **Aspect Ratio**: 4:3 or 3:2 works best for gallery
- **File Size**: Keep under 2MB for faster loading

## How to Add Images

1. Place your images in this folder
2. Update the `photos` array in `js/script.js` with your image paths:

```javascript
const photos = [
  {
    src: 'images/engagement1.jpg',
    alt: 'Our Engagement Photo',
  },
  {
    src: 'images/engagement2.jpg',
    alt: 'Another Beautiful Moment',
  },
  // Add more photos...
];
```

## Image Optimization Tips

- Use tools like TinyPNG or ImageOptim to compress images
- Consider using WebP format for better compression
- Add loading="lazy" attribute for better performance
