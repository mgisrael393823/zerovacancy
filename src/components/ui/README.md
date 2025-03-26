# UI Components

This directory contains all the reusable UI components for the ZeroVacancy application. The components are organized into logical categories based on their functionality and purpose.

## Component Organization

The components are structured using the following pattern:

```
ui/
├── [category]/
│   ├── [component-name]/
│   │   ├── [component-name].tsx    # Main component implementation
│   │   ├── index.ts                # Export file
│   │   └── README.md               # Documentation
│   └── index.ts                    # Category-level exports
└── [legacy-component].tsx          # Backward compatibility re-exports
```

## Categories

### Animations
Animation-related components for creating dynamic visual effects.
```tsx
import { BorderBeam, MovingBorder, Spotlight } from "@/components/ui/animations";
```

### Backgrounds
Background components that provide visual foundation for content.
```tsx
import { BeamsBackground, BackgroundGradient, WarpBackground } from "@/components/ui/backgrounds";
```

### Buttons
Various button styles for different contexts and interactions.
```tsx
import { Button, Button3D, Button3DBorder, Button3DEnhanced } from "@/components/ui/buttons";
```

### CTA (Call-to-Action)
Components designed specifically for call-to-action elements.
```tsx
import { WaitlistCTA, WaitlistCreatorCTA } from "@/components/ui/cta/waitlist";
```

### Data Display
Components for displaying structured data.
```tsx
import { Table, Progress, Calendar, Chart } from "@/components/ui/data-display";
```

### Demos
Example and demonstration components for showcasing UI capabilities.
```tsx
import { Button3DDemo, ButtonStyleGuide } from "@/components/ui/demos";
```

### Effects
Visual and interactive effects that can be applied to other elements.
```tsx
import { ParallaxSection, Magnetic } from "@/components/ui/effects";
```

### Feedback
Components that provide feedback to user actions.
```tsx
import { Toast, Alert, Banner, CookieConsent } from "@/components/ui/feedback";
```

### Forms
Form input components and controls.
```tsx
import { Input, InputOTP, Form, Checkbox, Textarea } from "@/components/ui/forms";
```

### Interaction
Components that provide interactive functionality.
```tsx
import { Toggle, Accordion, Collapsible } from "@/components/ui/interaction";
```

### Media
Components for displaying images, videos, and other media.
```tsx
import { Avatar, Carousel, OptimizedImage } from "@/components/ui/media";
```

### Navigation
Components for navigation and wayfinding.
```tsx
import { NavigationMenu, Tabs, Breadcrumb } from "@/components/ui/navigation";
```

### Overlays
Components that display over other content.
```tsx
import { Dialog, Drawer, Popover, DropdownMenu } from "@/components/ui/overlays";
```

### Scroll
Components related to scrolling behavior.
```tsx
import { ScrollProgress, ScrollToTop, SectionAnchor } from "@/components/ui/scroll";
```

### Utilities
General-purpose utility components.
```tsx
import { Badge, Separator, VisuallyHidden } from "@/components/ui/utilities";
```

### Visualizations
Components for creating visual data representations and decorative elements.
```tsx
import { Waves, PillRating, Squares, SparklesCore } from "@/components/ui/visualizations";
```

## Backward Compatibility

Original component files in the `ui/` directory have been preserved with re-exports to maintain backward compatibility. These files include `@deprecated` annotations to encourage migration to the new import paths.

Example:
```tsx
// Old import (still works but deprecated)
import { Button } from "@/components/ui/button";

// New recommended import
import { Button } from "@/components/ui/buttons";
```

## Documentation

Each component includes its own README with detailed documentation covering:

- Basic usage examples
- Available props and options
- Feature descriptions
- Advanced usage patterns
- Implementation details

## Contributing

When adding new components:

1. Identify the appropriate category or create a new one if needed
2. Create a directory for the component following the pattern above
3. Create the component implementation, index.ts, and README.md
4. Add exports to the category-level index.ts file
5. Update this top-level README.md if adding a new category