# Interaction Components

This directory contains components that facilitate user interactions with the application interface. These components are designed to provide intuitive ways for users to interact with content.

## Components

### Toggle Components

- **Toggle**: A two-state button that can be either on or off
- **ToggleGroup**: A set of two-state buttons that can be toggled on or off

### Collapsible Components

- **Collapsible**: An interactive component that allows showing and hiding content
- **Accordion**: A vertically stacked set of interactive headings that can reveal or hide associated content

## Usage

Each component is organized in its own directory with:
- The component implementation
- A README with detailed documentation
- An index.ts file for easy importing

## Import Examples

```tsx
// Import individual components
import { Toggle } from "@/components/ui/interaction/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/interaction/toggle-group";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/interaction/collapsible";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/interaction/accordion";

// Or import everything from the interaction directory
import { Toggle, ToggleGroup, ToggleGroupItem, Collapsible, CollapsibleTrigger, CollapsibleContent, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/interaction";
```