import { createLazyFileRoute } from "@tanstack/react-router";
import Home from "../components/home/Home";
import PageNotFoundComponent from "../components/PageNotFoundComponent";

export const Route = createLazyFileRoute("/")({
  component: Home,
  notFoundComponent: PageNotFoundComponent,
});
