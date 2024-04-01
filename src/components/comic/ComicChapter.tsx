import { useQuery } from "@tanstack/react-query";
import { fetchChapterContent } from "../../services/api";
import { MdImage } from "../../models/common-types";
import { Link } from "@tanstack/react-router";
import ContentLoader from "../ContentLoader";

function ComicChapter({ chapterId }: { chapterId: string }) {
  const {
    data: chapterData,
    error,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["fetchChapter", chapterId],
    queryFn: () => fetchChapterContent(chapterId),
  });

  if (error) {
    console.error(`An unexpected error occurred: ${error.message}`);
  }

  if (isLoading || isPending) {
    <ContentLoader />;
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
          className="w-full object-cover"
          alt="Chapter Page Image"
        />
      ))}
      <div className="chapter-navigation h-1/10 w-full flex flex-row justify-evenly gap-2 items-center absolute">
        {chapterData.prev.hid ? (
          <Link
            to={`../${chapterData?.prev?.hid}`}
            className="bg-blue-munsell/75 w-fit h-fit px-4 py-2 z-40 rounded-md text-white font-semibold text-nowrap"
          >
            ←
          </Link>
        ) : null}
        <Link
          to={"../../"}
          className="bg-blue-munsell/75 w-fit h-fit px-2 py-2 z-40 rounded-md text-white font-semibold text-nowrap"
        >
          View all chapters
        </Link>
        {chapterData?.next?.hid ? (
          <Link
            to={`../${chapterData?.next?.hid}`}
            className="bg-blue-munsell/75 w-fit h-fit px-4 py-2 rounded-md text-white font-semibold text-nowrap"
          >
            →
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default ComicChapter;
