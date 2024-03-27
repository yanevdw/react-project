import ComicCard from "./components/ComicCard";

function ReadComic({ comic }: { comic: string }) {
  return (
    <>
      <ComicCard comicSlug={comic} />
    </>
  );
}

export default ReadComic;
