import { createFileRoute } from "@tanstack/react-router";
import Explore from "../components/Explore";

export const Route = createFileRoute("/explore")({
  component: Explore,
});
