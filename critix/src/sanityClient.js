// sanityClient.js
import sanityClient from '@sanity/client';

const client = sanityClient({
    projectId: '89z0uhze',
    dataset: 'production',
    apiVersion: '2024-08-31',
    useCdn: true, // Use CDN for faster access to published content
});

export default client;
