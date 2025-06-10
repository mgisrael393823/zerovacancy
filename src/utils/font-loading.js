/**
 * Font Loading Optimization - Core Performance Improvement
 * 
 * This module focuses on preventing layout shifts from font loading,
 * which is a critical contributor to CLS (Cumulative Layout Shift).
 */

// Font definitions with fallback metrics to prevent layout shift
const fontDefinitions = [
  {
    family: 'Plus Jakarta Sans',
    fallbackFamily: 'Arial',
    fallbackMetrics: {
      sizeAdjust: '105%',
      ascentOverride: '96%',
      descentOverride: '27%',
      lineGapOverride: '0%',
    }
  },
  {
    family: 'Inter',
    fallbackFamily: 'Helvetica',
    fallbackMetrics: {
      sizeAdjust: '100%',
      ascentOverride: '93%',
      descentOverride: '23%',
      lineGapOverride: '0%',
    }
  },
];

/**
 * Generate CSS for font fallbacks with size adjustments to prevent layout shift
 */
function generateFallbackCSS() {
  return fontDefinitions.map(font => `
    @font-face {
      font-family: '${font.family} Fallback';
      src: local('${font.fallbackFamily}');
      size-adjust: ${font.fallbackMetrics.sizeAdjust || '100%'};
      ascent-override: ${font.fallbackMetrics.ascentOverride || '100%'};
      descent-override: ${font.fallbackMetrics.descentOverride || '0%'};
      line-gap-override: ${font.fallbackMetrics.lineGapOverride || '0%'};
    }
  `).join('\n');
}

/**
 * Optimize font loading to prevent layout shifts
 */
export function optimizeFontLoading() {
  if (typeof document === 'undefined') return;
  
  // Add font loading state CSS
  const fontStyles = document.createElement('style');
  fontStyles.textContent = `
    /* Font loading states */
    :root { --fonts-loaded: 0; }
    html.fonts-loaded { --fonts-loaded: 1; }
    
    /* System font fallbacks with metrics to prevent layout shift */
    ${generateFallbackCSS()}
    
    /* Font family definitions */
    .font-heading {
      font-family: 'Plus Jakarta Sans', 'Plus Jakarta Sans Fallback', ${fontDefinitions[0].fallbackFamily}, system-ui, sans-serif;
    }
    
    .font-body {
      font-family: 'Inter', 'Inter Fallback', ${fontDefinitions[1].fallbackFamily}, system-ui, sans-serif;
    }
    
    /* Font loaded state handled via font-display: swap; no opacity tweaks */
  `;
  document.head.appendChild(fontStyles);
  
  // Start loading fonts
  const fontLoadPromise = Promise.all([
    document.fonts.load(`1em "Plus Jakarta Sans"`),
    document.fonts.load(`1em "Inter"`)
  ]);
  
  // Use a timeout to prevent waiting forever
  const timeoutPromise = new Promise(resolve => setTimeout(resolve, 3000));
  
  // Mark fonts as loaded when either they load or timeout occurs
  Promise.race([fontLoadPromise, timeoutPromise])
    .then(() => {
      document.documentElement.classList.add('fonts-loaded');
    })
    .catch(() => {
      // Still add the class if there was an error loading fonts
      document.documentElement.classList.add('fonts-loaded');
    });
}

/**
 * Preload critical fonts
 *
 * NOTE: We now use Google Fonts instead of direct font files:
 * <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap" rel="stylesheet">
 */
export function preloadCriticalFonts() {
  // No longer needed as we use Google Fonts
  return;
}