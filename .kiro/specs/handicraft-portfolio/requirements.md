# Requirements Document

## Introduction

This document defines the requirements for a portfolio and homepage for a handicraft artist ("C.Clakery"). The site is built with Vue 3, TypeScript, and Vite. It consists of five views (Home, Products, Blog, About Me, Contact) connected by a navigation bar, with a shared footer. All page content is managed through TinaCMS, enabling the artist to update text, images, products, and blog posts without code changes.

## Glossary

- **App**: The Vue 3 single-page application that serves the portfolio site
- **Navigation_Bar**: A persistent top-level component that provides links to all five views
- **Home_View**: The landing page of the site, featuring the hero header and a blog preview section
- **Products_View**: A catalog page displaying all products with images, descriptions, prices, and order buttons
- **Blog_View**: A page listing all blog posts, each with a title and markdown-rendered body
- **Blog_Post**: A single blog entry consisting of a title and markdown content, managed via TinaCMS
- **About_View**: A page displaying pictures and a description of the artist
- **Contact_View**: A page containing a contact form that sends an email on submission
- **Footer**: A persistent bottom-level component displayed on every view
- **TinaCMS**: A Git-backed headless CMS used to manage all site content
- **Markdown_Renderer**: A component that converts markdown text into styled HTML
- **Contact_Form**: A form component with name, email, and message fields and a send button
- **Product_Card**: A component displaying a single product's image, name, description, price, and order button

## Requirements

### Requirement 1: Navigation Bar

**User Story:** As a visitor, I want a navigation bar at the top of every page, so that I can easily navigate between the different sections of the site.

#### Acceptance Criteria

1. THE Navigation_Bar SHALL display links to Home, Products, Blog, About Me, and Contact views
2. THE Navigation_Bar SHALL be visible at the top of every view in the App
3. WHEN a visitor clicks a navigation link, THE App SHALL route to the corresponding view without a full page reload
4. WHILE a visitor is on a specific view, THE Navigation_Bar SHALL visually indicate the currently active link
5. THE Navigation_Bar SHALL be responsive and remain usable on screen widths from 320px to 1920px

### Requirement 2: Home View

**User Story:** As a visitor, I want to see an attractive landing page with a hero section and a preview of recent blog posts, so that I get a first impression of the artist and the latest updates.

#### Acceptance Criteria

1. THE Home_View SHALL display the existing hero header component with a logo, title, short description, background image, and an Order Now button
2. THE Home_View SHALL display a blog preview section below the hero header
3. THE Home_View blog preview section SHALL show the three most recent Blog_Post titles and a short excerpt
4. WHEN a visitor clicks a blog preview item, THE App SHALL navigate to the full Blog_Post in the Blog_View
5. THE Home_View hero header content (title, short description, background image, logo) SHALL be editable through TinaCMS

### Requirement 3: Products View

**User Story:** As a visitor, I want to browse a catalog of products with images, descriptions, and prices, so that I can find items I want to order.

#### Acceptance Criteria

1. THE Products_View SHALL display a grid of Product_Card components
2. EACH Product_Card SHALL display a product image, name, short description, and price
3. EACH Product_Card SHALL include an Order Now button
4. WHEN a visitor clicks the Order Now button on a Product_Card, THE App SHALL navigate to the specified order URL for that product
5. THE Products_View SHALL be responsive, displaying 3 columns on desktop, 2 on tablet, and 1 on mobile
6. THE Products_View product data (images, names, descriptions, prices, order URLs) SHALL be editable through TinaCMS

### Requirement 4: Blog View

**User Story:** As a visitor, I want to read blog posts from the artist, so that I can follow the creative process and updates.

#### Acceptance Criteria

1. THE Blog_View SHALL display a list of all Blog_Post entries sorted by date in descending order
2. EACH Blog_Post entry in the list SHALL display the post title and publication date
3. WHEN a visitor clicks a Blog_Post entry, THE App SHALL display the full blog post content
4. THE Markdown_Renderer SHALL convert Blog_Post markdown content into styled HTML
5. THE Blog_View blog posts SHALL be created and managed through TinaCMS

### Requirement 5: Markdown Rendering

**User Story:** As an artist, I want my blog posts written in markdown to render as styled HTML, so that I can format posts with headings, lists, images, and links without writing HTML.

#### Acceptance Criteria

1. THE Markdown_Renderer SHALL render headings, paragraphs, bold, italic, links, images, lists, and code blocks from markdown input
2. THE Markdown_Renderer SHALL apply styling consistent with the site theme (Bitter font, brown/cream color palette)
3. FOR ALL valid markdown strings, rendering to HTML and then extracting text content SHALL preserve the original text content (round-trip text preservation)

### Requirement 6: About Me View

**User Story:** As a visitor, I want to learn about the artist through pictures and a description, so that I can connect with the person behind the products.

#### Acceptance Criteria

1. THE About_View SHALL display one or more pictures of the artist or the artist's work
2. THE About_View SHALL display a text description of the artist
3. THE About_View content (pictures and description) SHALL be editable through TinaCMS

### Requirement 7: Contact View

**User Story:** As a visitor, I want to send a message to the artist through a contact form, so that I can ask questions or place custom orders.

#### Acceptance Criteria

1. THE Contact_Form SHALL contain input fields for name, email, and message
2. THE Contact_Form SHALL contain a Send button
3. WHEN a visitor submits the Contact_Form with valid data, THE App SHALL send the form data as an email to a configured recipient address
4. IF a visitor submits the Contact_Form with an empty name, empty email, or empty message, THEN THE Contact_Form SHALL display a validation error for each empty field
5. IF a visitor submits the Contact_Form with an invalid email format, THEN THE Contact_Form SHALL display an email format validation error
6. WHEN the email is sent successfully, THE Contact_Form SHALL display a success confirmation message
7. IF the email sending fails, THEN THE Contact_Form SHALL display an error message indicating the failure
8. THE Contact_Form recipient email address SHALL be read from the VITE_RECIPIENT_EMAIL environment variable

### Requirement 8: Footer

**User Story:** As a visitor, I want to see consistent footer information on every page, so that I can find the artist's social media and know the site is current.

#### Acceptance Criteria

1. THE Footer SHALL be displayed at the bottom of every view in the App
2. THE Footer SHALL display the current year
3. THE Footer SHALL display the name of the artist
4. THE Footer SHALL display a link to the artist's Instagram profile
5. WHEN a visitor clicks the Instagram link, THE App SHALL open the Instagram profile in a new browser tab
6. THE Footer content (artist name, Instagram URL) SHALL be editable through TinaCMS

### Requirement 9: TinaCMS Integration

**User Story:** As an artist, I want to manage all site content through TinaCMS, so that I can update text, images, products, and blog posts without modifying code.

#### Acceptance Criteria

1. THE App SHALL integrate TinaCMS as the content management system
2. THE App SHALL define TinaCMS collections for Home page content, Products, Blog posts, About Me content, and Footer settings
3. WHEN content is updated in TinaCMS, THE App SHALL reflect the changes after the next build or page load
4. THE App SHALL store TinaCMS content in the Git repository as markdown or JSON files

### Requirement 10: Client-Side Routing

**User Story:** As a visitor, I want smooth navigation between pages without full reloads, so that the site feels fast and responsive.

#### Acceptance Criteria

1. THE App SHALL use Vue Router to handle client-side routing
2. THE App SHALL define routes for Home (/), Products (/products), Blog (/blog), About Me (/about), and Contact (/contact)
3. WHEN a visitor navigates to an undefined route, THE App SHALL redirect to the Home_View
4. WHEN a visitor navigates to a Blog_Post, THE App SHALL use a dynamic route (/blog/:slug) to display the post

### Requirement 11: Responsive Design

**User Story:** As a visitor, I want the site to look good on any device, so that I can browse on my phone, tablet, or desktop.

#### Acceptance Criteria

1. THE App SHALL render all views correctly on screen widths from 320px to 1920px
2. THE Navigation_Bar SHALL collapse into a hamburger menu on screen widths below 768px
3. WHEN a visitor taps the hamburger menu icon, THE Navigation_Bar SHALL expand to show all navigation links
4. THE Products_View grid SHALL adapt column count based on screen width (3 columns above 900px, 2 columns between 600px and 900px, 1 column below 600px)
