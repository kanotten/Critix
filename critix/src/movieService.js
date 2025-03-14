import client from './sanityClient';
export async function getMovies() {
    const query = '*[_type == "movie"]{_id, title, description, genre, releaseDate, poster}';
    try {
        const movies = await client.fetch(query);
        console.log(movies);
        return movies;
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

