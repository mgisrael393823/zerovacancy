# Deprecated Components to Remove

This document lists components that have been marked as deprecated or unused in the codebase.

## Components in `/src/components/deprecated`

These components are explicitly marked as deprecated and can be safely removed:

1. `CallToAction.tsx`
2. `Header.tsx`
3. `Hero.tsx`
4. `HeroSection.tsx`
5. `HowItWorks.tsx`
6. `HowItWorksSection.tsx`

## Components with `@deprecated` Annotations

The following components have been refactored into a better structure and maintain backward compatibility, 
but can be removed once we finish the repository restructuring:

### Creator Components
1. `src/components/creator/CreatorRating.tsx` → `src/components/features/creator/rating/CreatorRating.tsx`
2. `src/components/creator/CreatorMedia.tsx` → `src/components/features/creator/media/CreatorMedia.tsx`
3. `src/components/creator/CreatorCard.tsx`
4. `src/components/creator/CreatorInfo.tsx` → `src/components/features/creator/info/CreatorInfo.tsx`
5. `src/components/creator/PortfolioGallery.tsx` → `src/components/features/creator/portfolio/gallery/PortfolioGallery.tsx`
6. `src/components/creator/types.ts` → `src/components/features/creator/types/index.ts`
7. `src/components/creator/PortfolioPreview.tsx` → `src/components/features/creator/portfolio/PortfolioPreview.tsx`
8. `src/components/creator/CreatorTags.tsx` → `src/components/features/creator/tags/CreatorTags.tsx`
9. `src/components/creator/NotableClients.tsx` → `src/components/features/creator/clients/NotableClients.tsx`

### Layout Components
1. `src/components/layout/Footer.tsx` → `src/components/layout/footer/footer.tsx`
2. `src/components/layout/Header.tsx` → `src/components/layout/header/header.tsx`
3. `src/components/SEO.tsx`
4. `src/components/Footer.tsx`
5. `src/components/Header.tsx`

### UI Components
The UI components have already been refactored into a proper directory structure with proper backward compatibility.
These can be addressed in a later phase of the restructuring after we migrate the main features.

## Removal Process

1. Verify no active imports exist for components in `/src/components/deprecated`
2. Create a git branch for safe removal
3. Remove the deprecated components
4. Run the build and tests to verify nothing breaks
5. Commit the changes with a clear message about what was removed