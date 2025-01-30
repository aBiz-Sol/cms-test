import React from "react";
import {
  BrowserRouter as Router,
  Routes as RouterRoutes,
  Route,
  useNavigate,
} from "react-router-dom";
import Templates from "./components/Templates";
import App from "./App";
import Preview from "./components/Preview";

const Routes = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route path="/" element={<Templates />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/builder/:projectId" element={<App />} />
        <Route path="/preview" element={<Preview />} />
      </RouterRoutes>
    </Router>
  );
};

export default Routes;
