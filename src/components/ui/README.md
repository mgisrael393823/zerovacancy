# UI Components

This directory contains reusable UI primitives and components that are used throughout the application. These components are the building blocks for more complex feature-specific components.

## Organization Structure

The UI components are organized into the following categories:

- `/inputs` - Form controls and inputs
- `/buttons` - All button variants
- `/layout` - Structure and layout components
- `/navigation` - Navigation-related components
- `/overlays` - Modals, dialogs, popovers
- `/feedback` - Alerts, toasts, progress indicators
- `/effects` - Visual effects and backgrounds
- `/media` - Image, avatar, carousel components
- `/interactive` - Components with user interaction
- `/optimized` - Performance-optimized components
- `/special` - Specialized component groups
- `/utils` - Utility components and hooks

## Guidelines for UI Components

1. UI components should be:
   - Reusable across different features
   - Focused on presentation and interaction
   - Free from application-specific business logic
   - Well-documented with props and usage examples
   - Accessible and responsive

2. Naming Conventions:
   - Use clear, descriptive names
   - Be consistent with similar components
   - Prefer specific names over generic ones

3. Import/Export Pattern:
   - Export each component as a named export
   - Where appropriate, create barrel files (index.ts) to simplify imports

4. Props and Types:
   - Define clear prop interfaces
   - Use consistent naming for similar props
   - Document props with JSDoc comments

## Migration Status

This directory is part of the ongoing codebase reorganization. Components are being moved from the legacy structure to this new organization gradually and with careful testing.

For any questions about this structure or where to place new components, please refer to the ARCHITECTURE.md document in the project root.