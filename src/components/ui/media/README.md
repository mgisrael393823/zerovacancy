# Media Components

This directory contains components for displaying media content such as images, videos, carousels, and avatars.

## Components

### Avatar

Components for displaying user or entity avatars:
- `Avatar`: The root avatar component
- `AvatarImage`: The image component of the avatar
- `AvatarFallback`: The fallback component shown when the image fails to load
- `AvatarPlaceholder`: A placeholder component for avatars

### Image

Optimized image components for various use cases:
- `OptimizedImage`: A performance-optimized image component
- `DesktopOptimizedImage`: An image component optimized for desktop displays

### Carousel

Components for creating interactive slideshows:
- `Carousel`: The root carousel component
- `CarouselContent`: The container for carousel items
- `CarouselItem`: Individual slide items
- `CarouselNext`: Button to navigate to the next slide
- `CarouselPrevious`: Button to navigate to the previous slide

## Usage

Each component is organized in its own subdirectory with:
- The component implementation
- A README with detailed documentation
- An index.ts file for easy importing

## Import Examples

```tsx
// Import avatar components
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/media/avatar";
import { AvatarPlaceholder } from "@/components/ui/media/avatar";

// Import image components
import { OptimizedImage } from "@/components/ui/media/image";
import { DesktopOptimizedImage } from "@/components/ui/media/image";

// Import carousel components
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/media/carousel";
```