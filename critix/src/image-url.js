// image-url.js
import imageUrlBuilder from '@sanity/image-url';
import client from './sanityClient'; // Import your sanity client

const builder = imageUrlBuilder(client);

export function urlFor(source) {
    return builder.image(source);
}
