# Glow Dialog Component

A visually enhanced dialog component with a gradient background, glow effects, and waitlist signup functionality.

## Usage

```tsx
import { GlowDialog } from "@/components/ui/overlays/glow-dialog";

export default function GlowDialogDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Glow Dialog
      </Button>
      <GlowDialog 
        open={open} 
        onOpenChange={setOpen}
      />
    </>
  );
}
```

## Props

- `open`: boolean - Controls the open state of the dialog
- `onOpenChange`: (open: boolean) => void - Callback when the open state changes
- `triggerStrategy`: 'immediate' | 'exit-intent' | 'scroll-depth' | 'time-delay' | 'combined' - Strategy for when to show the dialog (default: 'combined')
- `forceOpen`: boolean - Forces the dialog to open regardless of trigger strategy (default: false)

## Features

- Gradient background with subtle animations
- Email validation
- Loading state during form submission
- Success confirmation dialog after submission
- Mobile-responsive design
- Configurable trigger strategy for showing the dialog automatically

## Trigger Strategies

- `immediate`: Show the dialog immediately when the component mounts
- `exit-intent`: Show the dialog when the user moves their cursor outside the viewport (exit intent)
- `scroll-depth`: Show the dialog when the user scrolls to a certain percentage of the page
- `time-delay`: Show the dialog after a specific time delay
- `combined`: A combination of exit-intent, scroll-depth, and time-delay strategies

## Examples

### Manual Control

```tsx
const [showDialog, setShowDialog] = React.useState(false);

<Button onClick={() => setShowDialog(true)}>
  Join Waitlist
</Button>

<GlowDialog 
  open={showDialog} 
  onOpenChange={setShowDialog}
/>
```

### Auto-Trigger on Exit Intent

```tsx
<GlowDialog triggerStrategy="exit-intent" />
```

### Auto-Trigger After Scroll

```tsx
<GlowDialog triggerStrategy="scroll-depth" />
```

### Auto-Trigger After Delay

```tsx
<GlowDialog triggerStrategy="time-delay" />
```
