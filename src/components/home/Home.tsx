import TopComicComponent from "./components/TopComicComponent";

function Home() {
  return (
    <>
      <p className="text-white font-semibold text-xl">Top 10 Manga</p>
      <TopComicComponent comicType="Manga" />
      <p className="text-white font-semibold text-xl">Top 10 Manhwa</p>
      <TopComicComponent comicType="Manhwa" />
      <p className="text-white font-semibold text-xl">Top 10 Manhua</p>
      <TopComicComponent comicType="Manhua" />
    </>
  );
}

export default Home;
