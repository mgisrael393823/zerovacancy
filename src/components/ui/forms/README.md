# Form UI Components

This directory contains components related to forms and input controls.

## Component Categories

- `form` - Form container and validation components
- `input` - Text input and OTP input components
- `label` - Form label components
- `checkbox` - Checkbox components
- `radio` - Radio button components
- `select` - Select/dropdown components
- `textarea` - Multiline text input components

## Usage

Import components from their specific categories:

```tsx
import { Form, FormField, FormItem } from '@/components/ui/forms/form';
import { Input } from '@/components/ui/forms/input';
import { Label } from '@/components/ui/forms/label';
import { Checkbox } from '@/components/ui/forms/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/forms/radio';
import { Select, SelectTrigger } from '@/components/ui/forms/select';
import { Textarea } from '@/components/ui/forms/textarea';
```

Or import from the main forms barrel file:

```tsx
import { 
  Form, 
  Input, 
  Checkbox, 
  Select, 
  Textarea,
  RadioGroup
} from '@/components/ui/forms';
```