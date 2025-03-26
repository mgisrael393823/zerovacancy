# Tabs Component

The Tabs component allows users to navigate between different sections of content within the same space.

## Usage

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs";

export default function TabsExample() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4 rounded-md bg-background">
          <h2 className="text-lg font-medium">Account Settings</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Configure your account preferences and settings.
          </p>
          {/* Account settings form would go here */}
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4 rounded-md bg-background">
          <h2 className="text-lg font-medium">Password</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Change your password here.
          </p>
          {/* Password form would go here */}
        </div>
      </TabsContent>
    </Tabs>
  );
}
```

## Features

- Simple interface for organizing content
- Keyboard navigation support
- Customizable styling
- Accessible WAI-ARIA compliant implementation
- Built on Radix UI primitives
