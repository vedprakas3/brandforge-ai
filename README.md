# BrandForge AI

**One Upload &rarr; Complete Brand Kit**

[![Cloudinary](https://img.shields.io/badge/Powered%20by-Cloudinary-3448C5?style=flat&logo=cloudinary)](https://cloudinary.com)
[![Gemini AI](https://img.shields.io/badge/Powered%20by-Gemini%20AI-8E75B2?style=flat&logo=google)](https://ai.google.dev)
[![React](https://img.shields.io/badge/Built%20with-React-61DAFB?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)

> A powerful brand kit generator that transforms a single image upload into 15+ perfectly sized assets for every platform. Built with Cloudinary transformations and Gemini AI for the Cloudinary June Mini-Hack.

## Features

### Image Transformations (Powered by Cloudinary)

| Asset | Dimensions | Category |
|-------|-----------|----------|
| LinkedIn Banner | 1584 x 396 | Social Media |
| YouTube Thumbnail | 1280 x 720 | Social Media |
| Instagram Post | 1080 x 1080 | Social Media |
| Instagram Story | 1080 x 1920 | Social Media |
| X (Twitter) Banner | 1500 x 500 | Social Media |
| Facebook Cover | 820 x 312 | Social Media |
| Website Hero | 1920 x 1080 | Web |
| Blog Cover | 1200 x 630 | Web |
| Open Graph | 1200 x 630 | Web |
| Optimized WebP | 1200 x 800 | Optimized |
| Optimized AVIF | 1200 x 800 | Optimized |
| Transparent PNG | 800 x 800 | Optimized |
| Square Thumbnail | 400 x 400 | Optimized |
| Mobile Banner | 320 x 100 | Banner |
| Desktop Banner | 728 x 90 | Banner |

### AI Features (Powered by Gemini)

- **Smart Captions** - AI-generated captions matching your brand voice
- **SEO Optimization** - Auto-generated titles, meta descriptions, alt text
- **Hashtag Generator** - Trending, relevant hashtags for your content
- **Social Posts** - Platform-optimized posts with emojis and CTAs
- **Color Palette** - Dominant color extraction for brand consistency
- **Image Analysis** - Deep visual analysis of objects, style, mood
- **Accessibility** - WCAG-compliant improvement suggestions

### For Every Asset

- Live Preview
- Download Button
- Cloudinary Transformation URL with Copy button
- React SDK Code Example
- HTML Code Example

## Live Demo

**[https://xtbewxkac7bbc.kimi.page](https://xtbewxkac7bbc.kimi.page)**

## GitHub Repository

**[https://github.com/vedprakas3/brandforge-ai](https://github.com/vedprakas3/brandforge-ai)**

## Tech Stack

- **React** + **TypeScript** + **Vite**
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - UI component primitives
- **Framer Motion** - Smooth animations
- **Cloudinary** - Image upload & transformations
- **Gemini AI** - AI-powered content generation
- **Lucide React** - Icons

## Pages

| Page | Description |
|------|-------------|
| **Landing** | Hero section, features, how it works, asset types preview |
| **Dashboard** | Stats overview, quick actions, recent generations |
| **Generator** | Upload zone, Cloudinary upload, brand kit generation |
| **Preview** | Grid of all generated assets with filtering, AI insights panel |
| **Downloads** | Download individual or all assets, batch history |
| **Documentation** | Setup guides, API reference, code examples |
| **Settings** | Cloudinary & Gemini API key configuration |

## Quick Start

### Prerequisites

1. **Cloudinary Account** (Free)
   - Sign up at [cloudinary.com](https://cloudinary.com/users/register/free)
   - Get your Cloud Name from the dashboard
   - Create an unsigned upload preset

2. **Gemini API Key** (Free)
   - Go to [Google AI Studio](https://aistudio.google.com)
   - Sign in with Google
   - Click "Get API Key" and create one

### Installation

```bash
# Clone the repository
git clone https://github.com/vedprakas3/brandforge-ai.git
cd brandforge-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

### Configuration

1. Open the app in your browser (default: http://localhost:5173)
2. Go to **Settings** page
3. Add your **Cloudinary Cloud Name** and **Upload Preset**
4. Add your **Gemini API Key** (optional, for AI features)
5. Click **Save Settings**

### Usage

1. Go to **Generator** page
2. Upload your logo, product image, or brand asset
3. Click **Upload to Cloudinary**
4. Click **Generate Brand Kit**
5. Go to **Preview** to see all assets
6. Download individual assets or all at once

## Project Structure

```
brandforge-ai/
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.tsx    # Floating gradient orbs
│   │   ├── Footer.tsx                # Site footer
│   │   ├── GlassCard.tsx             # Reusable glassmorphism card
│   │   ├── Layout.tsx                # Page layout wrapper
│   │   └── Navigation.tsx            # Top navigation bar
│   ├── lib/
│   │   ├── cloudinary.ts             # Cloudinary URL generation & presets
│   │   ├── gemini.ts                 # Gemini AI integration
│   │   └── utils.ts                  # Utility functions
│   ├── pages/
│   │   ├── LandingPage.tsx           # Home page
│   │   ├── DashboardPage.tsx         # Stats & quick actions
│   │   ├── GeneratorPage.tsx         # Upload & generate
│   │   ├── PreviewPage.tsx           # Asset grid & AI insights
│   │   ├── DownloadsPage.tsx         # Download management
│   │   ├── DocumentationPage.tsx     # Docs & code examples
│   │   └── SettingsPage.tsx          # API key configuration
│   ├── types/
│   │   └── index.ts                  # TypeScript types
│   ├── App.tsx                       # Main app with routing
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Global styles (glassmorphism, dark mode)
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## Cloudinary Skills Used

### 1. Cloudinary Upload API
- Unsigned upload preset for client-side uploads
- Secure image storage with public IDs

### 2. Cloudinary Transformation URL
- Dynamic URL-based transformations
- Format conversion (WebP, AVIF, PNG)
- Quality optimization (`q_auto`)
- Crop modes (`fill`, `thumb`, `fit`)
- 15+ preset transformations for different platforms

### 3. Cloudinary React SDK
- `CldImage` component code generation
- Proper width/height/crop attributes
- Auto format and quality settings

## API Reference

### URL Structure
```
https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}
```

### Common Transformations
| Parameter | Description |
|-----------|-------------|
| `w_1200` | Width 1200px |
| `h_800` | Height 800px |
| `c_fill` | Crop to fill |
| `c_thumb` | Thumbnail crop |
| `f_webp` | WebP format |
| `f_avif` | AVIF format |
| `q_auto` | Auto quality |

### Example
```
https://res.cloudinary.com/demo/image/upload/w_1584,h_396,c_fill,q_auto/sample
```

## Environment Variables

This project uses **localStorage** for configuration (no backend needed):

| Key | Description |
|-----|-------------|
| `cloudinary_cloud_name` | Your Cloudinary cloud name |
| `cloudinary_upload_preset` | Your unsigned upload preset |
| `gemini_api_key` | Your Gemini API key |

## Hackathon Submission

**Event:** Cloudinary June Mini-Hack

**Project:** BrandForge AI

**Description:** Upload one image, get a complete brand kit with 15+ assets for every platform, plus AI-generated captions, SEO content, hashtags, color palettes, and accessibility suggestions.

**Technologies:**
- Cloudinary (Upload API, Transformation URL, React SDK)
- Google Gemini AI (Image Analysis, Content Generation)
- React + TypeScript + Vite
- Tailwind CSS + Framer Motion

## Screenshots

### Landing Page
![Landing](https://via.placeholder.com/800x400/0a0e1a/3b82f6?text=Landing+Page)

### Generator
![Generator](https://via.placeholder.com/800x400/0a0e1a/8b5cf6?text=Generator+Page)

### Preview with AI Insights
![Preview](https://via.placeholder.com/800x400/0a0e1a/06b6d4?text=Preview+Page)

## License

MIT License - feel free to use this project for your own brand kit generation needs.

## Acknowledgments

- [Cloudinary](https://cloudinary.com) for the amazing image transformation APIs
- [Google Gemini AI](https://ai.google.dev) for the powerful AI capabilities
- [shadcn/ui](https://ui.shadcn.com) for the beautiful UI components

---

Built with love for the Cloudinary June Mini-Hack 2024
