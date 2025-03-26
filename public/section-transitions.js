// Enhance section transitions for desktop
(function() {
  // Only run on desktop
  if (window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return;
  }
  
  // Apply custom styling to section transitions when they appear
  function enhanceTransitions() {
    // Find all section transitions
    const transitions = document.querySelectorAll('.section-transition, .w-full.overflow-visible.relative.z-30');
    
    if (transitions.length === 0) {
      // If no transitions found yet, try again after DOM is more complete
      requestAnimationFrame(() => {
        setTimeout(enhanceTransitions, 100);
      });
      return;
    }
    
    // Apply progressive height reduction
    transitions.forEach((transition, index) => {
      // Set custom heights based on position (earlier transitions are slightly taller)
      const heights = [30, 25, 20, 18, 15];
      const height = heights[Math.min(index, heights.length - 1)];
      
      // Apply styling directly
      transition.style.height = height + 'px';
      transition.style.maxHeight = height + 'px';
      transition.style.minHeight = height + 'px';
      transition.style.margin = '-10px 0';
      transition.style.overflow = 'hidden';
      transition.style.position = 'relative';
      transition.style.zIndex = '10';
      
      // Check for color values in gradient backgrounds
      const gradientDiv = transition.querySelector('div[style*="linear-gradient"]');
      if (gradientDiv) {
        // Extract colors from background style
        const style = gradientDiv.getAttribute('style') || '';
        let fromColor = '#ffffff';
        let toColor = '#ffffff';
        
        // Try to extract colors from gradient
        const bgMatch = style.match(/linear-gradient\(to bottom,\s*([^,]+),.*,\s*([^)]+)\)/);
        if (bgMatch && bgMatch.length >= 3) {
          fromColor = bgMatch[1].trim();
          toColor = bgMatch[2].trim();
          
          // Set these colors as CSS variables
          transition.style.setProperty('--from-color', fromColor);
          transition.style.setProperty('--to-color', toColor);
          
          // Create blend colors for smoother gradient
          transition.style.setProperty('--blend-85', blendColors(fromColor, toColor, 0.85));
          transition.style.setProperty('--blend-65', blendColors(fromColor, toColor, 0.65));
          transition.style.setProperty('--blend-50', blendColors(fromColor, toColor, 0.5));
          transition.style.setProperty('--blend-35', blendColors(fromColor, toColor, 0.35));
          transition.style.setProperty('--blend-15', blendColors(fromColor, toColor, 0.15));
          
          // Apply enhanced gradient
          if (gradientDiv) {
            gradientDiv.style.background = `linear-gradient(to bottom, 
              var(--from-color) 0%, 
              var(--blend-85) 15%,
              var(--blend-65) 30%,
              var(--blend-50) 50%,
              var(--blend-35) 70%,
              var(--blend-15) 85%,
              var(--to-color) 100%)`;
            
            // Extend gradient for smoother blending
            gradientDiv.style.height = 'calc(100% + 40px)';
            gradientDiv.style.top = '-20px';
            gradientDiv.style.bottom = '-20px';
          }
        }
      }
    });
    
    console.log('Enhanced section transitions for desktop');
  }
  
  // Helper function to blend colors
  function blendColors(color1, color2, ratio) {
    // Apply cubic easing to the ratio for smoother blending
    const easedRatio = ratio * (ratio * (3 - 2 * ratio)); // Cubic ease: 3t² - 2t³
    
    // For hex colors
    if (color1.startsWith('#') && color2.startsWith('#')) {
      try {
        // Parse hex colors
        const r1 = parseInt(color1.slice(1, 3), 16);
        const g1 = parseInt(color1.slice(3, 5), 16);
        const b1 = parseInt(color1.slice(5, 7), 16);
        
        const r2 = parseInt(color2.slice(1, 3), 16);
        const g2 = parseInt(color2.slice(3, 5), 16);
        const b2 = parseInt(color2.slice(5, 7), 16);
        
        // Blend colors with eased ratio
        const r = Math.round(r1 * easedRatio + r2 * (1 - easedRatio));
        const g = Math.round(g1 * easedRatio + g2 * (1 - easedRatio));
        const b = Math.round(b1 * easedRatio + b2 * (1 - easedRatio));
        
        // Convert back to hex
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      } catch (e) {
        // Fallback
        return easedRatio > 0.5 ? color1 : color2;
      }
    }
    
    // For other formats, use CSS color-mix
    return `color-mix(in srgb, ${color1} ${easedRatio * 100}%, ${color2} ${(1 - easedRatio) * 100}%)`;
  }
  
  // Run enhancement when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceTransitions);
  } else {
    enhanceTransitions();
  }
  
  // Also run when window is fully loaded
  window.addEventListener('load', enhanceTransitions);
})();