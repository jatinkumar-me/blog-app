import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import { ModalsProvider } from "@mantine/modals";
import AuthModal from "./components/AuthModal.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
        <ModalsProvider modals={{ authorization: AuthModal }}>
          <App />
        </ModalsProvider>
    </Provider>
  </React.StrictMode>
);
