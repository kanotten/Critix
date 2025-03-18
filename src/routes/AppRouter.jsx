import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import routes from "./routesConfig";

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;

// Denne filen styrer selve navigasjonen i appen.
// Den bruker `routesConfig.js` til å sette opp alle rutene automatisk.
// Den pakker alt inn i `Layout.jsx`, slik at `Navbar` og `Footer` alltid vises på alle sider.
// Når noen klikker på en lenke, sørger denne koden for at riktig side vises.

// Tenk på den som en resepsjonist som tar imot besøkende og sender dem til riktig rom i en bygning.
