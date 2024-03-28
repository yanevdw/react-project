import { createFileRoute } from "@tanstack/react-router";
import ReadChapter from "../components/read/ReadChapter";

export const Route = createFileRoute("/comic/$comicSlug/chapter/$chapterHid")({
  component: ReadComicChapter,
});

function ReadComicChapter() {
  const { chapterHid } = Route.useParams();
  return <ReadChapter chapterId={chapterHid} />;
}
