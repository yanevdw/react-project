import { createFileRoute } from "@tanstack/react-router";
import Home from "../components/home/Home";
import PageNotFoundComponent from "../components/PageNotFoundComponent";

export const Route = createFileRoute("/")({
  component: Home,
  notFoundComponent: PageNotFoundComponent,
});
