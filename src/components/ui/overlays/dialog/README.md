# Dialog Component

A modal dialog that interrupts the user with important content and expects a response. Based on Radix UI's Dialog primitive.

## Usage

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/overlays/dialog";
import { Button } from "@/components/ui/button";

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Document</DialogTitle>
          <DialogDescription>
            Share this document with other members of your team.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Dialog content */}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Components

### Dialog

The root component for the dialog.

### DialogTrigger

The button that opens the dialog.

### DialogContent

The content container for the dialog.

### DialogHeader

The header section of the dialog.

### DialogFooter

The footer section of the dialog.

### DialogTitle

The title of the dialog.

### DialogDescription

The description of the dialog.

### DialogClose

The button that closes the dialog.

## Props

### Dialog

- `open`: boolean - Controls the open state of the dialog
- `onOpenChange`: (open: boolean) => void - Callback when the open state changes
- `defaultOpen`: boolean - Whether the dialog should be open by default

## Examples

### Controlled Dialog

```tsx
const [open, setOpen] = React.useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description goes here.
      </DialogDescription>
    </DialogHeader>
    {/* Dialog content */}
    <DialogFooter>
      <Button onClick={() => setOpen(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Dialog with Form

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    <form>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Name</Label>
          <Input id="name" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">Username</Label>
          <Input id="username" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
```
