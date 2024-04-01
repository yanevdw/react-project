import { createFileRoute } from "@tanstack/react-router";
import ComicContent from "../components/comic/ComicContent";
import PageNotFoundComponent from "../components/PageNotFoundComponent";

export const Route = createFileRoute("/comic/$comicSlug")({
  component: Comic,
  notFoundComponent: PageNotFoundComponent,
});

function Comic() {
  const { comicSlug } = Route.useParams();
  return <ComicContent comic={comicSlug} />;
}
