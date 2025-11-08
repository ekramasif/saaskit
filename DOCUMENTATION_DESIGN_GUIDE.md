# Documentation Design Guide

## Overview

This guide explains how to apply the professional documentation design system to all documentation pages in the saaskit project.

## ✅ Completed Pages

The following pages have been fully upgraded with professional design:

1. **Main Documentation Page** (`/docs/page.tsx`) - ✅ Complete
   - Modern hero section with badges
   - Enhanced feature cards with gradients
   - Tech stack section with icons
   - Professional CTA section

2. **Quick Start Guide** (`/docs/quickstart/page.tsx`) - ✅ Complete
   - Breadcrumbs navigation
   - Steps component with visual timeline
   - CodeBlocks with copy functionality
   - Color-coded Callouts
   - LinkCards for next steps

3. **Installation Guide** (`/docs/installation/page.tsx`) - ✅ Complete
   - Professional service setup sections
   - Step-by-step OAuth configuration
   - Verification checklist with icons
   - All code blocks have copy feature

## 📦 Professional Components Available

All components are located in `/src/components/docs/doc-components.tsx`:

### 1. Callout Component
Color-coded alert boxes for important information:

```tsx
<Callout type="info" title="Important Note">
  Your content here
</Callout>
```

Types: `info` | `warning` | `success` | `danger` | `note`

### 2. CodeBlock Component
Syntax-highlighted code with copy-to-clipboard:

```tsx
<CodeBlock
  code={`your code here`}
  language="typescript"
  title="filename.ts"
  showLineNumbers={true}
/>
```

### 3. InlineCode Component
For inline code snippets:

```tsx
<InlineCode>.env</InlineCode>
```

### 4. Steps/Step Components
Visual step-by-step guides:

```tsx
<Steps>
  <Step step={1} title="First Step">
    <p>Step content</p>
  </Step>
  <Step step={2} title="Second Step">
    <p>Step content</p>
  </Step>
</Steps>
```

### 5. DocBadge Component
Labeled badges:

```tsx
<DocBadge variant="success">v1.0</DocBadge>
<DocBadge variant="info">Updated</DocBadge>
```

Variants: `default` | `success` | `warning` | `danger` | `info` | `purple`

### 6. Breadcrumbs Component
Navigation breadcrumbs:

```tsx
<Breadcrumbs
  items={[
    { label: "Documentation", href: "/docs" },
    { label: "Current Page" },
  ]}
/>
```

### 7. LinkCard Component
Clickable navigation cards:

```tsx
<LinkCard
  title="Card Title"
  description="Card description"
  href="/path"
/>
```

### 8. CardGrid Component
Responsive grid layout:

```tsx
<CardGrid cols={3}>
  {/* Your cards here */}
</CardGrid>
```

Columns: `1` | `2` | `3` | `4`

### 9. ApiMethod Component
REST API method badges:

```tsx
<ApiMethod method="GET" />
<ApiMethod method="POST" />
```

## 🎨 Design Pattern

### Standard Page Structure

```tsx
import {
  Callout,
  CodeBlock,
  DocBadge,
  Steps,
  Step,
  Breadcrumbs,
  LinkCard,
  InlineCode,
  CardGrid,
} from "@/components/docs/doc-components";

export default function PageName() {
  return (
    <div className="docs-content">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Documentation", href: "/docs" },
          { label: "Page Name" },
        ]}
      />

      {/* 2. Page Header */}
      <div className="mb-8">
        <h1>Page Title</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Page description
        </p>
      </div>

      {/* 3. Content with professional components */}
      <h2>Section Title</h2>

      <CodeBlock
        code={`your code`}
        language="typescript"
        title="filename.ts"
      />

      <Callout type="info" title="Note">
        Important information
      </Callout>

      {/* 4. Next Steps */}
      <h2>Next Steps</h2>
      <CardGrid cols={3}>
        <LinkCard
          title="Related Guide"
          description="Description"
          href="/docs/related"
        />
      </CardGrid>
    </div>
  );
}
```

## 📝 Pages Needing Updates

Apply the professional design pattern to these pages:

### Priority 1 (Critical)
- [ ] `/docs/authentication/page.tsx` - Auth documentation
- [ ] `/docs/database/page.tsx` - Database guide
- [ ] `/docs/billing/page.tsx` - Billing/Stripe guide
- [ ] `/docs/api/page.tsx` - API documentation

### Priority 2 (Important)
- [ ] `/docs/deployment/page.tsx` - Deployment guide
- [ ] `/docs/ai/page.tsx` - AI integration guide

### Priority 3 (Nice to Have)
- [ ] `/docs/blog/page.tsx` - Blog system guide
- [ ] `/docs/admin/page.tsx` - Admin dashboard guide

## 🔄 Conversion Checklist

For each page, follow this checklist:

### 1. Update Imports
```tsx
import {
  Callout,
  CodeBlock,
  DocBadge,
  Steps,
  Step,
  Breadcrumbs,
  LinkCard,
  InlineCode,
  CardGrid,
} from "@/components/docs/doc-components";
```

### 2. Replace Container
Replace:
```tsx
<div className="prose prose-slate dark:prose-invert max-w-none">
```

With:
```tsx
<div className="docs-content">
```

### 3. Add Breadcrumbs
Add at the top of content

### 4. Convert Code Blocks
Replace all `<pre><code>` blocks with `<CodeBlock>` component

### 5. Convert Inline Code
Replace `<code>` tags with `<InlineCode>` component

### 6. Add Callouts
Add `<Callout>` components for:
- Important notes (type="info")
- Warnings (type="warning")
- Success messages (type="success")
- Errors/dangers (type="danger")

### 7. Add Steps
For sequential instructions, use `<Steps>` and `<Step>` components

### 8. Add Navigation
Use `<LinkCard>` and `<CardGrid>` for "Next Steps" sections

## 🎯 Benefits

The professional design system provides:

✅ **Copy-to-Clipboard** - All code blocks have copy functionality
✅ **Better Visual Hierarchy** - Clear sections with proper spacing
✅ **Color-Coded Information** - Callouts for different message types
✅ **Mobile Responsive** - Works on all screen sizes
✅ **Dark Mode Support** - Full dark mode compatibility
✅ **Consistent Design** - Unified look across all docs
✅ **Better UX** - Step indicators, breadcrumbs, and clear navigation
✅ **Professional Appearance** - Matches industry-leading documentation sites

## 📚 Examples

Refer to these completed pages as examples:
- `/src/app/docs/page.tsx` - Main page with hero and feature cards
- `/src/app/docs/quickstart/page.tsx` - Steps and callouts
- `/src/app/docs/installation/page.tsx` - Service setup and verification

## 🎨 Global Styles

Enhanced documentation styles are in `/src/app/globals.css`:

- `.docs-content` - Base documentation styling
- `.docs-scrollbar` - Custom scrollbar styling
- `.bg-grid-pattern` - Grid background pattern
- Professional typography for all heading levels
- Enhanced table, list, and link styling

## 🚀 Next Steps

1. Choose a page from the "Pages Needing Updates" list
2. Follow the "Conversion Checklist"
3. Use the "Standard Page Structure" as a template
4. Refer to completed examples for guidance
5. Test the page for responsiveness and dark mode
6. Commit and move to the next page

---

**Note**: All professional components support dark mode automatically and are fully accessible.
