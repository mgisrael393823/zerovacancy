# Waitlist CTA Components

Components that provide call-to-action buttons for waitlist signups.

## Components

### WaitlistCTA

A primary call-to-action button for general waitlist signups.

```tsx
import { WaitlistCTA } from "@/components/ui/cta/waitlist";

export default function HeroSection() {
  return (
    <div className="py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Join Our Platform</h1>
      <p className="mb-8">Be the first to get access when we launch.</p>
      <WaitlistCTA 
        source="hero_section"
        showSocialProof={true}
      />
    </div>
  );
}
```

### WaitlistCreatorCTA

A specialized call-to-action button for creator signups.

```tsx
import { WaitlistCreatorCTA } from "@/components/ui/cta/waitlist";

export default function CreatorSection() {
  return (
    <div className="py-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Are You a Creator?</h2>
      <p className="mb-8">Join our platform and start earning.</p>
      <WaitlistCreatorCTA 
        source="creator_section"
        buttonText="JOIN AS A CREATOR"
      />
    </div>
  );
}
```

## Props

### WaitlistCTA Props

- `className`: string - Optional CSS class to apply to the container
- `source`: string - Source identifier for analytics (default: "landing_page")
- `buttonText`: string - Text to display on the button (default: "JOIN WAITLIST")
- `showSocialProof`: boolean - Whether to show social proof below the button (default: false)
- `showEmailInputDirectly`: boolean - Whether to show the email input directly (default: false)
- `style`: Object - Optional custom styles for button, icon, and icon container

### WaitlistCreatorCTA Props

- `className`: string - Optional CSS class to apply to the container
- `source`: string - Source identifier for analytics (default: "creator_waitlist")
- `buttonText`: string - Text to display on the button (default: "JOIN AS CREATOR")
- `showSocialProof`: boolean - Whether to show social proof below the button (default: false)
- `showEmailInputDirectly`: boolean - Whether to show the email input directly (default: false)
- `style`: Object - Optional custom styles for button, icon, and icon container

## Features

- 3D physical button appearance with shadows and hover effects
- Mobile-responsive design with different behavior on small screens
- Social proof option to show signup numbers
- Customizable button text and styling
- Analytics tracking via source parameter