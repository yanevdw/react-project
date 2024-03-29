import { createFileRoute } from "@tanstack/react-router";
// import ComicChapter from "../components/comic/ComicChapter";

export const Route = createFileRoute("/comic/$comicSlug/chapter/$chapterHid")({
  component: () => <div>This works</div>,
});

// function Chapter() {
//   const { chapterHid } = Route.useParams();
//   return <ComicChapter chapterId={chapterHid} />;
// }
