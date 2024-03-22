import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter, Link } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultNotFoundComponent: () => {
    return (
      <div className="flex justify-center items-center">
        <h2 className="font-semibold text-white">
          Oops! Page not found. Please navigate to a different page or try
          again.
        </h2>
      </div>
    );
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
