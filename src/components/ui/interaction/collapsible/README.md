# Collapsible Component

An interactive component that allows users to toggle the visibility of content. Based on Radix UI's Collapsible primitive.

## Usage

```tsx
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/interaction/collapsible";

export default function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Title</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="px-4">
        <div className="rounded-md border p-4">
          <p className="text-sm">
            Content that can be collapsed and expanded.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
```

## Components

### Collapsible

The root component that wraps the collapsible content.

### CollapsibleTrigger

The trigger that toggles the collapsible content.

### CollapsibleContent

The content that will be shown or hidden based on the open state.

## Props

### Collapsible

- `open`: boolean - Controls the open state of the collapsible
- `onOpenChange`: function - Callback that fires when the open state changes
- `defaultOpen`: boolean - Sets the default open state when initially rendered

## Examples

### Basic Collapsible

```tsx
<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>
    Content that can be collapsed.
  </CollapsibleContent>
</Collapsible>
```

### Controlled Collapsible

```tsx
const [open, setOpen] = React.useState(false);

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>
    Content that can be collapsed.
  </CollapsibleContent>
</Collapsible>
```
