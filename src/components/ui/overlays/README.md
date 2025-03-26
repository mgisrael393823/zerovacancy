# Overlay UI Components

This directory contains UI components related to overlays, dialogs, and modals.

## Component Categories

- `dialog` - Basic dialog/modal components
- `glow-dialog` - Enhanced dialog with glow effect
- `alert-dialog` - Dialog for confirmations and alerts
- `drawer` - Bottom sheet component that slides up from the bottom
- `sheet` - Slide-out panel from any edge of the screen
- `hover-card` - Card that appears when hovering over an element
- `popover` - Floating component that displays related content
- `dropdown-menu` - Menu that appears when clicking on a trigger
- `context-menu` - Menu that appears when right-clicking on an element

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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from '@/components/ui/overlays/drawer';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
} from '@/components/ui/overlays/sheet';
```

Or import from the main overlays barrel file:

```tsx
import { 
  Dialog, 
  GlowDialog, 
  AlertDialog,
  Drawer,
  Sheet,
  HoverCard,
  Popover,
  DropdownMenu,
  ContextMenu
} from '@/components/ui/overlays';
```