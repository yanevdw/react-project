import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { GiSpiderWeb } from "react-icons/gi";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultNotFoundComponent: () => {
    return (
      <div className="flex flex-col justify-center items-center">
        <GiSpiderWeb />
        <h2 className="font-semibold text-whit text-lg">
          Oops! The page you are looking for got lost in the web and cannot be
          found.
        </h2>
        <p className="text-white text-md">
          Please navigate to a different page or try again.
        </p>
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
