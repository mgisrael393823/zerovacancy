# Button UI Components

This directory contains various button components used throughout the application.

## Component Categories

- `button.tsx` - Base button component with variants
- `3d` - 3D button components with various effects
- `colorful` - Colorful gradient button components
- `shimmer` - Buttons with shimmer/glow effects
- `rainbow` - Rainbow animated buttons

## Usage

Import components from their specific categories:

```tsx
import { Button, buttonVariants } from '@/components/ui/buttons/button';
import { Button3D, Button3DBorder, Button3DEnhanced } from '@/components/ui/buttons/3d';
import { ButtonColorful } from '@/components/ui/buttons/colorful';
import { ShimmerButton } from '@/components/ui/buttons/shimmer';
import { RainbowButton } from '@/components/ui/buttons/rainbow';
```

Or import from the main buttons barrel file:

```tsx
import { 
  Button, 
  Button3D, 
  ButtonColorful,
  ShimmerButton,
  RainbowButton
} from '@/components/ui/buttons';
```