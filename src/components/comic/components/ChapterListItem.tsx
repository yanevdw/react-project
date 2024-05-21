
import {fetchChapterContent} from "../../../services/api.ts";
import {useQuery} from "@tanstack/react-query";
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import {LazyLoadImage} from "react-lazy-load-image-component";
import ContentLoader from "../../ContentLoader.tsx";


function ChapterListItem({chapterHid}: {chapterHid: string}){

    const {
            data: chapterData,
            error,
        isLoading,
        isPending

          } = useQuery({
            queryKey: ["fetchChapter", chapterHid],
            queryFn: () => fetchChapterContent(chapterHid),
          });

          if (error) {
            console.error(`An unexpected error occurred: ${error.message}`);
          }

    if (isLoading || isPending) {
        return (
            <div className="w-full h-2/5 flex flex-col justify-center items-center">
                <ContentLoader />
            </div>
        );
    }

        if (
            !(
                chapterData?.chapter ||
                chapterData?.chapter?.md_images ||
                chapterData?.chapter.title ||
                chapterData?.chapter.up_count

            )
        ) {
            return (
                <p className="p-2 font-sans text-white text-center self-center">
                    This chapter does not contain any content.
                </p>
            )
        }

    return (
        <div className="chapter-item-container w-full h-full flex flex-row px-2 py-2 gap-4">

            <div className="chapter-cover-image-container w-1/3 h-full bg-blue-munsell rounded-lg">
                <LazyLoadImage className="w-full h-full object-contain rounded-lg shrink-0" src={`https://meo3.comick.pictures/${chapterData.chapter.md_images[0].b2key}`} alt="Chapter Cover Image" />
            </div>
            <div className="chapter-details-container flex flex-col gap-2 justify-start items-left w-1/2">
                <p className="text-white text-lg font-semibold">{chapterData.chapter.title ? `${chapterData.chapter.title}` : `Chapter ${chapterData.chapter.chap}`}</p>
                <label className="text-white font-md bg-purple-frost w-fit h-fit px-2 py-1 rounded-2xl">{chapterData.chapter.created_at.substring(0, chapterData.chapter.created_at.indexOf("T"))}</label>
                <div className="votes-container flex flex-row w-full h-fit gap-2">
                    <p className="bg-magenta/60 w-fit h-fit px-3 py-1 rounded-2xl justify-center items-center  text-white text-sm flex flex-row gap-1"><FaThumbsUp/>{chapterData.chapter.up_count}</p>
                    <p className="bg-purple-power/60 w-fit h-fit px-3 py-1 rounded-2xl justify-center items-center  text-white text-sm flex flex-row gap-1"><FaThumbsDown/>{chapterData.chapter.down_count}</p>
                </div>

            </div>
        </div>


    )
}

export default ChapterListItem;