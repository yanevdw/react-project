import { useQuery } from "@tanstack/react-query";
import { RankDetails } from "../models/state";
import { fetchTopManga, fetchTopManhwa, fetchTopManhua } from "../services/api";

function Home() {
  return (
    <>
      <h2 className="text-white font-semibold text-xl">Top Manga</h2>
      <TopManga />
      <h2 className="text-white font-semibold text-xl">Top Manhwa</h2>
      <TopManhwa />
      <h2 className="text-white font-semibold text-xl">Top Manhua</h2>
      <TopManhua />
    </>
  );
}

export default Home;

function TopManga() {
  const { data: topMangaResults, error } = useQuery({
    queryKey: [`fetchTopManga`],
    queryFn: () => fetchTopManga(),
  });

  if (error) {
    console.error("An unexpected error occurred: " + error);
  }

  if (
    !(
      topMangaResults?.[0]?.md_covers?.[0]?.b2key ||
      topMangaResults?.[0]?.slug ||
      topMangaResults?.[0]?.title
    )
  ) {
    return (
      <div className="top-manga-container w-full h-3/10 text-center">
        <p className="p-2 font-sans text-white">There is no manga to display</p>
      </div>
    );
  }

  // Filter the results to ensure that there will always be a cover image and narrow it down to the first 10 comics.
  const topTenManga: RankDetails[] = topMangaResults
    .filter((comic) => comic.md_covers?.[0]?.b2key)
    .slice(0, 10);

  return (
    <div className="top-manga-container w-full h-3/10 carousel carousel-center space-x-4 bg-neutral rounded-box bg-transparent overflow-y-hidden flex align-center py-4 mb-4">
      {topTenManga.map((mangaRec) => (
        <div
          key={mangaRec.slug}
          className="carousel-item w-2/6 h-full p-0 m-0 flex flex-col justify-center relative indicator first:pl-0 hover:cursor-pointer md:w-1/10 lg:w-1/10"
        >
          <span className="indicator-item badge badge-secondary px-2.5 py-3.5 border-none bg-purple-1000 text-white font-semibold font-sans">
            {topMangaResults.indexOf(mangaRec) + 1}
          </span>
          <img
            src={`https://meo3.comick.pictures/${mangaRec.md_covers[0].b2key}`}
            alt="Manga Cover Image"
            className="rounded-box h-full w-full shadow-custom"
          ></img>
          <div className="image-ovelay h-full w-full rounded-box bg-gradient-to-t from-indigo-950 absolute flex items-end justify-center text-center p-0 m-0">
            <p className="p-2 font-sans text-white">{mangaRec.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TopManhwa() {
  const { data: topManhwaResults, error } = useQuery({
    queryKey: [`fetchTopManhwa`],
    queryFn: () => fetchTopManhwa(),
  });

  if (error) {
    console.error("An unexpected error occurred: " + error);
  }

  if (
    !(
      topManhwaResults?.[0]?.md_covers?.[0]?.b2key ||
      topManhwaResults?.[0]?.slug ||
      topManhwaResults?.[0]?.title
    )
  ) {
    return (
      <div className="top-manhwa-container w-full h-3/10 text-center">
        <p className="p-2 font-sans text-white">
          There is no manhwa to display
        </p>
      </div>
    );
  }

  // Filter the results to ensure that there will always be a cover image and narrow it down to the first 10 comics.
  const topTenManhwa: RankDetails[] = topManhwaResults
    .filter((comic) => comic.md_covers?.[0]?.b2key)
    .slice(0, 10);

  return (
    <div className="top-manhwa-container w-full h-3/10 carousel carousel-center space-x-4 bg-neutral rounded-box bg-transparent overflow-y-hidden flex align-center py-4 mb-4">
      {topTenManhwa.map((manhwaRec) => (
        <div
          key={manhwaRec.slug}
          className="carousel-item w-2/6 h-full p-0 m-0 flex flex-col justify-center relative indicator first:pl-0 hover:cursor-pointer md:w-1/10 lg:w-1/10"
        >
          <span className="indicator-item badge badge-secondary px-2.5 py-3.5 border-none bg-purple-1000 text-white font-semibold font-sans">
            {topManhwaResults.indexOf(manhwaRec) + 1}
          </span>
          <img
            src={`https://meo3.comick.pictures/${manhwaRec.md_covers[0].b2key}`}
            alt="Manga Cover Image"
            className="rounded-box h-full w-full shadow-custom"
          ></img>
          <div className="image-ovelay h-full w-full rounded-box bg-gradient-to-t from-indigo-950 absolute flex items-end justify-center text-center p-0 m-0">
            <p className="p-2 font-sans text-white">{manhwaRec.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TopManhua() {
  const { data: topManhuaResults, error } = useQuery({
    queryKey: [`fetchTopManhua`],
    queryFn: () => fetchTopManhua(),
  });

  if (error) {
    console.error("An unexpected error occurred: " + error);
  }

  if (
    !(
      topManhuaResults?.[0]?.md_covers?.[0]?.b2key ||
      topManhuaResults?.[0]?.slug ||
      topManhuaResults?.[0]?.title
    )
  ) {
    return (
      <div className="top-manhua-container w-full h-3/10 text-center">
        <p className="p-2 font-sans text-white">
          There is no manhua to display
        </p>
      </div>
    );
  }

  // Filter the results to ensure that there will always be a cover image and narrow it down to the first 10 comics.
  const topTenManhua: RankDetails[] = topManhuaResults
    .filter((comic) => comic.md_covers?.[0]?.b2key)
    .slice(0, 10);

  return (
    <div className="top-manhua-container w-full h-3/10 carousel carousel-center space-x-4 bg-neutral rounded-box bg-transparent overflow-y-hidden flex align-center py-4">
      {topTenManhua.map((manhuaRec) => (
        <div
          key={manhuaRec.slug}
          className="carousel-item w-2/6 h-full p-0 m-0 flex flex-col justify-center relative indicator first:pl-0 hover:cursor-pointer md:w-1/10 lg:w-1/10"
        >
          <span className="indicator-item badge badge-secondary px-2.5 py-3.5 border-none bg-purple-1000 text-white font-bold font-sans text-md">
            {topManhuaResults.indexOf(manhuaRec) + 1}
          </span>
          <img
            src={`https://meo3.comick.pictures/${manhuaRec.md_covers[0].b2key}`}
            alt="Manga Cover Image"
            className="rounded-box h-full w-full shadow-custom"
          ></img>
          <div className="image-ovelay h-full w-full rounded-box bg-gradient-to-t from-indigo-950 absolute flex items-end justify-center text-center p-0 m-0">
            <p className="p-2 font-sans text-white">{manhuaRec.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
