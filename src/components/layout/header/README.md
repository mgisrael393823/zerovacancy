# Header Component

The Header component provides the main navigation for the application.

## Features

- Responsive design with mobile menu
- Logo and navigation links
- Mobile-optimized touch targets
- Hidden admin access functionality

## Usage

```tsx
import { Header } from '@/components/layout/header';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```
