# Common Components

This directory contains truly shared components that are used across multiple features. These components are not specific to any particular feature and provide general functionality.

## What belongs here:

- Components that are used by multiple features
- Utility components that don't fit into the UI category
- Components that integrate between multiple features
- Shared business logic components

## What does NOT belong here:

- UI primitives (those go in `/components/ui/`)
- Feature-specific components (those go in `/components/features/`)
- Layout components (those go in `/components/layout/`)

## Guidelines for adding components:

1. Make sure the component is truly common and used across features
2. Avoid business logic specific to a single feature
3. Ensure the component has a clear, single responsibility
4. Document props and usage patterns

## Examples of common components:

- Error boundaries and fallbacks
- Reusable data display patterns
- Shared form components
- Authentication state wrappers