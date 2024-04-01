import { createFileRoute } from "@tanstack/react-router";
import Explore from "../components/explore/Explore";
import PageNotFoundComponent from "../components/PageNotFoundComponent";

export const Route = createFileRoute("/explore")({
  component: Explore,
  notFoundComponent: PageNotFoundComponent,
});
