# Section Anchor Component

A component that creates section anchors for easy linking to specific parts of a page.

## Usage

```tsx
import { SectionAnchor } from "@/components/ui/scroll/anchor";

export default function DocumentSection() {
  return (
    <div className="relative group">
      <h2 id="my-section">My Section</h2>
      <SectionAnchor id="my-section" />
      <p>Section content...</p>
    </div>
  );
}
```

## Features

- Creates a link anchor for section headings
- Visible on hover for clean UI when not in use
- Supports direct linking to sections via URL hash
- Mobile responsive positioning
- Accessible with proper ARIA labels

## Props

- `id` (string, required): The ID of the section to link to
- `className` (string, optional): Additional CSS classes to apply to the anchor

## Implementation Details

- Uses the HTML ID attribute for linking
- Positioned absolutely relative to the parent container
- Different positioning for mobile and desktop 
- The parent container should have `position: relative` and `group` class for hover effects to work correctly

## Example

```tsx
// For a documentation page with multiple sections
<div className="prose max-w-3xl mx-auto">
  {sections.map(section => (
    <div key={section.id} className="relative group">
      <h2 id={section.id}>{section.title}</h2>
      <SectionAnchor id={section.id} />
      <div dangerouslySetInnerHTML={{ __html: section.content }} />
    </div>
  ))}
</div>
```