# Data Display Components

This directory contains components that are used to display and visualize data in various formats.

## Components

- **Table**: A responsive, accessible table component for displaying structured data
- **Progress**: A progress bar component for visualizing completion status
- **Slider**: A slider input component for selecting values from a range
- **Calendar**: A date selection and display component
- **Skeleton**: A loading state component for showing placeholders while content loads
- **Chart**: A component for creating data visualizations with Recharts integration

## Usage

Each component can be imported individually from its respective subdirectory, or the main barrel export:

```tsx
// Individual import
import { Table } from "@/components/ui/data-display/table";
import { ChartContainer, ChartTooltip } from "@/components/ui/data-display/chart";

// Or from the main barrel export
import { Table, Progress, Skeleton, ChartContainer } from "@/components/ui/data-display";
```

## Design Principles

- **Accessible**: All components adhere to WCAG guidelines when possible
- **Responsive**: Components adapt to different screen sizes
- **Customizable**: Components accept styling overrides via className prop
- **Composable**: Components can be combined with other UI elements