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
          { type: 'string', name: 'title', label: 'Title' },
          { type: 'string', name: 'shortDesc', label: 'Short Description' },
          { type: 'image', name: 'logoSrc', label: 'Logo' },
          { type: 'image', name: 'backgroundImageSrc', label: 'Background Image' },
          { type: 'string', name: 'orderButtonHref', label: 'Order Button URL' },
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
          { type: 'image', name: 'imageSrc', label: 'Image' },
          { type: 'string', name: 'orderUrl', label: 'Order URL' },
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
          {
            type: 'object',
            name: 'images',
            label: 'Images',
            list: true,
            fields: [
              { type: 'image', name: 'src', label: 'Image' },
              { type: 'string', name: 'alt', label: 'Alt Text' },
            ],
          },
          { type: 'rich-text', name: 'description', label: 'Description', isBody: true },
        ],
      },
      {
        name: 'contact',
        label: 'Contact Settings',
        path: 'content/contact',
        format: 'json',
        fields: [
          { type: 'string', name: 'recipientEmail', label: 'Recipient Email' },
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
        ],
      },
    ],
  },
})
