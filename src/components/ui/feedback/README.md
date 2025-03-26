# Feedback UI Components

This directory contains UI components related to user feedback and notifications.

## Component Categories

- `alert` - Components for displaying important messages to users
- `toast` - Components for showing temporary notifications
- `toaster` - Container component for rendering toast notifications
- `tooltip` - Component for showing information on hover
- `banner` - Component for displaying site-wide announcements
- `cookie-consent` - Component for displaying cookie consent notifications

## Usage

Import components from their specific categories:

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/feedback/alert';
import { Toast, ToastTitle, ToastDescription } from '@/components/ui/feedback/toast';
import { Toaster } from '@/components/ui/feedback/toaster';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/feedback/tooltip';
import { Banner } from '@/components/ui/feedback/banner';
import { CookieConsent } from '@/components/ui/feedback/cookie-consent';
```

Or import from the main feedback barrel file:

```tsx
import { Alert, Toast, Toaster, Tooltip, Banner, CookieConsent } from '@/components/ui/feedback';
```