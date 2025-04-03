---

[image](https://github.com/user-attachments/assets/363b501e-b212-4924-bdb3-345ddb84b43d)

---

# CritiX - The Ultimate Movie Review Platform

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

CritiX is a movie review platform designed to provide users with a seamless experience for discovering, reviewing, and discussing movies. Inspired by IMDb, CritiX offers a modern and user-friendly interface built with cutting-edge technologies.

![Vite Logo](https://vitejs.dev/logo.svg) ![React Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png)

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributors](#contributors)
- [License](#license)
- [Contact](#contact)

---

## About the Project

CritiX is a collaborative project developed by five students as part of their coursework. The platform allows users to explore movies, write reviews, rate films, and engage in discussions about their favorite cinematic experiences. With its sleek design and intuitive functionality, CritiX aims to be a go-to destination for movie enthusiasts.

### User Roles and Access Levels

CritiX has two main sections: **User Section** and **Admin Section**.

- **Public Access**:  
  All visitors can browse movies, read reviews, and view ratings without logging in.

- **User Section**:  
  - Users must log in to create, edit, or delete their own reviews.  
  - Once logged in, users can:  
    - Write and submit reviews for movies.  
    - Edit or delete their own reviews.  
    - Rate movies on a scale of 1 to 10.  

- **Admin Section**:  
  - Admins have full access to manage all content on the platform.  
  - After logging in, admins are redirected to a **dashboard** where they can perform CRUD (Create, Read, Update, Delete) operations on all posts, including:  
    - Adding new movies to the database.  
    - Editing or deleting any movie or review.  
    - Managing user accounts and permissions.  

The separation of roles ensures that regular users can only interact with their own content, while admins have complete control over the platform.

### Screenshots

![Home Page](./screenshots/home-page.png)  
*The home page showcasing popular movies and trending reviews.*

![Movie Details](./screenshots/movie-details.png)  
*Detailed view of a movie, including reviews and ratings.*

*(Add more screenshots here as needed.)*

---

## Features

- **Movie Discovery**: Browse through a vast library of movies.
- **User Reviews**: Write and read reviews for movies.
- **Ratings System**: Rate movies on a scale of 1 to 10.
- **Authentication**: Secure login and registration for users and admins.
- **Admin Dashboard**: Full CRUD functionality for managing movies, reviews, and users.
- **Responsive Design**: Fully optimized for desktop and mobile devices.
- **Search Functionality**: Quickly find movies by title or genre.
- **Interactive UI**: Built with React and Tailwind CSS for a smooth user experience.

---

![image](https://github.com/user-attachments/assets/95502458-e745-484c-9a66-cf07627d6355)

---

## Tech Stack

CritiX is built using the following technologies:

- **Frontend Framework**: [React](https://reactjs.org/)  
- **Build Tool**: [Vite](https://vitejs.dev/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **HTTP Client**: [Axios](https://axios-http.com/)  
- **Routing**: [React Router DOM](https://reactrouter.com/)  
- **Linting**: [ESLint](https://eslint.org/)  
- **TypeScript Support**: [@types/react](https://www.npmjs.com/package/@types/react)  

### Dependencies

| Package                     | Version   |
|-----------------------------|-----------|
| @tailwindcss/vite           | ^4.0.13   |
| axios                       | ^1.8.3    |
| react                       | ^19.0.0   |
| react-dom                   | ^19.0.0   |
| react-router-dom            | ^7.3.0    |
| tailwindscss                | ^0.3.0    |

### Dev Dependencies

| Package                     | Version   |
|-----------------------------|-----------|
| @eslint/js                  | ^9.21.0   |
| @types/react                | ^19.0.10  |
| @types/react-dom            | ^19.0.4   |
| @vitejs/plugin-react        | ^4.3.4    |
| eslint                      | ^9.21.0   |
| eslint-plugin-react-hooks   | ^5.1.0    |
| eslint-plugin-react-refresh | ^0.4.19   |
| globals                     | ^15.15.0  |
| vite                        | ^6.2.0    |

---

## Installation

To set up CritiX locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kanotten/Critix.git
   cd Critix
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Once the development server starts, open your browser and navigate to `http://localhost:5173`.

---

## Usage

- **Explore Movies**: Use the search bar or browse through categories to find movies.
- **Write Reviews**: Click on a movie to view details and leave a review (requires login).
- **Rate Movies**: Submit your rating to contribute to the community's average score.
- **Admin Access**: Log in as an admin to access the dashboard and manage content.

---

## Contributors

This project was developed by the following team members:

- **Abdulla Al Harun**
- **Jo Tan Vo**
- **Kenneth Firoz Sheikh**
- **Patrick Røthe**
- **Christian Westby**

We are proud to have collaborated on this project and hope you enjoy using CritiX!

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions, feedback, or collaboration opportunities, feel free to reach out to us:

- **GitHub Repository**: [https://github.com/kanotten/Critix](https://github.com/kanotten/Critix)  
- **Email**: kenfir01273@stud.noroff.no

---