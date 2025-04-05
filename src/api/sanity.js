import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  token: import.meta.env.VITE_SANITY_TOKEN,
  useCdn: true,
  apiVersion: '2023-01-01',

});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
