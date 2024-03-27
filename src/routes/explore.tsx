import { createFileRoute } from "@tanstack/react-router";
import Explore from "../components/explore/Explore";

export const Route = createFileRoute("/explore")({
  component: Explore,
});
