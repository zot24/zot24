# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for an engineering leader, built with Next.js 13 (App Router) and configured for static export. The site showcases experience, skills, testimonials, and blog posts.

## Commands

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build static site (outputs to /out directory)
npm run start    # Serve production build
npm run lint     # Run ESLint
```

## Architecture

### Content System
- **Profile data** lives in `/content/profile.json` (experience, skills, social links)
- **Testimonials** are in `/content/testimonials.json`
- **Blog posts** are markdown files with YAML frontmatter in `/content/posts/`
- Blog utilities in `/lib/blog.ts` handle post parsing with gray-matter

### Component Structure
- `/components/sections/` - Page sections (Hero, Experience, Writing, Contact, Skills, Testimonials)
- `/components/ui/` - shadcn/ui components (do not edit directly, use `npx shadcn-ui@latest add`)
- Home page (`/app/page.tsx`) composes sections in order: Hero → Experience → Writing → Contact

### Styling
- Tailwind CSS with CSS custom properties for theming
- Dark/light mode via `next-themes` (class-based)
- Custom fonts: Inter (sans), Outfit (headings)
- Animations via Framer Motion and tailwindcss-animate
- Use the `cn()` utility from `/lib/utils.ts` for conditional classes

### Static Export
The site is configured for static generation (`output: 'export'` in next.config.js). All pages are pre-rendered at build time with no server-side rendering.

## Key Files

- `/content/profile.json` - Central source for profile, experience, and skills data
- `/lib/blog.ts` - `getAllPosts()` and `getPostBySlug()` for blog content
- `/app/providers.tsx` - Theme provider wrapper
- `/tailwind.config.ts` - Theme colors, fonts, and custom properties
