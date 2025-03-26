# Feedback UI Components

This directory contains UI components related to user feedback and notifications.

## Component Categories

- `alert` - Components for displaying important messages to users
- `toast` - Components for showing temporary notifications
- `toaster` - Container component for rendering toast notifications

## Usage

Import components from their specific categories:

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/feedback/alert';
import { Toast, ToastTitle, ToastDescription } from '@/components/ui/feedback/toast';
import { Toaster } from '@/components/ui/feedback/toaster';
```

Or import from the main feedback barrel file:

```tsx
import { Alert, Toast, Toaster } from '@/components/ui/feedback';
```