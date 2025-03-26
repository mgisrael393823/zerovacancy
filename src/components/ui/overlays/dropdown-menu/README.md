# Dropdown Menu Component

The dropdown menu component provides a menu that appears when clicking on a trigger element. It's commonly used for navigation, actions, or settings in UI applications.

## Usage

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/overlays/dropdown-menu";

export default function MyComponent() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md px-3 py-2 bg-primary text-white">Menu</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Features

- Click-triggered dropdown menu
- Accessible keyboard navigation
- Submenus support
- Checkbox and radio items
- Separators and labels
- Keyboard shortcuts display
- Customizable positioning
- Animated transitions
- Radix UI primitives for accessibility
