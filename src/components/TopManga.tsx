import { useGetTopMangaQuery, useGetComicContentQuery } from "../services/api";
import "../style/TopManga.css";

const topTenManga: string[] = [];
const topManga: string[] = [];

// function getComicContent(slug: string) {
//   console.log(slug);
//   const {
//     data: comicResults,
//     error,
//     isLoading: isLoadingComic,
//   } = useGetComicContentQuery(slug);

//   console.log(comicResults);
//   return (
//     <div className="top-manga-container">
//       {error ? (
//         <>Oh no, there was an error</>
//       ) : isLoadingComic ? (
//         <div className="top-manga-loading">Loading...</div>
//       ) : comicResults ? (
//         <div className="manga-display" key={comicResults.comic.title}>
//           {comicResults.comic.title}
//         </div>
//       ) : null}
//     </div>
//   );
// }

function filterResults(results: string[]) {
  for (let result of results) {
    const { data: comicInfo } = useGetComicContentQuery(result, {
      skip: false,
    });
    console.log(comicInfo?.comic.title);
    if (comicInfo && comicInfo.matureContent === false) {
      while (topTenManga.length < 10) {
        topTenManga.push(result);
      }
    }
  }
}

function TopManga() {
  const {
    data: topMangaResults,
    error,
    isLoading: isLoadingTopManga,
  } = useGetTopMangaQuery();

  if (error) {
    console.error(error);
  }

  if (isLoadingTopManga) {
    return <div className="top-manga-loading-container">Loading...</div>;
  }

  if (topMangaResults) {
    topMangaResults.map((r) => topManga.push(r.slug));
  }

  if (topManga.length != 0) {
    filterResults(topManga);
  }
}

export default TopManga;
//     topMangaResults
//       ?.slice(0, 10)
//       .map((result) => getComicContent(result.slug))
