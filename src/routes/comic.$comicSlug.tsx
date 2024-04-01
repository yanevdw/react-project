import { createFileRoute } from "@tanstack/react-router";
import ComicContent from "../components/comic/ComicContent";
import PageNotFound from "../components/PageNotFound";

export const Route = createFileRoute("/comic/$comicSlug")({
  component: Comic,
  notFoundComponent: PageNotFound,
});

function Comic() {
  const { comicSlug } = Route.useParams();
  return <ComicContent comic={comicSlug} />;
}
