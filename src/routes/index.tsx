import { createFileRoute } from "@tanstack/react-router";
import Home from "../components/home/Home";
import PageNotFound from "../components/PageNotFound";

export const Route = createFileRoute("/")({
  component: Home,
  notFoundComponent: PageNotFound,
});
