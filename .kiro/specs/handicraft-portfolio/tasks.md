# Implementation Plan: Handicraft Portfolio (C.Clakery)

## Overview

Incrementally build out the C.Clakery portfolio site by adding Vue Router, layout components (NavigationBar, Footer), five views (Home, Products, Blog, About, Contact), a MarkdownRenderer, and TinaCMS integration. Each task builds on the previous, wiring everything together at the end. The existing `TopHeader.vue`, `ProductCatalog.vue`, and `OrderButton.vue` components are reused and extended where needed.

## Tasks

- [x] 1. Install dependencies and set up Vue Router
  - [x] 1.1 Install vue-router, marked, dompurify, and fast-check
    - Run `npm install vue-router marked dompurify` and `npm install -D @types/dompurify fast-check @vue/test-utils vitest jsdom`
    - _Requirements: 10.1, 10.2_
  - [x] 1.2 Create router configuration at `src/router/index.ts`
    - Define routes for Home (`/`), Products (`/products`), Blog (`/blog`), BlogPost (`/blog/:slug`), About (`/about`), Contact (`/contact`)
    - Add catch-all route `/:pathMatch(.*)*` redirecting to `/`
    - Use lazy-loaded route components
    - _Requirements: 10.1, 10.2, 10.3, 10.4_
  - [x] 1.3 Update `src/main.ts` to register the router with the Vue app
    - Import and use the router plugin
    - _Requirements: 10.1_
  - [x] 1.4 Update `src/App.vue` to use the layout shell
    - Replace current content with `NavigationBar`, `<router-view>`, and `FooterComponent`
    - _Requirements: 1.2, 8.1_

- [x] 2. Implement NavigationBar component
  - [x] 2.1 Create `src/components/NavigationBar.vue`
    - Render five `<router-link>` elements for Home, Products, Blog, About Me, Contact
    - Apply `active-class` to highlight the current route
    - Add `isMobileMenuOpen` reactive state with hamburger toggle button
    - Implement responsive CSS: full nav above 768px, hamburger menu below 768px
    - _Requirements: 1.1, 1.3, 1.4, 1.5, 11.2, 11.3_
  - [ ]* 2.2 Write property test: active navigation link matches current route
    - **Property 1: Active navigation link matches current route**
    - **Validates: Requirements 1.4**
  - [ ]* 2.3 Write property test: hamburger mode below 768px
    - **Property 15: Navigation bar enters hamburger mode below 768px**
    - **Validates: Requirements 11.2**

- [x] 3. Implement FooterComponent
  - [x] 3.1 Create `src/components/FooterComponent.vue`
    - Accept `artistName` and `instagramUrl` props
    - Display current year via `new Date().getFullYear()`
    - Render Instagram link with `target="_blank"` and `rel="noopener noreferrer"`
    - _Requirements: 8.2, 8.3, 8.4, 8.5_
  - [ ]* 3.2 Write property test: footer renders provided content
    - **Property 13: Footer renders provided content**
    - **Validates: Requirements 8.3, 8.4**

- [x] 4. Checkpoint - Ensure layout and routing work
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement MarkdownRenderer component
  - [x] 5.1 Create `src/components/MarkdownRenderer.vue`
    - Accept `content` string prop (raw markdown)
    - Use `marked` to parse markdown to HTML
    - Sanitize output with DOMPurify before rendering via `v-html`
    - Apply site theme styling (Bitter font, brown/cream palette) to rendered elements
    - Support headings, paragraphs, bold, italic, links, images, lists, and code blocks
    - _Requirements: 5.1, 5.2_
  - [ ]* 5.2 Write property test: markdown elements render to correct HTML tags
    - **Property 9: Markdown elements render to correct HTML tags**
    - **Validates: Requirements 5.1**
  - [ ]* 5.3 Write property test: markdown text round-trip preservation
    - **Property 10: Markdown text round-trip preservation**
    - **Validates: Requirements 5.3**

- [x] 6. Implement HomeView
  - [x] 6.1 Create `src/views/HomeView.vue`
    - Reuse existing `TopHeader.vue` for the hero section, passing hero content as props
    - Add a blog preview section below the hero showing the 3 most recent blog posts
    - Each preview item displays title and excerpt, linking to `/blog/:slug`
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - [ ]* 6.2 Write property test: blog preview selects the three most recent posts
    - **Property 2: Blog preview selects the three most recent posts**
    - **Validates: Requirements 2.3**
  - [ ]* 6.3 Write property test: blog post link points to correct slug route
    - **Property 3: Blog post link points to correct slug route**
    - **Validates: Requirements 2.4, 4.3, 10.4**

- [x] 7. Implement ProductsView
  - [x] 7.1 Create `src/views/ProductsView.vue`
    - Render a grid of Product_Card components with image, name, description, price, and Order Now button
    - Order Now button links to the product's specific order URL
    - Responsive grid: 3 columns > 900px, 2 columns 600–900px, 1 column < 600px
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  - [ ]* 7.2 Write property test: product card renders all required fields
    - **Property 4: Product card renders all required fields**
    - **Validates: Requirements 3.2, 3.3**
  - [ ]* 7.3 Write property test: order button links to the product's order URL
    - **Property 5: Order button links to the product's order URL**
    - **Validates: Requirements 3.4**
  - [ ]* 7.4 Write property test: product grid column count follows breakpoint rules
    - **Property 6: Product grid column count follows breakpoint rules**
    - **Validates: Requirements 3.5, 11.4**

- [x] 8. Implement BlogView and BlogPostView
  - [x] 8.1 Create `src/views/BlogView.vue`
    - Display a list of all blog posts sorted by date descending
    - Each entry shows title and publication date
    - Clicking an entry navigates to `/blog/:slug`
    - _Requirements: 4.1, 4.2, 4.3_
  - [x] 8.2 Create `src/views/BlogPostView.vue`
    - Fetch the blog post matching the `:slug` route param
    - Render the full post content using `MarkdownRenderer`
    - Show "Post not found" message if slug doesn't match any post
    - _Requirements: 4.3, 4.4, 10.4_
  - [ ]* 8.3 Write property test: blog posts are sorted by date descending
    - **Property 7: Blog posts are sorted by date in descending order**
    - **Validates: Requirements 4.1**
  - [ ]* 8.4 Write property test: blog list entry displays title and date
    - **Property 8: Blog list entry displays title and date**
    - **Validates: Requirements 4.2**

- [x] 9. Checkpoint - Ensure all views render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Implement AboutView
  - [x] 10.1 Create `src/views/AboutView.vue`
    - Display one or more images of the artist with alt text
    - Display a text description (rendered via MarkdownRenderer if markdown)
    - _Requirements: 6.1, 6.2_

- [x] 11. Implement ContactView with form validation
  - [x] 11.1 Create `src/views/ContactView.vue`
    - Render a form with name, email, and message fields and a Send button
    - Validate all fields are non-empty on submit
    - Validate email format with regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
    - Display inline validation errors for each invalid field
    - Send form data to a configured email endpoint (StaticForms) on valid submission
    - Display success confirmation on successful send, reset form
    - Display error message on send failure, keep form data intact
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_
  - [ ]* 11.2 Write property test: contact form validation flags invalid fields
    - **Property 11: Contact form validation flags invalid fields**
    - **Validates: Requirements 7.4, 7.5**
  - [ ]* 11.3 Write property test: valid form submission triggers email send
    - **Property 12: Valid form submission triggers email send**
    - **Validates: Requirements 7.3**

- [x] 12. Set up TinaCMS integration
  - [x] 12.1 Install TinaCMS and create `tina/config.ts`
    - Run `npx @tinacms/cli@latest init` or manually install `tinacms` and `@tinacms/cli`
    - Define collections for Home, Products, Blog, About, Contact settings, and Footer settings
    - Configure content paths under `content/` directory
    - _Requirements: 9.1, 9.2, 9.4_
  - [x] 12.2 Create initial content files
    - Create `content/home/index.md` with hero frontmatter
    - Create sample `content/products/*.md` files with product frontmatter
    - Create sample `content/blog/*.md` files with blog post frontmatter and body
    - Create `content/about/index.md` with images and description
    - Create `content/contact/index.json` with recipient email
    - Create `content/footer/index.json` with artist name and Instagram URL
    - _Requirements: 9.2, 9.4_
  - [x] 12.3 Wire TinaCMS client into view components
    - Update HomeView to fetch hero content and recent blog posts from TinaCMS
    - Update ProductsView to fetch products from TinaCMS
    - Update BlogView and BlogPostView to fetch blog posts from TinaCMS
    - Update AboutView to fetch about content from TinaCMS
    - Update ContactView to fetch recipient email from TinaCMS
    - Update FooterComponent to fetch footer settings from TinaCMS
    - _Requirements: 2.5, 3.6, 4.5, 6.3, 7.8, 8.6, 9.3_

- [x] 13. Wire everything together and final integration
  - [x] 13.1 Verify App.vue layout shell is complete
    - Ensure NavigationBar, `<router-view>`, and FooterComponent are properly composed
    - Verify footer receives TinaCMS-sourced props
    - _Requirements: 1.2, 8.1_
  - [x] 13.2 Add error handling for content loading
    - Add try/catch with fallback messages for TinaCMS query failures in each view
    - Add `@error` handlers on `<img>` tags for missing images
    - Use optional chaining and defaults for all CMS-sourced data
    - _Requirements: 9.3_
  - [ ]* 13.3 Write property test: undefined routes redirect to home
    - **Property 14: Undefined routes redirect to home**
    - **Validates: Requirements 10.3**

- [x] 14. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 15. Move contact form recipient email from TinaCMS to environment variable
  - [x] 15.1 Add `VITE_RECIPIENT_EMAIL` to `.env`
    - Add `VITE_RECIPIENT_EMAIL=contact@example.com` to the existing `.env` file
    - _Requirements: 7.8_
  - [x] 15.2 Update `env.d.ts` with `VITE_RECIPIENT_EMAIL` type declaration
    - Add `readonly VITE_RECIPIENT_EMAIL: string` to the `ImportMetaEnv` interface
    - _Requirements: 7.8_
  - [x] 15.3 Update `src/views/ContactView.vue` to read recipient email from environment variable
    - Replace `getContactSettings()` call with `import.meta.env.VITE_RECIPIENT_EMAIL`
    - Remove the `onMounted` or setup logic that fetched contact settings from TinaCMS
    - _Requirements: 7.8_
  - [x] 15.4 Remove contact-related TinaCMS content and configuration
    - Remove the `contact` collection from `tina/config.ts`
    - Remove `getContactSettings()`, `ContactSettings` interface, and `contactFiles` glob import from `src/content/index.ts`
    - Delete `content/contact/index.json`
    - _Requirements: 7.8, 9.2_

- [ ] 16. Checkpoint - Verify contact email environment variable migration
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties using fast-check
- The existing `TopHeader.vue`, `ProductCatalog.vue`, and `OrderButton.vue` are reused and extended rather than rewritten
- TinaCMS content is stored as markdown/JSON files in the `content/` directory, committed to Git
- All views currently use placeholder/hardcoded data; TinaCMS wiring (task 12) will replace this with CMS-sourced content
