# Chart Component

A customizable data visualization component built on top of the Recharts library. It provides a responsive container and styling for various chart types.

## Usage

```tsx
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/data-display/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 500 },
  { name: "Apr", sales: 200 },
  { name: "May", sales: 380 },
  { name: "Jun", sales: 450 },
];

export default function ChartDemo() {
  return (
    <ChartContainer
      config={{
        sales: {
          label: "Sales",
          color: "#4f46e5",
        },
      }}
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip
          content={<ChartTooltipContent />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="sales" fill="var(--color-sales)" />
      </BarChart>
    </ChartContainer>
  );
}
```

## Components

### ChartContainer

The main container component that provides theming and responsive layout for the chart.

### ChartTooltip

A customizable tooltip component for displaying data on hover.

### ChartTooltipContent

The content component for the tooltip with various display options.

### ChartLegend

A customizable legend component for the chart.

### ChartLegendContent

The content component for the legend with various display options.

## Props

### ChartContainer

- `config`: ChartConfig - Configuration object for the chart series
- `children`: ReactNode - The chart components

### ChartTooltipContent

- `hideLabel`: boolean - Hide the tooltip label
- `hideIndicator`: boolean - Hide the color indicator
- `indicator`: "line" | "dot" | "dashed" - The type of indicator to show
- `nameKey`: string - The key to use for the name in the tooltip
- `labelKey`: string - The key to use for the label in the tooltip

### ChartLegendContent

- `hideIcon`: boolean - Hide the legend icons
- `nameKey`: string - The key to use for the name in the legend
- `verticalAlign`: "top" | "bottom" - The vertical alignment of the legend

## Examples

### Line Chart

```tsx
<ChartContainer
  config={{
    visits: {
      label: "Visits",
      color: "#4f46e5",
    },
    views: {
      label: "Page Views",
      color: "#06b6d4",
    },
  }}
>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Line
      type="monotone"
      dataKey="visits"
      stroke="var(--color-visits)"
      activeDot={{ r: 8 }}
    />
    <Line
      type="monotone"
      dataKey="views"
      stroke="var(--color-views)"
    />
  </LineChart>
</ChartContainer>
```

### Area Chart

```tsx
<ChartContainer
  config={{
    sales: {
      label: "Sales",
      color: "#10b981",
    },
  }}
>
  <AreaChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Area
      type="monotone"
      dataKey="sales"
      stroke="var(--color-sales)"
      fill="var(--color-sales)"
      fillOpacity={0.2}
    />
  </AreaChart>
</ChartContainer>
```
