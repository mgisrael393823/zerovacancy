# Overlay UI Components

This directory contains UI components related to overlays, dialogs, and modals.

## Component Categories

- `dialog` - Basic dialog/modal components
- `glow-dialog` - Enhanced dialog with glow effect
- `alert-dialog` - Dialog for confirmations and alerts

## Usage

Import components from their specific categories:

```tsx
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/overlays/dialog';
import { GlowDialog } from '@/components/ui/overlays/glow-dialog';
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogAction 
} from '@/components/ui/overlays/alert-dialog';
```

Or import from the main overlays barrel file:

```tsx
import { Dialog, GlowDialog, AlertDialog } from '@/components/ui/overlays';
```