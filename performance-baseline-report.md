# Performance Baseline Report - ZeroVacancy
Date: June 10, 2025

## Current Performance Issues

### 1. Flash of Unstyled Content (FOUC)
- **Status**: Partially addressed with PR #8 improvements
- **Symptoms**: 
  - Text and layout elements briefly flash unstyled on page load
  - Images appear/disappear during initial render
  - Font swap causes visible text reflow
- **Affected Areas**:
  - Hero section on homepage
  - Navigation components
  - Creator cards
  - Blog post content

### 2. Core Web Vitals Concerns
Based on the codebase analysis:

#### Largest Contentful Paint (LCP)
- Hero images not properly optimized for initial load
- Critical CSS not fully extracted
- Font loading blocking render

#### Cumulative Layout Shift (CLS)
- Fixed positioning elements causing shifts
- Dynamic content loading without proper dimensions
- Image loading without aspect ratios defined

#### First Input Delay (FID) / Interaction to Next Paint (INP)
- Large JavaScript bundles blocking main thread
- Heavy components not code-split properly

### 3. Bundle Size Analysis
From recent build output:
- Main bundle: ~531KB (gzipped: 130KB) - LARGE
- Multiple vendor chunks over 100KB
- CategorySelector component: 512KB alone!

### 4. Image Optimization Status
- Some images have WebP/AVIF variants
- Mobile-specific images partially implemented
- Hero images still loading full resolution on mobile

### 5. Font Loading Issues
- Inter and Plus Jakarta Sans loading without proper fallbacks
- Opacity hacks were removed but FOUT still visible
- No font-display: swap implementation

## Recommended Investigation Areas for Codex

1. **Immediate FOUC Sources**
   - Check CSS loading order in production build
   - Analyze font loading timeline
   - Review React hydration timing
   - Inspect critical rendering path

2. **Performance Bottlenecks**
   - Profile JavaScript execution time
   - Identify render-blocking resources
   - Check for memory leaks in components
   - Analyze network waterfall

3. **Component-Specific Issues**
   - CategorySelector bundle size (512KB!)
   - Hero section rendering performance
   - Creator card lazy loading implementation
   - Blog editor performance

4. **Mobile Performance**
   - Viewport stability issues
   - Touch responsiveness delays
   - Image loading on slow networks
   - JavaScript execution on low-end devices

## Testing Recommendations

1. Use Chrome DevTools Performance tab with 4x CPU throttling
2. Test on real mobile devices (not just responsive mode)
3. Monitor Web Vitals in production with real user data
4. Check performance across different network conditions

## Files to Focus On

1. `/src/components/FOUCPrevention.tsx` - Current FOUC prevention
2. `/src/utils/font-loading.js` - Font optimization logic
3. `/src/components/hero/` - Hero section components
4. `/src/components/ui/CategorySelector-*.js` - Large bundle issue
5. `/vite.config.ts` - Build optimization settings
6. `/index.html` - Critical CSS and resource loading

## Next Steps

1. Run Lighthouse audits on production build
2. Set up Web Vitals monitoring
3. Profile component render times
4. Implement performance budget tracking