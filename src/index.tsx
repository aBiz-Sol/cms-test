import * as React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material";
import App from "./App";
const theme = createTheme({
  components: {
    MuiPopover: {
      styleOverrides: {
        paper: {
          marginLeft: "-8px",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#1976d2", // Customize your theme colors
    },
    background: {
      paper: "#ffffff", // Ensure `background.paper` is defined
    },
  },
});

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
