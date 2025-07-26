# JC Pastelaria Gourmet - Design System Components

This directory contains the base UI components for the JC Pastelaria Gourmet design system.

## Components Implemented

### 1. Button Component (`Button.tsx`)
- **Variants**: primary, secondary, outline, ghost
- **Sizes**: sm, md, lg
- **Features**: Loading state, disabled state, full accessibility
- **Usage**: 
  ```tsx
  <Button variant="primary" size="md" loading={false}>
    Click me
  </Button>
  ```

### 2. Input Component (`Input.tsx`)
- **Features**: Label, error states, helper text, icons, validation
- **Accessibility**: Proper labeling, ARIA attributes
- **Usage**:
  ```tsx
  <Input 
    label="Email" 
    type="email"
    error="Invalid email"
    helper="We'll never share your email"
    required
  />
  ```

### 3. Modal Component (`Modal.tsx`)
- **Sizes**: sm, md, lg, xl
- **Features**: Backdrop click to close, escape key handling, body scroll lock
- **Accessibility**: Focus management, ARIA attributes
- **Usage**:
  ```tsx
  <Modal 
    isOpen={isOpen} 
    onClose={() => setIsOpen(false)}
    title="Modal Title"
    size="md"
  >
    Modal content here
  </Modal>
  ```

### 4. Card Component (`Card.tsx`)
- **Variants**: default, elevated, outlined, ghost
- **Padding**: none, sm, md, lg
- **Features**: Hover effects, compound components
- **Sub-components**: CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Usage**:
  ```tsx
  <Card variant="elevated" hover>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card description</CardDescription>
    </CardHeader>
    <CardContent>
      Card content
    </CardContent>
    <CardFooter>
      <Button>Action</Button>
    </CardFooter>
  </Card>
  ```

### 5. Badge Component (`Badge.tsx`)
- **Variants**: default, primary, secondary, success, warning, error, info
- **Sizes**: sm, md, lg
- **Special Components**: StatusBadge, LevelBadge for specific use cases
- **Usage**:
  ```tsx
  <Badge variant="success" size="md">Active</Badge>
  <StatusBadge status="delivered" />
  <LevelBadge level="gold" />
  ```

### 6. Loading Component (`Loading.tsx`)
- **Variants**: spinner, dots, pulse
- **Sizes**: sm, md, lg, xl
- **Colors**: primary, secondary, white, gray
- **Special Components**: PageLoading, InlineLoading, LoadingOverlay
- **Usage**:
  ```tsx
  <Loading size="md" variant="spinner" text="Loading..." />
  <LoadingOverlay isLoading={true} text="Saving...">
    <div>Content to overlay</div>
  </LoadingOverlay>
  ```

## Design Tokens

All components use the design tokens defined in `tailwind.config.js`:

- **Colors**: Primary (yellow), Secondary, Accent (orange-dark), Success, Danger
- **Typography**: Inter for body text, Poppins for headings
- **Spacing**: Consistent spacing scale
- **Animations**: Smooth transitions and hover effects

## Accessibility Features

All components include:
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast support

## Dependencies

- `clsx`: For conditional class names
- `tailwind-merge`: For Tailwind class deduplication
- `@tailwindcss/forms`: For form styling
- `framer-motion`: For animations (future enhancement)

## Usage

Import components from the index file:

```tsx
import { Button, Input, Modal, Card, Badge, Loading } from '@/components/ui';
```

## Examples

See `examples.tsx` for comprehensive usage examples of all components.

## Testing

Components are designed to be easily testable with:
- Proper data-testid attributes
- Predictable class names
- Accessible selectors

## Future Enhancements

- Animation integration with Framer Motion
- Dark mode support
- Additional component variants
- Storybook integration
- Unit tests with Jest and React Testing Library