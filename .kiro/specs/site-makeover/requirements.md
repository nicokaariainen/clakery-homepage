# Requirements Document

## Introduction

Complete visual and structural makeover of the c.clakery Vue + TinaCMS website to match the HTML reference design located at #[[file:refrerence/c-clakery-website.html]]. The final result must be pixel-perfect to this reference. The site transitions from a portfolio-style layout to a modern single-page-style design with a full-screen hero (with animated floating blobs), product catalog grid with per-product gradient backgrounds and staggered animations, an about-the-maker section in a two-column grid layout, and a rich four-section footer. All content remains editable through TinaCMS. The blog section from the current site is not present in the target design and will be removed from the main navigation and home page, though blog routes may be retained for backward compatibility.

## Glossary

- **Site**: The c.clakery Vue 3 + TinaCMS website served via Vite
- **Hero_Section**: The full-viewport landing area displaying brand name (with split color styling), tagline, description text, CTA button with arrow icon, animated background blobs, and a scroll indicator
- **Navigation_Bar**: The fixed top navigation component with split-color logo, section links with animated underlines, and a fadeDown entrance animation
- **Product_Catalog**: The section displaying product cards in a responsive grid layout with a decorative top gradient line, staggered fade-in animations, and per-product gradient backgrounds
- **Product_Card**: An individual card within the Product_Catalog showing a product emoji/image on a unique gradient background, optional badge, product name, description, and price
- **About_Section**: The two-column grid section featuring the maker's emoji avatar (with inner border), two bio paragraphs, a divider line, a quote, and decorative background circles
- **Footer**: The bottom section with four groups: Brand (logo + tagline), Navigate (links), Connect (email + Instagram handle), and Follow Along (social media icons), plus a bottom bar with copyright and crafted-with text
- **CTA_Button**: A call-to-action button with an inline arrow SVG icon that translates right on hover, scrolling to the Product_Catalog
- **Badge**: A small pill label on a Product_Card indicating status such as "Bestseller", "New", or "Popular"
- **Scroll_Indicator**: An animated visual cue at the bottom of the Hero_Section with "Scroll" text and a bouncing arrow
- **TinaCMS**: The headless content management system used to manage editable content via markdown and JSON files
- **Content_Layer**: The `src/content/index.ts` module that parses frontmatter from content files and exposes typed data to Vue components

## Requirements

### Requirement 1: Hero Section Redesign

**User Story:** As a visitor, I want to see a visually striking full-screen hero section with animated background blobs, the split-styled brand name, tagline, description, and a call-to-action button with an arrow icon, so that I immediately understand what c.clakery is about.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy the full viewport height on initial page load
2. THE Hero_Section SHALL display the brand name where "c." is rendered in dark brown and "clakery" is rendered in terracotta color with italic styling
3. THE Hero_Section SHALL display the tagline "Where Clay Meets Bakery" in italic serif font below the brand name
4. THE Hero_Section SHALL display a description paragraph about the brand below the tagline
5. THE Hero_Section SHALL display a CTA_Button labeled "Explore Collection" with an inline arrow SVG icon
6. WHEN a visitor clicks the CTA_Button, THE Site SHALL scroll smoothly to the Product_Catalog section
7. WHEN a visitor hovers over the CTA_Button, THE CTA_Button SHALL change background to terracotta, lift upward, and the arrow SVG SHALL translate 3px to the right
8. THE Hero_Section SHALL display a Scroll_Indicator at the bottom of the viewport with "Scroll" text and a bouncing down-arrow
9. THE Hero_Section SHALL use a three-stop gradient background: off-white (0%) to beige (50%) to blush (100%) at 160 degrees
10. THE Hero_Section SHALL render three animated floating blob shapes behind the content: blob-1 (500px, blush, top-right), blob-2 (350px, beige-dark, bottom-left), blob-3 (200px, sage, center-left), each using a `floatBlob` CSS animation with different durations (12s, 10s, 14s)
11. THE Hero_Section content SHALL animate in with a `fadeUp` animation (opacity 0→1, translateY 40px→0) with a 0.3s delay on page load
12. THE Hero_Section title, tagline, and description text SHALL be editable through TinaCMS via the home content collection

### Requirement 2: Navigation Bar Redesign

**User Story:** As a visitor, I want a clean fixed navigation bar with a split-color logo, section links with animated underlines, and a smooth entrance animation, so that I can easily navigate the site.

#### Acceptance Criteria

1. THE Navigation_Bar SHALL display links for Home, Catalog, About, and Contact
2. THE Navigation_Bar SHALL remain fixed at the top of the viewport while scrolling
3. WHEN a visitor clicks a navigation link that targets a section on the home page, THE Site SHALL scroll smoothly to the corresponding section
4. THE Navigation_Bar SHALL use a semi-transparent cream background (rgba with 0.85 opacity) with a 20px backdrop blur
5. THE Navigation_Bar SHALL include a mobile-responsive hamburger menu for viewports narrower than 768px
6. THE Navigation_Bar SHALL remove the Blog link from the navigation items
7. THE Navigation_Bar logo SHALL display "c." in dark brown and "clakery" in terracotta, using the DM Serif Display serif font at 22px
8. WHEN a visitor hovers over a navigation link, THE Navigation_Bar SHALL animate an underline from 0 to 100% width using a `::after` pseudo-element in terracotta color
9. THE Navigation_Bar SHALL animate in on page load with a `fadeDown` animation (opacity 0→1, translateY -20px→0) over 0.8s

### Requirement 3: Product Catalog Section

**User Story:** As a visitor, I want to browse a grid of product cards with unique gradient backgrounds, staggered entrance animations, badges, names, descriptions, and prices, so that I can see what c.clakery offers.

#### Acceptance Criteria

1. THE Product_Catalog SHALL display a section header with the label "Shop the sweetness", heading "Our Collection", and a subtitle
2. THE Product_Catalog SHALL display a decorative gradient line at the top of the section using a `::before` pseudo-element (60px wide, 3px tall, centered, gradient from transparent to terracotta-light to transparent)
3. THE Product_Catalog SHALL display Product_Cards in a responsive grid of 3 columns on desktop, 2 columns on tablet, and 1 column on mobile
4. EACH Product_Card image area SHALL display a unique per-product gradient background (e.g., Croissant: `linear-gradient(145deg, #F5E6D0, #EDCFB0)`, Brownie: `linear-gradient(145deg, #E8D5C0, #D4B896)`, etc.)
5. EACH Product_Card SHALL display the product emoji centered on its gradient background, with a TinaCMS-managed image as an alternative when available
6. EACH Product_Card SHALL display the product name, a short description, and a price in RM currency
7. WHERE a product has a status label, THE Product_Card SHALL display a Badge pill with the label text (e.g., "Bestseller", "New", "Popular") with a frosted glass effect
8. THE Product_Catalog SHALL display a minimum of 6 products matching the reference design
9. WHEN a visitor hovers over a Product_Card, THE Product_Card SHALL lift upward (translateY -6px) with an enhanced box-shadow, and the image/emoji area SHALL scale to 1.05
10. THE Product_Catalog cards SHALL animate in with a staggered `fadeUpCard` animation (opacity 0→1, translateY 30px→0) with increasing delays from 0.1s to 0.6s per card
11. THE Product_Catalog product data (name, description, price, image, emoji, badge, bgGradient) SHALL be editable through TinaCMS via the product content collection

### Requirement 4: TinaCMS Schema Update for Products

**User Story:** As a content editor, I want the TinaCMS product schema to support product images, emoji fallback icons, badges, per-product gradient backgrounds, and RM pricing, so that I can manage the new product card format.

#### Acceptance Criteria

1. THE TinaCMS product collection schema SHALL include an image field (type: 'image') for the product image
2. THE TinaCMS product collection schema SHALL include a field for emoji icon as a fallback placeholder
3. THE TinaCMS product collection schema SHALL include an optional field for badge text
4. THE TinaCMS product collection schema SHALL include a field for bgGradient to store the per-product gradient CSS value
5. THE TinaCMS product collection schema SHALL retain the existing name, description, and price fields
6. THE Content_Layer SHALL parse and expose the imageSrc, emoji, badge, and bgGradient fields from product markdown frontmatter
7. WHEN a product markdown file omits the badge field, THE Content_Layer SHALL return an empty string for the badge value
8. WHEN a product markdown file omits the imageSrc field, THE Content_Layer SHALL return an empty string for the imageSrc value
9. WHEN a product markdown file omits the bgGradient field, THE Content_Layer SHALL return a default gradient value

### Requirement 5: About Section Redesign

**User Story:** As a visitor, I want to learn about the maker behind c.clakery through a two-column about section with a large emoji avatar, two bio paragraphs, a divider, and a styled quote, so that I feel a personal connection to the brand.

#### Acceptance Criteria

1. THE About_Section SHALL use a two-column grid layout (1fr 1fr) with 80px gap, with the maker image on the left and text content on the right
2. THE About_Section left column SHALL display a maker emoji (👩‍🎨) inside a large rounded container (24px border-radius, 4:5 aspect ratio) with a gradient background (blush to beige-dark) and an inner border (8px inset, semi-transparent white)
3. THE About_Section right column SHALL display the section label "Nice to meet you", heading "The Maker Behind c.clakery" (with "c.clakery" in italic terracotta), two bio paragraphs, a divider line, and a styled quote
4. THE About_Section SHALL display two separate bio paragraphs about the maker
5. THE About_Section SHALL display a divider line (50px wide, 2px tall, terracotta-light color) between the bio text and the quote
6. THE About_Section SHALL display a styled quote with a left border (2px solid terracotta-light) and 20px left padding in italic serif font
7. THE About_Section SHALL render two decorative background circles: one 300px circle (terracotta, 8% opacity, top-right) and one 180px circle (sage, 15% opacity, bottom-left)
8. THE About_Section bio text, quote, and maker emoji SHALL be editable through TinaCMS via the about content collection

### Requirement 6: Footer Redesign

**User Story:** As a visitor, I want a comprehensive footer with four distinct groups (Brand, Navigate, Connect, Follow Along), so that I can find additional information and connect with c.clakery.

#### Acceptance Criteria

1. THE Footer SHALL display the brand name "c.clakery" (with "c." in cream and "clakery" in terracotta-light) and tagline "Where Clay Meets Bakery" in italic serif font
2. THE Footer SHALL display a "Navigate" column with links to Home, Catalog, and About sections
3. THE Footer SHALL display a "Connect" column with an email address and Instagram handle
4. THE Footer SHALL display a "Follow Along" column with social media icon buttons (Instagram icon with highlighted styling)
5. THE Footer top area SHALL use a flex layout with Brand on the left, Navigate/Connect grouped in the center-right, and Follow Along on the far right
6. THE Footer SHALL display the copyright text "© 2026 c.clakery. All rights reserved." in the bottom bar
7. THE Footer SHALL display the text "Crafted with 🤎 and a little bit of clay" in the bottom bar, right-aligned
8. THE Footer bottom bar SHALL be separated from the top area by a subtle border (1px solid, warm-brown at 15% opacity)
9. THE Footer artist name and Instagram URL SHALL be editable through TinaCMS via the footer content collection

### Requirement 7: TinaCMS Schema Update for Home and About Content

**User Story:** As a content editor, I want the TinaCMS home and about schemas to support the new hero description, about bio paragraphs, and quote fields, so that I can manage the redesigned content.

#### Acceptance Criteria

1. THE TinaCMS home collection schema SHALL include a field for hero description text
2. THE TinaCMS home collection schema SHALL include a field for CTA button label
3. THE TinaCMS about collection schema SHALL include a field for maker emoji
4. THE TinaCMS about collection schema SHALL include a field for bio text (supporting two paragraphs, either as a single field with paragraph separator or as two separate fields)
5. THE TinaCMS about collection schema SHALL include a field for quote text
6. THE Content_Layer SHALL parse and expose the new home and about fields from their respective content files

### Requirement 8: Single-Page Layout with Section-Based Routing

**User Story:** As a visitor, I want the home page to contain all main sections (hero, catalog, about) as a single scrollable page, so that I get a cohesive browsing experience.

#### Acceptance Criteria

1. THE Site home page SHALL render the Hero_Section, Product_Catalog, and About_Section as sequential sections within a single scrollable view
2. THE Site SHALL retain separate routes for /products, /about, and /contact for direct URL access
3. WHEN a visitor navigates to the home page, THE Site SHALL display all sections without requiring additional navigation
4. THE Site SHALL use smooth scrolling when navigating between sections via navigation links or the CTA_Button

### Requirement 9: Visual Design and Color Palette

**User Story:** As a visitor, I want the site to have a warm, cohesive visual design matching the reference exactly, so that the brand identity feels consistent and inviting.

#### Acceptance Criteria

1. THE Site SHALL use the exact color palette from the reference: `--cream: #FBF7F0`, `--beige: #F0E6D6`, `--beige-dark: #E4D5C0`, `--warm-brown: #C4A882`, `--terracotta-light: #D4A574`, `--terracotta: #C08B5C`, `--soft-brown: #8B7355`, `--dark-brown: #5C4A32`, `--off-white: #FFFCF7`, `--blush: #F2DDD0`, `--sage: #C5CEBA`
2. THE Site SHALL use rounded corners on cards (20px), buttons (50px pill), and section containers consistent with the reference design
3. THE Site SHALL use the Outfit font family for body text and DM Serif Display for headings, loaded via Google Fonts URL: `https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600&display=swap`
4. THE Site global CSS variables SHALL match the reference color values exactly as specified in acceptance criterion 9.1
5. THE Site SHALL apply consistent spacing, padding, and margins matching the reference design across all sections

### Requirement 10: Responsive Design

**User Story:** As a visitor on any device, I want the site to adapt gracefully to different screen sizes, so that I have a good experience on mobile, tablet, and desktop.

#### Acceptance Criteria

1. THE Site SHALL be fully functional and visually correct at viewport widths of 320px, 768px, and 1440px
2. THE Product_Catalog grid SHALL adjust from 3 columns (desktop) to 2 columns (tablet) to 1 column (mobile)
3. THE Navigation_Bar SHALL collapse into a hamburger menu on viewports narrower than 768px
4. THE Hero_Section text and CTA_Button SHALL remain readable and properly sized on all viewport widths
5. THE Footer columns SHALL stack vertically on mobile viewports
6. THE About_Section two-column grid SHALL stack to a single column on mobile viewports

### Requirement 11: Content File Migration

**User Story:** As a developer, I want the existing content markdown files updated to match the new product data and site structure, so that the site renders correctly with the new design.

#### Acceptance Criteria

1. THE product content files SHALL be updated or replaced to include the 6 products from the reference design with emoji, badge, name, description, price (RM), and bgGradient fields; the imageSrc field will be empty initially
2. THE home content file SHALL be updated to include the new hero description and CTA button label
3. THE about content file SHALL be updated to include the maker emoji, two bio paragraphs, and quote from the reference design
4. THE footer content file SHALL be updated to include the email address and any new fields required by the redesigned Footer
