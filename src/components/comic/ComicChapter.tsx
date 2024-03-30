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
  if (
    !(
      chapterData?.chapter ||
      chapterData?.chapter?.md_images ||
      chapterData?.prev ||
      chapterData?.prev?.hid
    )
  ) {
    return (
      <p className="p-2 font-sans text-white text-center self-center">
        This chapter does not contain any content.
      </p>
    );
  }

  return (
    <div className="w-full h-full relative">
      {chapterData?.chapter?.md_images?.map((chapterImage: MdImage) => (
        <img
          src={`https://meo3.comick.pictures/${chapterImage.b2key}`}
          key={chapterImage.name}
        />
      ))}
      <div className="chapter-navigation h-1/10 w-full flex flex-row justify-evenly gap-2 items-center absolute">
        {chapterData.prev.hid ? (
          <Link
            to={`../${chapterData?.prev?.hid}`}
            className="bg-blue-munsell w-fit h-fit px-2 py-2 z-40 rounded-md text-white font-semibold"
            onClick={() => (
              <ComicChapter chapterId={`${chapterData?.prev?.hid}`} />
            )}
          >
            Previous chapter
          </Link>
        ) : null}
        {chapterData?.next?.hid ? (
          <Link
            to={`../${chapterData?.next?.hid}`}
            className="bg-blue-munsell w-fit h-fit px-2 py-2 rounded-md text-white font-semibold"
            onClick={() => (
              <ComicChapter chapterId={`${chapterData?.next?.hid}`} />
            )}
          >
            Next chapter
          </Link>
        ) : null}
        <Link
          to={"../../"}
          className="bg-blue-munsell w-fit h-fit px-2 py-2 z-40 rounded-md text-white font-semibold"
        >
          View all chapters
        </Link>
      </div>
    </div>
  );
}

export default ComicChapter;
