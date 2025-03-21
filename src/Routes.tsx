import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadPage from "./component/LoadPage";
import Header from "./component/Header";
import NotFound from "./component/NotFound";

// Layout component that optionally includes Header/Footer
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">{children}</main>
    <footer className="bg-black text-white p-4 text-center">
      <p>© 2023 My Website. All rights reserved.</p>
    </footer>
  </div>
);

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        {/* Routes with header/footer */}
        <Route
          path="/"
          element={
            <Layout>
              <LoadPage page="home.html" />
            </Layout>
          }
        />
        <Route
          path="/pricing"
          element={
            <Layout>
              <LoadPage page="pricing.html" />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <LoadPage page="contact.html" />
            </Layout>
          }
        />

        {/* For NotFound route, do not include Header/Footer */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
