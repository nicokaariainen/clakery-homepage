import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: process.env.TINA_BRANCH || 'main',
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: { outputFolder: 'admin', publicFolder: 'public', basePath: 'char-portfolio-site' },
  media: { tina: { mediaRoot: 'images', publicFolder: 'public' } },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
  schema: {
    collections: [
      {
        name: 'home',
        label: 'Home Page',
        path: 'content/home',
        format: 'md',
        fields: [
          { type: 'string', name: 'title', label: 'Brand Name' },
          { type: 'image', name: 'logoSrc', label: 'Brand Logo' },
          { type: 'string', name: 'shortDesc', label: 'Tagline' },
          { type: 'string', name: 'description', label: 'Hero Description', ui: { component: 'textarea' } },
          { type: 'string', name: 'ctaLabel', label: 'CTA Button Label' },
        ],
      },
      {
        name: 'product',
        label: 'Products',
        path: 'content/products',
        format: 'md',
        fields: [
          { type: 'string', name: 'name', label: 'Name' },
          { type: 'string', name: 'description', label: 'Description' },
          { type: 'string', name: 'price', label: 'Price' },
          { type: 'image', name: 'imageSrc', label: 'Product Image' },
          { type: 'string', name: 'emoji', label: 'Emoji Fallback' },
          { type: 'string', name: 'badge', label: 'Badge Text' },
        ],
      },
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'content/blog',
        format: 'md',
        fields: [
          { type: 'string', name: 'title', label: 'Title' },
          { type: 'datetime', name: 'date', label: 'Date' },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
      {
        name: 'about',
        label: 'About Me',
        path: 'content/about',
        format: 'md',
        fields: [
          { type: 'string', name: 'makerEmoji', label: 'Maker Emoji' },
          { type: 'string', name: 'bio', label: 'Bio', ui: { component: 'textarea' } },
          { type: 'string', name: 'quote', label: 'Quote' },
        ],
      },
      {
        name: 'footer',
        label: 'Footer Settings',
        path: 'content/footer',
        format: 'json',
        fields: [
          { type: 'string', name: 'artistName', label: 'Artist Name' },
          { type: 'string', name: 'instagramUrl', label: 'Instagram URL' },
          { type: 'string', name: 'email', label: 'Email Address' },
          { type: 'string', name: 'instagramHandle', label: 'Instagram Handle' },
        ],
      },
    ],
  },
})
