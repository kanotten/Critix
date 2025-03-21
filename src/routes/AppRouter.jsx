import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import MovieDetailsLayout from "../layouts/MovieDetailsLayout";
import routes from "./routesConfig.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element }, index) => {
          // Bruk MovieDetailsLayout for movie details-siden
          if (path.startsWith("/movie/")) {
            return (
              <Route
                key={index}
                path={path}
                element={<MovieDetailsLayout>{element}</MovieDetailsLayout>}
              />
            );
          }

          // Bruk MainLayout for alle andre sider
          return (
            <Route
              key={index}
              path={path}
              element={<MainLayout>{element}</MainLayout>}
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default AppRouter;
