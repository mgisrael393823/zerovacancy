# Scroll Components

This directory contains components related to scrolling functionality and behavior.

## Available Components

### Scroll Progress

The `ScrollProgress` component displays a progress bar at the top of the page that shows how far the user has scrolled.

```tsx
import { ScrollProgress } from "@/components/ui/scroll/progress";

<ScrollProgress />
```

### Scroll To Top

The `ScrollToTop` component provides a button that appears when the user scrolls down the page, allowing them to quickly return to the top.

```tsx
import { ScrollToTop } from "@/components/ui/scroll/to-top";

<ScrollToTop />
```

### Section Anchor

The `SectionAnchor` component creates linkable section anchors that appear on hover.

```tsx
import { SectionAnchor } from "@/components/ui/scroll/anchor";

<div className="relative group">
  <h2 id="my-section">My Section</h2>
  <SectionAnchor id="my-section" />
</div>
```

## Usage Guidelines

- Use scroll components to enhance navigation and provide visual feedback
- Consider accessibility and performance when implementing scroll-based interactions
- Be mindful of mobile experience, as scroll behaviors differ between desktop and mobile