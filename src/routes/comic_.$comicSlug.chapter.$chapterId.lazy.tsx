import { createLazyFileRoute } from "@tanstack/react-router";
import ComicChapter from "../components/comic/ComicChapter";
import PageNotFound from "../components/PageNotFound";

export const Route = createLazyFileRoute(
  "/comic/$comicSlug/chapter/$chapterId"
)({
  component: Chapter,
  notFoundComponent: PageNotFound,
});

function Chapter() {
  const { chapterId } = Route.useParams();
  return <ComicChapter chapterId={chapterId} />;
}
