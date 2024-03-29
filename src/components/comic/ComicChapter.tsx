import { useQuery } from "@tanstack/react-query";
import { fetchChapterContent } from "../../services/api";
import { MdImage } from "../../models/common-types";
import { Link } from "@tanstack/react-router";

function ComicChapter({ chapterId }: { chapterId: string }) {
  const {
    data: chapterData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["fetchChapter", chapterId],
    queryFn: () => fetchChapterContent(chapterId),
  });

  if (error) {
    console.error("An unexpected error occurred: " + error);
  }

  if (isLoading) {
    <div className="w-full h-full">Loading</div>;
  }
  if (!chapterData) {
    return (
      <p className="p-2 font-sans text-white text-center self-center">
        This chapter does not contain any content.
      </p>
    );
  }

  return (
    <div className="w-full h-full">
      {chapterData.chapter.md_images.map((chapterImage: MdImage) => (
        <img
          src={`https://meo3.comick.pictures/${chapterImage.b2key}`}
          key={chapterImage.name}
        />
      ))}
      <div className="chapter-navigation">
        <Link
          to={`${chapterData.prev.hid}`}
          params={(prev) => ({ ...prev, chapterId: `${chapterData.prev.hid}` })}
          className="bg-blue-munsell w-fit h-fit px-2 py-2 z-40"
          onClick={() => <ComicChapter chapterId={`${chapterData.prev.hid}`} />}
        >
          Previous Chapter
        </Link>
        {/* <Link
          to={() => T}
          className="bg-blue-munsell w-fit h-fit px-2 py-2 z-40"
        >
          View all Chapters
        </Link> */}
      </div>
    </div>
  );
}

export default ComicChapter;
