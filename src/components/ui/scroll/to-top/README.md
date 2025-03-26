# Scroll To Top Component

A button that appears when the user scrolls down the page, allowing them to quickly return to the top with a single click.

## Usage

```tsx
import { ScrollToTop } from "@/components/ui/scroll/to-top";

export default function Layout() {
  return (
    <>
      <main>{/* Page content */}</main>
      <ScrollToTop />
    </>
  );
}
```

## Features

- Appears automatically when scrolled below a threshold (500px)
- Smoothly scrolls back to the top when clicked
- Responsive design for both mobile and desktop
- Visual feedback with hover and click animations
- Accessible with proper ARIA label

## Implementation Details

- Uses React's `useState` and `useEffect` for scroll tracking
- Conditional rendering based on scroll position
- Responsive to mobile/desktop using the `useIsMobile` hook
- Smooth scrolling behavior using the Web API

## Customization

You can customize the appearance by modifying the component's styles:

```tsx
<button
  onClick={scrollToTop}
  className={cn(
    "fixed z-50 flex items-center justify-center",
    "rounded-full shadow-lg transition-all duration-300",
    "bg-blue-500", // Custom background color
    "text-white hover:scale-110 active:scale-95",
    isMobile 
      ? "bottom-20 right-4 h-10 w-10"
      : "bottom-8 right-8 h-12 w-12"
  )}
  aria-label="Scroll to top"
>
  <ArrowUp className={cn(isMobile ? "h-5 w-5" : "h-6 w-6")} />
</button>
```