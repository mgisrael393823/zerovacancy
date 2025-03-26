# Creator Components

This directory contains all components related to the Creator domain in the ZeroVacancy application.

## Directory Structure

- `/card` - Components related to the Creator card display
- `/media` - Components for handling creator media (images, videos)
- `/rating` - Components for displaying creator ratings and availability
- `/types` - Type definitions for creator-related data

## Usage

Import components directly from the feature domain:

```tsx
import { CreatorCard, CreatorMedia, CreatorRating } from '@/components/features/creator';
```

This structure helps organize components by domain while maintaining clean imports.