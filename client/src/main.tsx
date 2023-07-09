import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import store from "./app/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider withNormalizeCSS withGlobalStyles withCSSVariables>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
