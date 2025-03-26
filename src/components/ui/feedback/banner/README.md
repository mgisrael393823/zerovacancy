# Banner Component

A customizable banner component for displaying site-wide messages, notifications, or promotions.

## Usage

```tsx
import { Banner } from "@/components/ui/feedback/banner";
import { Button } from "@/components/ui/button";

export default function BannerDemo() {
  return (
    <Banner 
      variant="purple"
      action={
        <Button size="sm" variant="secondary">
          Learn more
        </Button>
      }
    >
      Welcome to our site! Check out our new features.
    </Banner>
  );
}
```

## Props

- `variant`: "default" | "success" | "warning" | "error" | "purple" - The visual style of the banner
- `size`: "sm" | "default" | "lg" - Controls the text size
- `layout`: "simple" | "complex" - Determines content alignment
- `icon`: ReactNode - Optional icon to display in the banner
- `action`: ReactNode - Optional action button or element
- `isClosable`: boolean - Whether the banner can be closed
- `onClose`: () => void - Function called when the banner is closed

## Examples

### Success Banner

```tsx
<Banner variant="success">
  Your changes have been successfully saved.
</Banner>
```

### Warning Banner

```tsx
<Banner variant="warning">
  Your subscription will expire in 3 days.
</Banner>
```

### Banner with Icon and Action

```tsx
import { Star } from "lucide-react";

<Banner 
  variant="purple"
  icon={<Star className="h-5 w-5 text-yellow-300" />}
  action={
    <Button size="sm" variant="secondary">
      Upgrade now
    </Button>
  }
>
  Unlock premium features by upgrading your account.
</Banner>
```

### Small Banner with Simple Layout

```tsx
<Banner variant="default" size="sm" layout="simple">
  Site maintenance scheduled for tonight at 2AM.
</Banner>
```
