# Calendar Component

A calendar component that allows users to navigate and select dates.

## Usage

```tsx
import { Calendar } from "@/components/ui/data-display/calendar";
import { useState } from "react";

export default function CalendarExample() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="p-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
}
```

## Features

- Date selection (single, multiple, range)
- Customizable styling
- Display of outside days
- Today highlighting
- Disabled dates handling
- Month navigation
- Responsive design
- Built on react-day-picker for rich functionality
