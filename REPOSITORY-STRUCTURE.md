# Zero Vacancy Repository Structure

This document outlines the new repository structure for the Zero Vacancy application. This structure follows a feature-first approach while maintaining clear separation of concerns.

## Directory Structure

```
src/
├── assets/            # Static assets (images, icons, etc.)
│   ├── icons/
│   └── images/
├── components/        # Reusable UI components (already refactored)
│   └── ui/            # (already well-organized)
├── config/            # Application configuration
│   ├── constants.ts   # App constants
│   └── settings.ts    # Environment-specific settings
├── features/          # Feature-specific components and logic
│   ├── auth/          # Authentication feature
│   ├── blog/          # Blog feature
│   ├── creators/      # Creator profiles feature
│   ├── marketplace/   # Marketplace feature
│   ├── payments/      # Payment processing feature
│   └── search/        # Search functionality
├── hooks/             # Custom React hooks
├── layouts/           # Page layouts
│   ├── MainLayout.tsx
│   ├── AdminLayout.tsx
│   └── AuthLayout.tsx
├── lib/               # Core utilities and helpers
│   ├── api/           # API client functions
│   ├── formatting/    # Date, number, text formatting
│   ├── validation/    # Form and data validation
│   └── helpers/       # General helper functions
├── pages/             # Page components (route-based)
├── services/          # External service integrations
│   ├── api.ts         # API service
│   ├── auth.ts        # Authentication service
│   ├── storage.ts     # Storage service
│   └── analytics.ts   # Analytics service
├── styles/            # Global styles and theme definitions
├── types/             # TypeScript type definitions
└── utils/             # Specialized utility functions
    ├── performance/   # Performance optimizations
    ├── seo/           # SEO utilities
    └── testing/       # Test utilities
```

## Organization Principles

### Feature-First Approach
Each feature has its own directory with a clear boundary containing all the components, hooks, and utilities specific to that feature.

### Feature Structure
```
features/
├── feature-name/
│   ├── components/     # UI components specific to this feature
│   ├── hooks/          # Custom hooks for this feature
│   ├── utils/          # Utility functions for this feature
│   ├── types.ts        # Type definitions
│   ├── constants.ts    # Feature-specific constants
│   ├── api.ts          # API calls for this feature
│   └── index.ts        # Public API
```

### Shared vs. Feature-Specific
- UI components that are used by multiple features go in `src/components/ui`
- Feature-specific components stay within their feature directory
- Shared utilities go in `src/lib` or `src/utils`

## Import Conventions

Follow these import conventions:
- Use absolute imports with `@/` prefix
- Import shared components from `@/components/ui`
- Import feature components from `@/features/[feature-name]`
- Import utilities from `@/lib` or `@/utils`
- Import types from `@/types`

Example:
```typescript
// Good
import { Button } from '@/components/ui/buttons';
import { CreatorCard } from '@/features/creators';
import { formatDate } from '@/lib/formatting';

// Avoid
import { Button } from '../../../components/ui/buttons';
import { CreatorCard } from '../../features/creators';
```

## Migration Strategy

We are following a parallel structure approach:
1. Create the new directory structure alongside the existing one
2. Copy (don't move) files to new locations
3. Update imports in copied files
4. Update feature references one at a time
5. Test thoroughly
6. Remove old files once verified

## Contribution Guidelines

When adding new code:
1. Identify the appropriate feature or create a new one
2. Place components in the correct directory
3. Use absolute imports with `@/` prefix
4. Export from feature index.ts files
5. Keep feature boundaries clear