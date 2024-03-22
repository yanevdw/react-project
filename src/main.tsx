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
      <div className="flex flex-col justify-center items-center">
        <div className="m-4">Page Not Found!</div>
        <Link to="/" className="underline text-blue-600">
          Go Home
        </Link>
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
