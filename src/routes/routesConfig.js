import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/login", element: <Login /> },
  { path: "/movie/:id", element: <MovieDetails /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
