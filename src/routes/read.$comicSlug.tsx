import { createFileRoute } from "@tanstack/react-router";
import ReadComic from "../components/read/ReadComic";

export const Route = createFileRoute("/read/$comicSlug")({
  component: ReadComics,
});

function ReadComics() {
  const { comicSlug } = Route.useParams();
  return <ReadComic comic={comicSlug} />;
}
