# Layout Components

This directory contains components that manage the overall layout and structure of the application, such as headers, footers, and page containers.

## What belongs here:

- Header and footer components
- Page layouts (e.g., main layout, dashboard layout)
- Navigation components
- Layout wrappers and containers
- SEO-related components
- Critical preload components

## What does NOT belong here:

- Feature-specific components (those go in `/components/features/`)
- UI primitives (those go in `/components/ui/`)
- Component-specific layouts (those should be part of their feature)

## Guidelines for adding components:

1. Layout components should be focused on structure and positioning
2. They should be reusable across different pages
3. Avoid embedding feature-specific business logic
4. Consider responsive design and accessibility

## Examples of layout components:

- Header
- Footer
- AdminLayout
- PageContainer
- SidebarLayout
- ErrorBoundary (when used as a layout wrapper)
- SEO component