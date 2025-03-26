# Cookie Consent Component

A responsive cookie consent banner that allows users to manage their cookie preferences.

## Usage

```tsx
import { CookieConsent } from "@/components/ui/feedback/cookie-consent";

export default function Layout() {
  return (
    <>
      {/* Your app content */}
      <CookieConsent />
    </>
  );
}
```

## Features

- Auto-shows to users who have not yet given consent
- Provides options for accepting all cookies or essential cookies only
- Stores consent decision in localStorage
- Fully responsive design for mobile and desktop
- Animated entrance
- Accessible close button

## Implementation Details

The component automatically handles:

1. Checking if the user has already provided consent by looking for a 'cookieConsent' entry in localStorage
2. Showing the banner after a small delay if no consent has been given
3. Storing the user's preferences when they make a selection
4. Disappearing after the user has made a choice

## Consent Options

- **Accept All**: Sets 'cookieConsent' in localStorage to 'all'
- **Essential Only**: Sets 'cookieConsent' in localStorage to 'essential'
- **Close Button**: Simply hides the banner without saving any preferences

## Example

```tsx
import { CookieConsent } from "@/components/ui/feedback/cookie-consent";

export default function App() {
  return (
    <div className="min-h-screen">
      <header>
        {/* Header content */}
      </header>
      
      <main>
        {/* Main content */}
      </main>
      
      <footer>
        {/* Footer content */}
      </footer>
      
      <CookieConsent />
    </div>
  );
}
```
