# Carousel Component

A carousel component that supports both horizontal and vertical orientations. Based on the Embla Carousel library.

## Usage

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/media/carousel";

export default function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        <CarouselItem>
          <div className="p-1">
            <div className="flex aspect-square items-center justify-center p-6">
              <span className="text-3xl font-semibold">1</span>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <div className="flex aspect-square items-center justify-center p-6">
              <span className="text-3xl font-semibold">2</span>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-1">
            <div className="flex aspect-square items-center justify-center p-6">
              <span className="text-3xl font-semibold">3</span>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
```

## Components

### Carousel

The wrapper component that provides context for the carousel.

### CarouselContent

The component that contains the carousel items.

### CarouselItem

A single carousel item.

### CarouselPrevious

A button to navigate to the previous slide.

### CarouselNext

A button to navigate to the next slide.

## Props

### Carousel

- `orientation`: "horizontal" | "vertical" - The orientation of the carousel (default: "horizontal")
- `opts`: CarouselOptions - Options passed to the Embla Carousel
- `plugins`: CarouselPlugin - Plugins passed to the Embla Carousel
- `setApi`: (api: CarouselApi) => void - A callback function to get access to the Embla API

## Examples

### Vertical Carousel

```tsx
<Carousel orientation="vertical">
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Custom Navigation

```tsx
function CarouselWithCustomNavigation() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel setApi={setApi}>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </>
  );
}
```
