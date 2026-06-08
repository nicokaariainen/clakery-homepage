import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: process.env.TINA_BRANCH || 'main',
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: { outputFolder: 'admin', publicFolder: 'public' },
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
          { type: 'number', name: 'order', label: 'Display Order' },
          { type: 'string', name: 'name', label: 'Name' },
          { type: 'string', name: 'description', label: 'Description' },
          { type: 'string', name: 'price', label: 'Price' },
          { type: 'image', name: 'images', label: 'Product Images (carousel)', list: true },
          { type: 'string', name: 'emoji', label: 'Emoji Fallback' },
          { type: 'string', name: 'badge', label: 'Badge Text' },
        ],
      },
      {
        name: 'catalog',
        label: 'Catalog Section',
        path: 'content/catalog',
        format: 'md',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'label', label: 'Section Label' },
          { type: 'string', name: 'title', label: 'Section Title' },
          { type: 'string', name: 'subtitle', label: 'Section Subtitle', ui: { component: 'textarea' } },
        ],
      },
      {
        name: 'contact',
        label: 'Contact Section',
        path: 'content/contact',
        format: 'md',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'label', label: 'Section Label' },
          { type: 'string', name: 'title', label: 'Section Title' },
          { type: 'string', name: 'subtitle', label: 'Section Subtitle', ui: { component: 'textarea' } },
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
          { type: 'image', name: 'images', label: 'Photos (carousel)', list: true },
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
