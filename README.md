# Next.js App with Dark Mode, TanStack Query & BProgress

A modern Next.js application built with the App Router, featuring dark/light mode theming, TanStack Query for data fetching, and BProgress for loading indicators.

## Features

- **Dark/Light Mode**: Toggle between themes with next-themes
- **TanStack Query**: Powerful data fetching and caching with React Query
- **BProgress**: Beautiful loading bar for page transitions
- **Tailwind CSS**: Utility-first CSS framework for styling
- **JavaScript**: Pure JavaScript implementation (no TypeScript)
- **ESLint**: Code quality and consistency

## Getting Started

### Installation

1. Install dependencies:
   \`\`\`bash
   npm install

# or

yarn install

# or

pnpm install
\`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev

# or

yarn dev

# or

pnpm dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/
│ ├── layout.jsx # Root layout with providers
│ ├── page.jsx # Home page
│ ├── example/
│ │ └── page.jsx # TanStack Query example
│ ├── globals.css # Global styles
│ └── Bprogress.css # BProgress custom styles
├── components/
│ ├── theme-provider.jsx # Theme context provider
│ ├── theme-toggle.jsx # Theme switcher component
│ ├── query-provider.jsx # TanStack Query provider
│ ├── Bprogress-provider.jsx # BProgress setup
│ ├── link-with-progress.jsx # Link with loading bar
│ └── ui/ # shadcn/ui components
├── hooks/
│ ├── use-mobile.js # Mobile detection hook
│ └── use-toast.js # Toast notifications hook
└── lib/
└── utils.js # Utility functions
\`\`\`

## Key Dependencies

- **next**: ^15.x
- **react**: ^19.x
- **@tanstack/react-query**: Latest
- **next-themes**: Latest
- **Bprogress**: Latest
- **shadcn/ui**: Component library
- **tailwindcss**: ^4.x

## Usage Examples

### Using TanStack Query

\`\`\`jsx
"use client"
import { useQuery } from "@tanstack/react-query"

export default function MyComponent() {
const { data, isLoading, error } = useQuery({
queryKey: ["myData"],
queryFn: async () => {
const res = await fetch("/api/data")
return res.json()
},
})

if (isLoading) return <div>Loading...</div>
if (error) return <div>Error: {error.message}</div>

return <div>{JSON.stringify(data)}</div>
}
\`\`\`

### Using Theme Toggle

The theme toggle is already included in the header. To use it elsewhere:

\`\`\`jsx
import { ThemeToggle } from "@/components/theme-toggle"

export default function MyPage() {
return (
<div>
<ThemeToggle />
</div>
)
}
\`\`\`

### Using Links with Progress Bar

\`\`\`jsx
import { LinkWithProgress } from "@/components/link-with-progress"

export default function MyComponent() {
return (
<LinkWithProgress href="/about">
<button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
Go to About
</button>
</LinkWithProgress>
)
}
\`\`\`

## Customization

### Theme Colors

Edit `app/globals.css` to customize theme colors:

\`\`\`css
:root {
--background: oklch(1 0 0);
--foreground: oklch(0.145 0 0);
/_ ... more colors _/
}

.dark {
--background: oklch(0.145 0 0);
--foreground: oklch(0.985 0 0);
/_ ... more colors _/
}
\`\`\`

### BProgress Styling

Customize the loading bar in `app/Bprogress.css`:

\`\`\`css
#Bprogress .bar {
background: hsl(var(--primary));
height: 3px;
}
\`\`\`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)

## License

MIT
