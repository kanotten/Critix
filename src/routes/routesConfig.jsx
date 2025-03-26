import Home from "../pages/Home.jsx";
import MovieDetails from "../pages/MovieDetails.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import NotFound from "../pages/NotFound.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/movie/:id", element: <MovieDetails /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
