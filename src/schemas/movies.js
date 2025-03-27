export default {
    name: 'movie',
    title: 'Movie',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string', // Ensures that this is a text field
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text', // Multi-line text for descriptions
        },
        {
            name: 'genre',
            title: 'Genre',
            type: 'string', // A string for genre
        },
        {
            name: 'releaseYear',
            title: 'Release Year',
            type: 'number', // Numeric field for the year
        },
        {
            name: 'image',
            title: 'Image',
            type: 'url', // URL field for storing the image URL
        },
    ],
};
