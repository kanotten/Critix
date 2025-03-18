import sanityClient from '@sanity/client';

export const client = sanityClient({
    projectId: '89z0uhze',
    dataset: 'production',
    useCdn: true,
});
