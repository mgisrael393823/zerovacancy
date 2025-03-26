# Accordion Component

A vertically stacked set of interactive headings that reveal or hide associated content. Based on Radix UI's Accordion primitive.

## Usage

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/interaction/accordion";

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the other
          components in this library.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

## Components

### Accordion

The root component that wraps the accordion items.

### AccordionItem

A single accordion item that contains a trigger and content.

### AccordionTrigger

The button that toggles the accordion item.

### AccordionContent

The content revealed when an accordion item is expanded.

## Props

### Accordion

- `type`: "single" | "multiple" - Determines whether one or multiple items can be opened at the same time
- `collapsible`: boolean - If true, allows all items to be closed when using type="single"
- `defaultValue`: string | string[] - The value(s) of the item(s) that should be open by default
- `value`: string | string[] - The controlled value(s) of the item(s) that are open
- `onValueChange`: function - Callback that fires when the value changes

### AccordionItem

- `value`: string (required) - A unique value for the item

## Examples

### Single Accordion

```tsx
<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Item 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Multiple Accordion

```tsx
<Accordion type="multiple" defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Item 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
</Accordion>
```
