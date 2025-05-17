// Image path debugging script
// Add this to your public directory and load it via
// <script src="/check-images.js"></script> in development

(function() {
  console.log('🔍 Starting image path checker');
  
  // List of critical images to verify
  const criticalImages = [
    '/logo.png',
    '/emilyprofilephoto.webp',
    '/janesub.jpg',
    '/janesub2.png',
    '/janesub3.webp',
    '/placeholder.svg',
    '/creatorcontent/emily-johnson/work-1.webp',
    '/creatorcontent/jane-cooper/work-1.jpg',
    '/creatorcontent/michael-brown/work-1.jpg'
  ];
  
  // Check if images exist
  const checkImageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        console.log(`✅ Image exists: ${url} (${img.naturalWidth}x${img.naturalHeight})`);
        resolve(true);
      };
      
      img.onerror = () => {
        console.error(`❌ Image missing: ${url}`);
        resolve(false);
      };
      
      img.src = url;
    });
  };
  
  // Find all image elements on the page
  const findAllImages = () => {
    const allImages = document.querySelectorAll('img');
    console.log(`Found ${allImages.length} images on page`);
    
    // Check each image
    allImages.forEach((img, index) => {
      const src = img.getAttribute('src');
      if (!src) {
        console.warn(`Image #${index} has no src attribute`);
        return;
      }
      
      const imgRect = img.getBoundingClientRect();
      const hasSize = imgRect.width > 0 && imgRect.height > 0;
      const isVisible = hasSize && img.style.display !== 'none' && img.style.visibility !== 'hidden';
      const status = isVisible ? '✅' : '❌';
      
      console.log(`${status} Image #${index}: ${src} (${Math.round(imgRect.width)}x${Math.round(imgRect.height)}) ${isVisible ? 'visible' : 'hidden'}`);
    });
  };
  
  // Run checks when page is loaded
  window.addEventListener('load', async () => {
    console.group('🔍 Critical Image Check');
    // Check critical images
    const results = await Promise.all(criticalImages.map(checkImageExists));
    const missing = criticalImages.filter((_, i) => !results[i]);
    
    console.log(`Found ${results.filter(r => r).length}/${criticalImages.length} critical images`);
    if (missing.length > 0) {
      console.error('❌ Missing critical images:', missing);
    }
    console.groupEnd();
    
    // Check all images on the page
    console.group('🔍 Page Image Check');
    findAllImages();
    console.groupEnd();
  });
  
  // Button creation completely disabled
  // No floating UI elements to prevent CLS and keep UI clean
})();