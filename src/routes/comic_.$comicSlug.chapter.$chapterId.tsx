import { createFileRoute } from "@tanstack/react-router";
import ComicChapter from "../components/comic/ComicChapter";

export const Route = createFileRoute("/comic/$comicSlug/chapter/$chapterId")({
  component: Chapter,
});

function Chapter() {
  const { chapterId } = Route.useParams();
  return <ComicChapter chapterId={chapterId} />;
}
