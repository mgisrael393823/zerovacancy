# Alert Components

Alert components for displaying important messages to users.

## Components

- `Alert` - The main alert container component
- `AlertTitle` - Title component for the alert
- `AlertDescription` - Description component for the alert content

## Usage

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/feedback/alert';

export function MyComponent() {
  return (
    <Alert>
      <AlertTitle>Important Notice</AlertTitle>
      <AlertDescription>This is an important message for the user.</AlertDescription>
    </Alert>
  );
}
```