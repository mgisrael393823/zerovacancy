# Drawer Component

A bottom sheet component that slides up from the bottom of the screen. Based on the Vaul drawer primitive.

## Usage

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/overlays/drawer";
import { Button } from "@/components/ui/button";

export default function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          {/* Drawer content */}
        </div>
        <DrawerFooter>
          <Button>Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
```

## Components

### Drawer

The root component for the drawer.

### DrawerTrigger

The button that triggers the drawer to open.

### DrawerContent

The content of the drawer that slides up from the bottom of the screen.

### DrawerHeader

Contains the title and description of the drawer.

### DrawerTitle

The title of the drawer.

### DrawerDescription

The description of the drawer.

### DrawerFooter

The footer of the drawer, typically contains action buttons.

### DrawerClose

The button that closes the drawer.

## Props

### Drawer

- `shouldScaleBackground`: boolean - Whether the background should scale when the drawer is open (default: true)
- `open`: boolean - Whether the drawer is open
- `onOpenChange`: (open: boolean) => void - Callback when the open state changes

## Examples

### Controlled Drawer

```tsx
const [open, setOpen] = React.useState(false);

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    {/* Drawer content */}
  </DrawerContent>
</Drawer>
```

### No Background Scaling

```tsx
<Drawer shouldScaleBackground={false}>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    {/* Drawer content */}
  </DrawerContent>
</Drawer>
```
