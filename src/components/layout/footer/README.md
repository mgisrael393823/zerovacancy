# Footer Component

The Footer component provides the main footer for the application.

## Features

- Responsive design with different layouts for mobile and desktop
- Contact information and navigation links
- Social media icons
- Terms and conditions modal
- Scroll-to-top button

## Usage

```tsx
import { Footer } from '@/components/layout/footer';

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
