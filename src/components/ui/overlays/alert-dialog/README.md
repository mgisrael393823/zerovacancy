# Alert Dialog Components

Alert dialog components for creating confirmations, alerts, and modal dialogs that require user interaction.

## Components

- `AlertDialog` - The root component for creating an alert dialog
- `AlertDialogTrigger` - The element that triggers the alert dialog
- `AlertDialogContent` - The main content container for the alert dialog
- `AlertDialogHeader` - Container for dialog header content
- `AlertDialogFooter` - Container for dialog footer content
- `AlertDialogTitle` - Title component for the alert dialog
- `AlertDialogDescription` - Description component for the alert dialog
- `AlertDialogAction` - Action button component for the alert dialog
- `AlertDialogCancel` - Cancel button component for the alert dialog

## Usage

```tsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
} from '@/components/ui/overlays/alert-dialog';

export function DeleteConfirmation() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Delete Item</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```