import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import router from "./routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ConfirmProvider} from "./contexts/ConfirmContext";
import GlobalModals from "@/components/GlobalModals";
import { Toaster } from "react-hot-toast";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
            <ConfirmProvider> 
              <RouterProvider router={router} />
              <Toaster position="top-right" />
              <GlobalModals /> 
            </ConfirmProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
