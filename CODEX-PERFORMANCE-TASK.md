# Codex Performance Optimization Task

This document outlines the top priorities uncovered during the latest frontend performance investigation. Follow these tasks to significantly reduce bundle size, eliminate flash of unstyled content (FOUC), and improve overall load metrics.

## Key Issues
- **Huge CategorySelector component (~435KB)**
- **Total initial JavaScript payload ~850KB**
- **FOUC still visible despite mitigation attempts**
- Multiple components can be lazy loaded

## Target Metrics
- **Initial JS payload**: **<200KB**
- **CSS payload**: **<50KB**
- **Time to Interactive**: **<3.5s** on typical mobile hardware
- **Largest Contentful Paint (LCP)**: **<2.5s**
- **Cumulative Layout Shift (CLS)**: **<0.1**

## Files to Investigate First
1. `src/components/ui/CategorySelector.tsx` – extremely large bundle
2. `src/components/FOUCPrevention.tsx` – FOUC handling logic
3. `src/utils/font-loading.js` – custom font loading utilities
4. `src/components/hero/` – hero section performance
5. `vite.config.ts` – build and code-splitting configuration
6. `index.html` – resource loading order and critical CSS

## Prioritized Fixes
1. **Break up `CategorySelector`**
   - Identify heavy dependencies (TipTap, emoji picker, data tables)
   - Replace or dynamically import where possible
2. **Implement route‑level code splitting** for the main bundle
3. **Improve FOUC prevention**
   - Inline critical CSS
   - Ensure fonts use `font-display: swap` and preload critical fonts
4. **Lazy load below‑the‑fold components and images**
5. **Add resource hints** (`preconnect`, `modulepreload`) for critical assets
6. **Set up performance budgets** in CI/CD to enforce bundle limits

## Success Criteria
- CategorySelector bundle reduced below **100KB**
- Initial JS bundle under **200KB** after compression
- No visible FOUC on first paint
- Mobile Lighthouse score above **90** for performance
- Web Vitals (LCP, CLS, INP) consistently in the green

Use the `performance-findings.md` and `performance-baseline-report.md` documents for reference while implementing these improvements.
