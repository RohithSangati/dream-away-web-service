import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Router";
import { RouterProvider } from "react-router-dom";
import { LoaderContextProvider } from "./context/LoaderContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoaderContextProvider>
      <AuthContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick
          draggable
          theme="colored"
          toastStyle={{
            fontSize: "14px",
            borderRadius: "6px",
          }}
        />
        <RouterProvider router={router} />
      </AuthContextProvider>
    </LoaderContextProvider>
  </StrictMode>
);
