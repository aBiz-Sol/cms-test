import React from "react";
import {
  BrowserRouter as Router,
  Routes as RouterRoutes,
  Route,
  useNavigate,
} from "react-router-dom";
import Templates from "./components/Templates";
import App from "./App";

const Routes = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route path="/" element={<Templates />} />
        <Route path="/template" element={<Templates />} />
        <Route path="/builder/:projectId" element={<App />} />
      </RouterRoutes>
    </Router>
  );
};

export default Routes;
