import * as React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Routes from "./Routes";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Routes />
    </StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
