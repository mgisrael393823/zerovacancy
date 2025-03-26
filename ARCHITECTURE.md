# ZeroVacancy Architecture

## Overview

This document describes the architectural organization of the ZeroVacancy codebase. It outlines the directory structure, component organization, and coding conventions.

## Directory Structure

```
/src
  /assets            # Static assets like icons, images
    /images
    /icons
  /components        # Reusable UI components
    /common          # Truly shared components
    /layout          # Layout components (Header, Footer, etc.)
    /ui              # Basic UI elements (buttons, inputs, etc.)
      /inputs        # Form controls and inputs
      /buttons       # All button variants
      /layout        # Structure and layout components
      /navigation    # Navigation-related components
      /overlays      # Modals, dialogs, popovers
      /feedback      # Alerts, toasts, progress indicators
      /effects       # Visual effects and backgrounds
      /media         # Image, avatar, carousel components
      /interactive   # Components with user interaction
      /optimized     # Performance-optimized components
      /special       # Specialized component groups
      /utils         # Utility components and hooks
    /features        # Feature-specific components
      /creator       # Creator profiles, portfolios
        /profile
        /portfolio
        /card
        /ratings
      /property-owner # Property owner specific components
      /marketplace    # Search and discovery
        /search
        /filters
        /results
        /preview
      /blog          # Blog functionality
        /posts
        /editor
        /categories
      /pricing       # Pricing related components
        /plans
        /features
        /toggle
      /authentication # Authentication components
      /payments       # Payment and Connect components
  /hooks             # Custom React hooks
  /lib               # Utility libraries and functions
  /pages             # Page components
  /services          # API and external service integrations
  /styles            # Global styles
  /types             # TypeScript type definitions
  /utils             # Utility functions
```

## Component Organization Principles

### UI Components (`/components/ui`)

UI components are the foundational building blocks of the application. They should be:

- **Pure presentation components** with minimal business logic
- **Highly reusable** across different features
- **Well-documented** with clear props interfaces
- **Accessible** and follow best practices

UI components are categorized by their function (buttons, inputs, layout, etc.) to make them easier to find and maintain.

### Layout Components (`/components/layout`)

Layout components define the structure of the application pages. These include:

- Headers and footers
- Page containers
- Navigation elements
- Layout wrappers

Layout components should focus on structure and positioning, not feature-specific functionality.

### Common Components (`/components/common`)

Common components are shared across features but aren't purely presentational. They may include:

- Error boundaries and fallbacks
- Shared business logic components
- Integration components
- Utility components

### Feature Components (`/components/features`)

Feature components are organized by business domain rather than technical function. Each feature area should be:

- **Self-contained** with minimal dependencies on other features
- **Focused on specific business logic**
- **Built using UI components** for presentation

## Import Conventions

- Use the `@/` alias (configured in tsconfig.json) for imports from the src directory
- Prefer absolute imports over relative imports for better clarity
- Example: `import { Button } from '@/components/ui/buttons/button'`

## Component Design Guidelines

1. **Single Responsibility**: Each component should do one thing well
2. **Composition Over Inheritance**: Build complex UIs by composing simpler components
3. **Props Interface**: Define clear props interfaces for all components
4. **Minimal State**: Keep state as close as possible to where it's needed
5. **Responsive Design**: Components should adapt appropriately to different screen sizes
6. **Performance Awareness**: Be mindful of performance implications, especially for frequently rendered components

## Styling Approach

- Use Tailwind CSS for styling
- Use CSS modules for component-specific styles
- Use the `cn()` utility for conditional class names

## Type Definitions

- Define types in feature-specific `types.ts` files
- Share common types in the `/types` directory
- Use TypeScript interfaces for component props
- Export types that are used across features

## Testing Strategy

- Unit test UI components for rendering and basic functionality
- Integration test feature components for business logic
- End-to-end tests for critical user flows
- Visual regression tests for UI components

## Performance Considerations

- Use React.memo for pure components that render frequently
- Lazy load components that aren't needed immediately
- Use performance optimization hooks like useMemo and useCallback appropriately
- Split code by route using React.lazy and Suspense

## Continuous Improvement

This architecture is designed to evolve with the application. As the application grows:

- Regularly review and refactor components
- Extract reusable patterns into common components
- Split large feature areas into more focused sub-features
- Update documentation to reflect architectural changes