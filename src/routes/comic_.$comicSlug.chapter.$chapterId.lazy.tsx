import { createLazyFileRoute } from "@tanstack/react-router";
import ComicChapter from "../components/comic/ComicChapter";
import PageNotFoundComponent from "../components/PageNotFoundComponent";

export const Route = createLazyFileRoute(
  "/comic/$comicSlug/chapter/$chapterId"
)({
  component: Chapter,
  notFoundComponent: PageNotFoundComponent,
});

function Chapter() {
  const { chapterId } = Route.useParams();
  return <ComicChapter chapterId={chapterId} />;
}
