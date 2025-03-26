# Avatar Components

The avatar components provide a way to display user profile images with fallback options for when images fail to load or aren't available.

## Avatar Component

The main Avatar component is based on Radix UI's Avatar primitive and consists of a container, image, and fallback element.

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/media/avatar";

export default function UserProfile() {
  return (
    <Avatar>
      <AvatarImage src="https://example.com/profile.jpg" alt="User's profile" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  );
}
```

## Avatar Placeholder

The AvatarPlaceholder component provides a simpler alternative that displays initials in a styled container.

```tsx
import { AvatarPlaceholder } from "@/components/ui/media/avatar";

export default function SimpleUserProfile() {
  return <AvatarPlaceholder initials="JD" />;
}
```

## Features

- Rounded profile image display
- Fallback for failed image loads
- Initials-based placeholder option
- Responsive sizing
- Customizable styles
- Accessibility support
