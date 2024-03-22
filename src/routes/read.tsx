import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/read")({
  component: () => <div>Hello Read!</div>,
});
