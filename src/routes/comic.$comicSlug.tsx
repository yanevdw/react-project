import { createFileRoute } from "@tanstack/react-router";
import ComicContent from "../components/comic/ComicContent";

export const Route = createFileRoute("/comic/$comicSlug")({
  component: Comic,
});

function Comic() {
  const { comicSlug } = Route.useParams();
  return <ComicContent comic={comicSlug} />;
}
