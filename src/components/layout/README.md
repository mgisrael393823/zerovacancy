# Layout Components

This directory contains layout components that define the overall structure of the application.

## Components

- **Header**: Main navigation header
- **Footer**: Main site footer

## Usage

```tsx
import { Header } from '@/components/layout/header';
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
