import client from './sanityClient';
export async function getMovies() {
    const query = '*[_type == "movie"]{_id, title, description, genre, releaseDate, poster}';

    try {
        const movies = await client.fetch(query);

        return movies || [];
    } catch (error) {
        console.error('Error fetching movies:', error);

        throw new Error('Failed to fetch movies from the server.');
    }
}
