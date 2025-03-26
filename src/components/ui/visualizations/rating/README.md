# Pill Rating Component

A compact, pill-shaped component for displaying ratings with an optional review count.

## Usage

```tsx
import { PillRating } from "@/components/ui/visualizations/rating";

export default function ProductCard() {
  return (
    <div className="p-4 border rounded">
      <h3>Product Name</h3>
      <div className="mt-2">
        <PillRating rating={4.7} reviews={128} />
      </div>
    </div>
  );
}
```

## Props

- `rating`: number - The numerical rating to display (e.g., 4.5)
- `reviews`: number - Optional number of reviews (default: 0)
- `showReviews`: boolean - Whether to show the review count (default: true)
- `className`: string - Optional CSS class to apply to the container
- `size`: 'sm' | 'md' | 'lg' - Size of the pill rating (default: 'md')

## Features

- Responsive pill-shaped rating display
- Star icon with numerical rating
- Optional review count display
- Three size variants (sm, md, lg)
- Mobile-optimized text sizes
- Warm amber/yellow color scheme for ratings

## Implementation Details

- Uses Lucide `Star` icon
- Tailwind CSS for styling
- Responsive sizing with the `useIsMobile` hook
- Pre-configured size variants for consistent UI
- Fixed decimal precision (one decimal place)

## Examples

### Small Rating Pill

```tsx
<PillRating rating={4.2} reviews={42} size="sm" />
```

### Medium Rating Pill (Default)

```tsx
<PillRating rating={3.9} reviews={87} />
```

### Large Rating Pill

```tsx
<PillRating rating={5.0} reviews={210} size="lg" />
```

### Rating Only (No Reviews)

```tsx
<PillRating rating={4.5} showReviews={false} />
```

### Custom Styling

```tsx
<PillRating 
  rating={4.8} 
  reviews={156} 
  className="bg-blue-50/80 border-blue-100/50"
/>
```