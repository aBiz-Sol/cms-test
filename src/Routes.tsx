import React from "react";
import {
  BrowserRouter as Router,
  Routes as RouterRoutes,
  Route,
} from "react-router-dom";
import Templates from "./components/Templates";
import App from "./App";

const Routes = () => {
  return (
    <Router>
      <RouterRoutes>
        {/* The default route points to /template */}
        <Route path="/" element={<Templates />} />
        {/* The /template route shows the Templates page */}
        <Route path="/template" element={<Templates />} />
        {/* The /builder route shows the Builder page */}
        <Route path="/builder" element={<App />} />
        {/* Add other routes as needed */}
      </RouterRoutes>
    </Router>
  );
};

export default Routes;
