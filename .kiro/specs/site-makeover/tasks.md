# Implementation Plan: Site Makeover

## Overview

Incrementally transform the c.clakery site from a multi-page portfolio layout to a modern single-page-style design that is pixel-perfect to the HTML reference at #[[file:refrerence/c-clakery-website.html]]. When implementing any component, always consult the reference file for exact CSS values, animations, colors, fonts, spacing, and layout. Each task builds on the previous, starting with the CSS/content foundation, then new components, then wiring everything together. Property-based tests validate content parsing; unit tests validate component rendering.

## Tasks

- [x] 1. Update CSS variables, fonts, and global styles
  - [x] 1.1 Update `src/assets/base.css` with new color palette and font imports
    - Replace existing font imports with Google Fonts link for DM Serif Display (ital 0;1) and Outfit (weights 300;400;500;600): `https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600&display=swap`
    - Replace all `:root` CSS variables with the exact reference palette: `--cream: #FBF7F0`, `--beige: #F0E6D6`, `--beige-dark: #E4D5C0`, `--warm-brown: #C4A882`, `--terracotta-light: #D4A574`, `--terracotta: #C08B5C`, `--soft-brown: #8B7355`, `--dark-brown: #5C4A32`, `--off-white: #FFFCF7`, `--blush: #F2DDD0`, `--sage: #C5CEBA`
    - Add `--font-body: 'Outfit', sans-serif` and `--font-heading: 'DM Serif Display', serif`
    - Add `--radius-card: 20px` and `--radius-button: 50px`
    - Update `body` font-family to `var(--font-body)`, color to `var(--dark-brown)`, background to `var(--cream)`
    - Add all CSS animation keyframes to base.css: `fadeDown`, `fadeUp`, `fadeUpCard`, `floatBlob`, `bounce` (see design doc CSS Animations section for exact values)
    - _Requirements: 9.1, 9.3, 9.4_

  - [x] 1.2 Update `src/assets/main.css` with global layout adjustments
    - Remove the `.green` utility class
    - Add `html { scroll-behavior: smooth; }` for smooth scrolling support
    - Add `* { margin: 0; padding: 0; box-sizing: border-box; }` reset
    - Add `body { overflow-x: hidden; }` to prevent horizontal scroll from blob overflow
    - _Requirements: 9.5, 8.4_

- [x] 2. Update TinaCMS schemas and content layer
  - [x] 2.1 Update `tina/config.ts` with new schema fields
    - Home collection: add `description` (textarea) and `ctaLabel` fields; remove `logoSrc`, `backgroundImageSrc`, `orderButtonHref`
    - Product collection: add `imageSrc` (type: 'image'), `emoji`, `badge`, `bgGradient` fields; remove `orderUrl`
    - About collection: replace `images` list and `description` body with `makerEmoji`, `bio` (textarea), `quote` fields
    - Footer collection: add `email` and `instagramHandle` fields
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 2.2 Update `src/content/index.ts` interfaces and parsing functions
    - Update `HomeContent` interface: add `description`, `ctaLabel`; remove `logoSrc`, `backgroundImageSrc`, `orderButtonHref`
    - Update `Product` interface: add `emoji`, `badge`, `bgGradient`; replace `orderUrl` with `imageSrc` (retain field, now TinaCMS image)
    - Replace `AboutContent` interface with `makerEmoji`, `bio` (string, two paragraphs separated by `\n\n`), `quote` fields
    - Update `FooterSettings` interface: add `email`, `instagramHandle`
    - Update `getHomeContent()` to parse `description` and `ctaLabel`
    - Update `getProducts()` to parse `imageSrc`, `emoji`, `badge`, `bgGradient` (default empty strings; bgGradient defaults to `linear-gradient(145deg, #F0E6D6, #E4D5C0)`)
    - Update `getAboutContent()` to parse `makerEmoji`, `bio`, `quote` from frontmatter
    - Update `getFooterSettings()` to parse `email` and `instagramHandle`
    - Export `parseFrontmatter` for use in tests
    - _Requirements: 4.6, 4.7, 4.8, 4.9, 7.6_

  - [ ]* 2.3 Write property test: Home content frontmatter round-trip
    - **Property 1: Home content frontmatter round-trip**
    - Generate random strings for title, shortDesc, description, ctaLabel; construct frontmatter; parse with `parseFrontmatter`; verify fields match
    - **Validates: Requirements 1.12, 7.6**

  - [ ]* 2.4 Write property test: Product content frontmatter round-trip
    - **Property 2: Product content frontmatter round-trip**
    - Generate random strings for name, description, price, imageSrc, emoji, bgGradient, optional badge; construct frontmatter; parse; verify fields match; verify omitted badge/imageSrc default to empty string; verify omitted bgGradient defaults to default gradient
    - **Validates: Requirements 3.11, 4.6, 4.7, 4.8, 4.9**

  - [ ]* 2.5 Write property test: About content frontmatter round-trip
    - **Property 5: About content frontmatter round-trip**
    - Generate random strings for makerEmoji, bio, quote; construct frontmatter; parse; verify fields match
    - **Validates: Requirements 5.8, 7.6**

  - [ ]* 2.6 Write property test: Footer JSON round-trip
    - **Property 6: Footer JSON round-trip**
    - Generate random strings for artistName, instagramUrl, email, instagramHandle; construct JSON; parse; verify fields match
    - **Validates: Requirements 6.9**

- [x] 3. Migrate content files
  - [x] 3.1 Update `content/home/index.md` with new frontmatter
    - Set title to "c.clakery", shortDesc to "Where Clay Meets Bakery"
    - Add description: "Tiny clay treats baked with love — croissants, brownies & all the sweetness, minus the calories. Handcrafted with care, each piece is a little celebration."
    - Add ctaLabel: "Explore Collection"
    - Remove logoSrc, backgroundImageSrc, orderButtonHref
    - _Requirements: 11.2_

  - [x] 3.2 Replace product content files with 6 new products
    - Remove existing product files (candle-holder, ceramic-bowl, clay-mug, clay-vase, espresso-cup, planter)
    - Create 6 new product markdown files with name, description, price (RM), emoji, badge, empty imageSrc, and bgGradient fields:
      - Clay Croissant Charm: 🥐, RM 18, Bestseller, `linear-gradient(145deg, #F5E6D0, #EDCFB0)`
      - Brownie Stack Magnet: 🍫, RM 15, New, `linear-gradient(145deg, #E8D5C0, #D4B896)`
      - Strawberry Cake Ring: 🍰, RM 22, (no badge), `linear-gradient(145deg, #F2DDD0, #E8C7B5)`
      - Glazed Donut Earrings: 🍩, RM 25, (no badge), `linear-gradient(145deg, #F0E6D6, #E4D5C0)`
      - Chocolate Chip Keychain: 🍪, RM 12, Popular, `linear-gradient(145deg, #ECE0D0, #DDD0B8)`
      - Baguette Hair Clip: 🥖, RM 16, (no badge), `linear-gradient(145deg, #F5EAD8, #E8D8C0)`
    - _Requirements: 11.1, 3.8_

  - [x] 3.3 Update `content/about/index.md` with new frontmatter
    - Set makerEmoji to "👩‍🎨"
    - Set bio with two paragraphs (separated by blank line): first paragraph about being the baker-sculptor, second about the weekend hobby becoming an obsession
    - Set quote: "Every tiny treat is a love letter to the art of making things by hand."
    - _Requirements: 11.3_

  - [x] 3.4 Update `content/footer/index.json` with new fields
    - Add email: "hello@cclakery.com" and instagramHandle: "@c.clakery"
    - _Requirements: 11.4_

- [x] 4. Checkpoint — Verify content layer and schemas
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Create HeroSection component
  - [x] 5.1 Create `src/components/HeroSection.vue`
    - Accept props: brandName, tagline, description, ctaLabel
    - Render full-viewport section with `id="hero"` and three-stop gradient background: `linear-gradient(160deg, var(--off-white) 0%, var(--beige) 50%, var(--blush) 100%)`
    - Render `.hero-bg-shapes` container with three animated blob divs:
      - `.blob-1`: 500px circle, `var(--blush)`, top: -100px, right: -100px, opacity 0.25, `floatBlob 12s ease-in-out infinite`
      - `.blob-2`: 350px circle, `var(--beige-dark)`, bottom: -50px, left: -80px, opacity 0.25, `floatBlob 10s ease-in-out infinite reverse`
      - `.blob-3`: 200px circle, `var(--sage)`, top: 30%, left: 10%, opacity 0.25, `floatBlob 14s ease-in-out infinite 2s`
    - Render `.hero-content` with `fadeUp` animation (1s ease-out, 0.3s delay, `animation-fill-mode: both`)
    - Brand name: `c.<span class="accent">clakery</span>` — "c." in `var(--dark-brown)`, ".accent" in `var(--terracotta)` italic. DM Serif Display, 86px, font-weight 400, letter-spacing -1px
    - Tagline: DM Serif Display, 20px, italic, `var(--terracotta-light)`, margin-bottom 28px
    - Description: Outfit, 15px, `var(--soft-brown)`, font-weight 300, max-width 440px, line-height 1.7, margin 0 auto 40px
    - CTA button: `inline-flex`, gap 10px, padding 14px 36px, `var(--dark-brown)` bg, `var(--cream)` text, 50px border-radius, 13px uppercase, letter-spacing 1.5px, font-weight 500, box-shadow `0 4px 20px rgba(92, 74, 50, 0.15)`
    - CTA includes inline arrow SVG: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`
    - CTA hover: bg → `var(--terracotta)`, translateY(-2px), box-shadow `0 8px 30px rgba(192, 139, 92, 0.25)`, SVG translateX(3px)
    - Scroll indicator: absolute bottom 40px, centered, "Scroll" text (11px, letter-spacing 2px, uppercase, `var(--warm-brown)`) + down-arrow SVG, `bounce` animation 2s infinite
    - CTA button emits `cta-click` event
    - Responsive: text sizes adjust for mobile
    - _Requirements: 1.1–1.12_

  - [ ]* 5.2 Write unit tests for HeroSection
    - Verify brand name renders with split color spans (`.accent` class on "clakery")
    - Verify tagline, description, CTA label render correctly
    - Verify CTA button contains arrow SVG element
    - Verify three blob elements exist (`.blob-1`, `.blob-2`, `.blob-3`)
    - Verify scroll indicator element is present with "Scroll" text
    - Verify CTA button emits `cta-click` event on click
    - _Requirements: 1.2, 1.3, 1.4, 1.5, 1.7, 1.10, 1.11_

- [x] 6. Refactor ProductCatalog to grid layout with per-product gradients, staggered animations, and badges
  - [x] 6.1 Rewrite `src/components/ProductCatalog.vue` as a static grid
    - Remove all carousel/slider logic (scroll buttons, touch swipe, drag, dots)
    - Update props to accept products with imageSrc, emoji, name, description, price, optional badge, bgGradient
    - Section background: `var(--off-white)`, padding 100px 60px 120px
    - Add `::before` pseudo-element on section: absolute top 0, centered, 60px wide, 3px tall, `linear-gradient(90deg, transparent, var(--terracotta-light), transparent)`, border-radius 2px
    - Section header: centered, margin-bottom 60px
      - `.section-label`: "Shop the sweetness" — 11px, letter-spacing 3px, uppercase, `var(--terracotta)`, font-weight 500
      - `.section-title`: "Our Collection" — DM Serif Display, 44px, `var(--dark-brown)`, font-weight 400
      - `.section-subtitle`: 15px, `var(--soft-brown)`, font-weight 300, max-width 400px, centered, line-height 1.6
    - CSS Grid: `repeat(3, 1fr)`, gap 30px, max-width 1100px, centered. 2 columns tablet, 1 column mobile
    - Product card: `var(--cream)` bg, 20px border-radius, `border: 1px solid rgba(196, 168, 130, 0.12)`, overflow hidden, cursor pointer
    - Card hover: translateY(-6px), `box-shadow: 0 16px 40px rgba(92, 74, 50, 0.1)`, `border-color: rgba(192, 139, 92, 0.2)`
    - Staggered entrance: cards start `opacity: 0`, `fadeUpCard 0.6s ease-out forwards`. nth-child delays: 0.1s through 0.6s
    - Product image area: `aspect-ratio: 1`, overflow hidden, position relative
    - `.product-img-inner`: apply `bgGradient` as inline style background, centered emoji at 56px, `transition: transform 0.5s ease`
    - Image hover scale: `.product-card:hover .product-img-inner { transform: scale(1.05); }`
    - When `imageSrc` is non-empty, render `<img>` instead of emoji
    - Badge pill: absolute top 14px left 14px, `rgba(255, 252, 247, 0.85)` bg, `backdrop-filter: blur(8px)`, 50px border-radius, 10px font-size, 1.5px letter-spacing, uppercase, `var(--terracotta)`, font-weight 500. Only render when badge is non-empty
    - Product info: padding 20px 22px 24px
      - Name: DM Serif Display, 18px, `var(--dark-brown)`, margin-bottom 4px
      - Description: 13px, `var(--warm-brown)`, font-weight 300, margin-bottom 14px
      - Price: 16px, font-weight 500, `var(--terracotta)`
    - Section `id="catalog"`
    - _Requirements: 3.1–3.11_

  - [ ]* 6.2 Write property test: Product card renders all data fields
    - **Property 3: Product card renders all product data fields**
    - Generate random products with bgGradient; mount ProductCatalog; verify name, description, price in rendered HTML; verify img element when imageSrc non-empty; verify emoji text when imageSrc empty; verify bgGradient applied as inline style
    - **Validates: Requirements 3.4, 3.5, 3.6**

  - [ ]* 6.3 Write property test: Product card badge conditional rendering
    - **Property 4: Product card badge conditional rendering**
    - Generate random products with/without badge; mount ProductCatalog; verify badge element presence matches non-empty badge
    - **Validates: Requirements 3.7**

  - [ ]* 6.4 Write unit tests for ProductCatalog
    - Verify section header text renders ("Shop the sweetness", "Our Collection")
    - Verify correct number of product cards rendered
    - Verify grid layout classes
    - Verify staggered animation delay styles on cards
    - Verify product-img-inner has bgGradient as inline style
    - Verify image area scales on card hover (transition class present)
    - _Requirements: 3.1, 3.3, 3.8, 3.10_

- [x] 7. Create AboutSection component
  - [x] 7.1 Create `src/components/AboutSection.vue`
    - Accept props: makerEmoji, bio (string with `\n\n` paragraph separator), quote
    - Render section with `id="about"`, background `var(--beige)`, padding 120px 60px, position relative, overflow hidden
    - Render two decorative background circles:
      - `.about-deco`: 300px × 300px circle, `rgba(192, 139, 92, 0.08)`, absolute top: -100px, right: -60px
      - `.about-deco-2`: 180px × 180px circle, `rgba(197, 206, 186, 0.15)`, absolute bottom: -40px, left: -40px
    - Inner grid: `grid-template-columns: 1fr 1fr`, gap 80px, max-width 1100px, centered, align-items center, z-index 2
    - Left column — `.about-image-wrap`:
      - `.about-image`: aspect-ratio 4/5, `linear-gradient(145deg, var(--blush), var(--beige-dark))`, border-radius 24px, centered emoji at 80px
      - Inner border via `::before`: inset 8px, `border: 1px solid rgba(255,255,255,0.4)`, border-radius 18px, pointer-events none
    - Right column — `.about-text`:
      - Section label: "Nice to meet you" — 11px, letter-spacing 3px, uppercase, `var(--terracotta)`, font-weight 500, text-align left
      - Heading: "The Maker Behind" + `<br>` + `<em>c.clakery</em>` — DM Serif Display, 40px, `var(--dark-brown)`, line-height 1.2, `<em>` in `var(--terracotta)` italic
      - Split bio into paragraphs on `\n\n` and render each as `<p class="about-body">`: 15px, line-height 1.8, `var(--soft-brown)`, font-weight 300, margin-bottom 20px
      - `.about-divider`: 50px wide, 2px tall, `var(--terracotta-light)`, border-radius 2px, margin-bottom 20px
      - `.about-quote`: DM Serif Display italic, 17px, `var(--terracotta)`, padding-left 20px, border-left `2px solid var(--terracotta-light)`
    - Responsive: grid stacks to single column on mobile
    - _Requirements: 5.1–5.8_

  - [ ]* 7.2 Write unit tests for AboutSection
    - Verify emoji renders inside gradient container with inner border pseudo-element class
    - Verify heading text with italic "c.clakery"
    - Verify two bio paragraphs render when bio contains `\n\n`
    - Verify divider element exists (`.about-divider`)
    - Verify quote renders with left border styling
    - Verify two decorative circle elements exist (`.about-deco`, `.about-deco-2`)
    - _Requirements: 5.1–5.7_

- [x] 8. Redesign FooterComponent
  - [x] 8.1 Rewrite `src/components/FooterComponent.vue` as four-section layout
    - Update props to accept artistName, instagramUrl, email, instagramHandle
    - Footer: `var(--dark-brown)` bg, `var(--beige)` text, padding 60px 60px 30px
    - `.footer-inner`: max-width 1100px, centered
    - `.footer-top`: flex, space-between, align-items flex-start, margin-bottom 50px
    - Left — `.footer-brand`:
      - `.footer-logo`: DM Serif Display, 28px, `var(--cream)`, `<span>` in `var(--terracotta-light)` for "clakery", margin-bottom 10px
      - `.footer-tagline`: 13px, `var(--warm-brown)`, italic, DM Serif Display
    - Center-right — `.footer-links-group`: flex with gap 80px
      - Navigate column: h4 "NAVIGATE" (11px, letter-spacing 2.5px, uppercase, `var(--warm-brown)`, font-weight 500, margin-bottom 18px), ul with Home/Catalog/About links (14px, `var(--beige-dark)`, font-weight 300, hover → `var(--terracotta-light)`, margin-bottom 12px per li)
      - Connect column: h4 "CONNECT", ul with email and Instagram handle links (same styling)
    - Far right — Follow Along section:
      - h4 "FOLLOW ALONG" (same heading styling)
      - `.footer-social`: flex with gap 12px
      - `.social-icon`: 40px × 40px circle, `rgba(255, 252, 247, 0.08)` bg, `1px solid rgba(255, 252, 247, 0.12)` border, centered Instagram SVG (18px × 18px, fill `var(--beige)`)
      - `.social-icon:hover`: bg → `var(--terracotta)`, border-color → `var(--terracotta)`, translateY(-2px)
      - `.social-icon.ig-highlight`: `rgba(192, 139, 92, 0.2)` bg, `var(--terracotta-light)` border
      - Inline Instagram SVG icon (full path from reference)
    - `.footer-bottom`: `border-top: 1px solid rgba(196, 168, 130, 0.15)`, padding-top 24px, flex space-between
      - Left: "© 2026 c.clakery. All rights reserved." — 12px, `var(--warm-brown)`, font-weight 300
      - Right: "Crafted with 🤎 and a little bit of clay" — 12px, `var(--warm-brown)`, font-weight 300, flex with gap 6px
    - Responsive: columns stack vertically on mobile
    - _Requirements: 6.1–6.9, 10.5_

  - [ ]* 8.2 Write unit tests for FooterComponent
    - Verify brand name with split color (logo span for "clakery")
    - Verify tagline renders
    - Verify Navigate column with Home, Catalog, About links
    - Verify Connect column with email and Instagram handle
    - Verify Follow Along section with social icon
    - Verify copyright text and "Crafted with 🤎" text in bottom bar
    - Verify four-section layout structure
    - _Requirements: 6.1–6.8_

- [x] 9. Checkpoint — Verify all new/modified components
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Update NavigationBar for section-based scrolling
  - [x] 10.1 Modify `src/components/NavigationBar.vue`
    - Change nav links to: Home, Catalog, About, Contact
    - Remove Blog link
    - Change positioning from `sticky` to `fixed` with `z-index: 100`
    - Logo: `c.<span>clakery</span>` — DM Serif Display, 22px, "c." in `var(--dark-brown)`, `<span>` in `var(--terracotta)`, letter-spacing 0.5px
    - Background: `rgba(251, 247, 240, 0.85)` with `backdrop-filter: blur(20px)` and `-webkit-backdrop-filter: blur(20px)`
    - Border bottom: `1px solid rgba(196, 168, 130, 0.15)`
    - Nav links: 14px, uppercase, letter-spacing 1.5px, `var(--soft-brown)`, font-weight 400, gap 36px
    - Link hover: color → `var(--terracotta)`, `::after` pseudo-element underline animates from width 0 to 100% (1.5px height, `var(--terracotta)`, bottom -4px, border-radius 2px, transition width 0.3s ease)
    - Entrance animation: `fadeDown 0.8s ease-out`
    - Home/Catalog/About links use smooth scroll to `#hero`/`#catalog`/`#about` when on home page, or navigate to `/#hero` etc. when on other pages
    - Contact link navigates to `/contact` route
    - Padding: 20px 60px
    - _Requirements: 2.1–2.9_

  - [ ]* 10.2 Write unit tests for NavigationBar
    - Verify exactly Home, Catalog, About, Contact links are rendered
    - Verify Blog link is absent
    - Verify split-color logo (span for "clakery")
    - Verify hamburger button toggles mobile menu
    - _Requirements: 2.1, 2.6, 2.7, 2.5_

- [x] 11. Rewrite HomeView to compose all sections
  - [x] 11.1 Rewrite `src/views/HomeView.vue`
    - Remove TopHeader and blog preview section
    - Import and render HeroSection, ProductCatalog, AboutSection sequentially
    - Fetch home content, products, and about content on mount
    - Pass data to child components as props
    - CTA click handler scrolls to `#catalog`
    - _Requirements: 8.1, 8.3_

  - [ ]* 11.2 Write unit tests for HomeView
    - Verify HeroSection, ProductCatalog, and AboutSection components are rendered
    - _Requirements: 8.1_

- [x] 12. Update App.vue and router
  - [x] 12.1 Update `src/App.vue` to pass new footer props
    - Fetch and pass email and instagramHandle to FooterComponent
    - Add top padding to `<main>` to account for fixed NavigationBar
    - _Requirements: 6.3, 6.4_

  - [x] 12.2 Update `src/router/index.ts` for section-based scrolling
    - Retain all existing routes (including blog routes for backward compatibility)
    - Add `scrollBehavior` to handle hash-based scrolling (`#hero`, `#catalog`, `#about`)
    - _Requirements: 8.2, 8.4_

- [x] 13. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate content parsing round-trips (Properties 1, 2, 5, 6) and component rendering invariants (Properties 3, 4)
- Unit tests validate specific component rendering and edge cases
- Blog routes are retained for backward compatibility but removed from navigation
- Fonts: DM Serif Display (headings) + Outfit (body) — NOT Inter/Playfair Display
- Color variables use the exact reference names (--cream, --beige, --terracotta, etc.) — NOT the old --color-cream naming convention
