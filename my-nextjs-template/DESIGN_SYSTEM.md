# 🎨 Design System Documentation

## Color Palette

### Primary Colors
- **Indigo**: `#6366f1` (indigo-600) - Main brand color
- **Purple**: `#8b5cf6` (purple-600) - Secondary brand color
- **Gradient**: `from-indigo-600 to-purple-600` - Primary gradient

### Neutral Colors
- **Slate**: Full scale from 50 to 900
  - Light mode: `slate-900` for text, `slate-50` for backgrounds
  - Dark mode: `slate-100` for text, `slate-900` for backgrounds

### Semantic Colors
- **Success**: `emerald-500` - Success states
- **Error**: `red-500` - Error states
- **Warning**: `amber-500` - Warning states
- **Info**: `cyan-500` - Information

## Typography

### Font Families
- **Sans**: System UI stack (default)
- **Display**: For headings and emphasis

### Font Sizes
- **Hero**: `text-5xl` to `text-7xl` (48px-72px)
- **Heading**: `text-3xl` to `text-4xl` (30px-36px)
- **Body**: `text-base` to `text-xl` (16px-20px)
- **Small**: `text-sm` (14px)

### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Extrabold**: 800

## Spacing

### Component Spacing
- **Sections**: `py-24` (96px vertical)
- **Cards**: `p-8` (32px all sides)
- **Buttons**: `px-8 py-4` (32px horizontal, 16px vertical)
- **Gaps**: `gap-4` to `gap-8` (16px-32px)

## Border Radius
- **Small**: `rounded-lg` (8px) - Small elements
- **Medium**: `rounded-xl` (12px) - Cards, inputs
- **Large**: `rounded-2xl` (16px) - Major sections

## Shadows
- **Small**: `shadow-md` - Subtle elevation
- **Medium**: `shadow-lg` - Cards
- **Large**: `shadow-xl` - Modals, dropdowns
- **Extra Large**: `shadow-2xl` - Hero elements

## Components

### Buttons

#### Primary Button
```tsx
className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
```

#### Secondary Button
```tsx
className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-semibold border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 transition-all"
```

### Cards

#### Standard Card
```tsx
className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
```

#### Feature Card
```tsx
className="group relative p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/30 rounded-2xl border border-indigo-200 dark:border-indigo-800 hover:shadow-xl transition-all hover:-translate-y-1"
```

### Inputs

#### Text Input
```tsx
className="w-full px-5 py-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:text-white text-lg"
```

### Navigation

#### Navbar
- Height: `h-16` (64px)
- Background: `bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl`
- Border: `border-b border-slate-200 dark:border-slate-800`
- Fixed position with z-index: `z-50`

#### Nav Links
```tsx
className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all font-medium"
```

## Animations

### Hover Effects
- **Translate**: `hover:-translate-y-0.5` or `hover:-translate-y-1`
- **Scale**: `hover:scale-105`
- **Shadow**: `hover:shadow-xl`

### Transitions
- **All**: `transition-all duration-200`
- **Colors**: `transition-colors`
- **Transform**: `transition-transform`

### Loading States
- **Spinner**: Rotating SVG with `animate-spin`
- **Pulse**: `animate-pulse` for placeholder content

## Layout

### Container
- Max width: `max-w-7xl` (1280px)
- Padding: `px-4 sm:px-6 lg:px-8`
- Centered: `mx-auto`

### Grid
- Mobile: `grid-cols-1`
- Tablet: `md:grid-cols-2`
- Desktop: `lg:grid-cols-3` or `lg:grid-cols-4`
- Gap: `gap-8`

## Dark Mode

### Implementation
- Uses Tailwind's `dark:` variant
- Automatic based on system preference
- Consistent color mapping:
  - Light backgrounds → Dark backgrounds
  - Dark text → Light text
  - Borders adjusted for visibility

### Color Mappings
- `slate-50` ↔ `slate-900`
- `slate-900` ↔ `slate-100`
- `slate-200` ↔ `slate-700`
- Gradients remain consistent

## Accessibility

### Focus States
- All interactive elements have focus rings
- `focus:ring-2 focus:ring-indigo-500`
- Visible keyboard navigation

### Contrast
- WCAG AA compliant
- Light mode: Dark text on light backgrounds
- Dark mode: Light text on dark backgrounds

### Semantic HTML
- Proper heading hierarchy
- Descriptive labels
- ARIA attributes where needed

## Responsive Design

### Breakpoints
- **Mobile**: Default (< 640px)
- **Tablet**: `sm:` (640px+)
- **Desktop**: `md:` (768px+)
- **Large Desktop**: `lg:` (1024px+)
- **Extra Large**: `xl:` (1280px+)

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Hamburger menu on mobile
- Responsive grid layouts

## Best Practices

### Performance
- Use `transform` for animations (GPU-accelerated)
- Minimize layout shifts
- Lazy load images
- Optimize font loading

### Consistency
- Use defined color palette
- Follow spacing scale
- Maintain component patterns
- Consistent hover states

### Maintenance
- All colors defined in globals.css
- Reusable component classes
- Clear naming conventions
- Documented design tokens

---

**Design Philosophy**: Clean, modern, and professional with focus on usability and accessibility.
