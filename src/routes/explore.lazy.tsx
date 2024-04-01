import { createLazyFileRoute } from "@tanstack/react-router";
import Explore from "../components/explore/Explore";
import PageNotFound from "../components/PageNotFound";

export const Route = createLazyFileRoute("/explore")({
  component: Explore,
  notFoundComponent: PageNotFound,
});
