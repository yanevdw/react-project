import TopComicComponent from "./components/TopComicComponent";

function Home() {
  return (
    <>
      <h2 className="text-white font-semibold text-xl">Top 10 Manga</h2>
      <TopComicComponent comicType="Manga" />
      <h2 className="text-white font-semibold text-xl">Top 10 Manhwa</h2>
      <TopComicComponent comicType="Manhwa" />
      <h2 className="text-white font-semibold text-xl">Top 10 Manhua</h2>
      <TopComicComponent comicType="Manhua" />
    </>
  );
}

export default Home;
