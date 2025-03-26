# Feature Components

This directory contains components organized by feature or business domain. Each subdirectory represents a specific area of functionality in the application.

## Feature Areas

- `/creator` - Components related to creator profiles and portfolios
  - `/profile` - Creator profile components
  - `/portfolio` - Portfolio gallery and media components
  - `/card` - Creator card components
  - `/ratings` - Rating-related components

- `/property-owner` - Components specific to property owners
  - `/dashboard` - Property owner dashboard components
  - `/listings` - Property listing components

- `/marketplace` - Search and discovery functionality
  - `/search` - Search components
  - `/filters` - Search filter components
  - `/results` - Results display components
  - `/preview` - Preview components

- `/blog` - Blog functionality
  - `/posts` - Blog post display components
  - `/editor` - Blog authoring components
  - `/categories` - Category components

- `/pricing` - Pricing related components
  - `/plans` - Pricing plan components
  - `/features` - Feature comparison components
  - `/toggle` - Pricing period toggle components

- `/authentication` - Authentication components
  - `/login` - Login components
  - `/registration` - Registration components
  - `/onboarding` - User onboarding components

- `/payments` - Payment and Connect components
  - `/connect` - Stripe Connect integration components
  - `/checkout` - Checkout components
  - `/subscription` - Subscription management components

## Guidelines for Feature Components

1. Each feature area should:
   - Be self-contained with minimal dependencies on other feature areas
   - Use common UI components from `/components/ui` for presentation
   - Focus on business logic specific to that feature
   - Have clear interfaces with other features

2. Component Organization:
   - Group components by sub-feature where appropriate
   - Keep related components together
   - Consider using barrel exports (index.ts files) for cleaner imports

3. Shared Logic:
   - If logic is used across multiple features, consider extracting it to `/hooks` or `/utils`
   - If multiple features need to share a component, consider moving it to `/common`

4. Types:
   - Include feature-specific types in a `types.ts` file within the feature folder
   - Export types that need to be shared across features from `/types` directory

## Migration Status

This directory structure is part of the ongoing codebase reorganization. Components are being moved from the legacy structure to this new organization gradually and with careful testing.