import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/movie/:id", element: <MovieDetails /> },
  { path: "*", element: <NotFound /> },
];

export default routes;

// Denne filen holder oversikt over alle sidene i prosjektet.
// Det er en liste med hvilken URL som skal vise hvilken side.
// Når noen går til `/movie/:id`, vises `MovieDetails.jsx`.
// Hvis noen skriver inn en feil URL, vises `NotFound.jsx`.

// Tenk på den som en GPS som forteller appen hvilken side den skal vise basert på URL-en.
