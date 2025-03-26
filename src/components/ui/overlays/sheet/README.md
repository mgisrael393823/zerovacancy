# Sheet Component

The sheet component provides a panel that slides in from the edge of the screen. It's commonly used for mobile navigation, filters, or forms that need to appear temporarily without taking the user out of their context.

## Usage

```tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/overlays/sheet";

export default function MyComponent() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-md px-4 py-2 bg-primary text-white">Open Sheet</button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          {/* Sheet content goes here */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

## Features

- Slide in from any edge (top, right, bottom, left)
- Customizable width/height
- Header and footer components
- Backdrop overlay
- Accessible close button
- Animated transitions
- Built on Radix UI Dialog primitive for accessibility
