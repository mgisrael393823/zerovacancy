# Call-to-Action (CTA) Components

This directory contains components used for call-to-action elements throughout the application.

## Available Components

### Waitlist CTAs

Components for waitlist signup calls-to-action.

```tsx
import { WaitlistCTA, WaitlistCreatorCTA } from "@/components/ui/cta/waitlist";

// For general users
<WaitlistCTA 
  source="landing_page"
  showSocialProof={true}
/>

// For creators
<WaitlistCreatorCTA 
  source="creator_section"
  buttonText="JOIN AS A CREATOR"
/>
```

## Usage Guidelines

- Use CTA components at key decision points in the user journey
- Ensure CTA buttons stand out visually from surrounding content
- Use clear, action-oriented text that communicates the value proposition
- Consider using social proof elements to increase conversion rates
- Match CTA design with the importance of the action (primary vs secondary)