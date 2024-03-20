import Home from "./components/Home";

function App() {
  return (
    <div className=" h-screen w-full px-6 bg-plum">
      <div className="header-container h-1/10 flex items-center">
        <h1 className="text-white font-sans text-2xl font-semibold">
          Jorōgumo
        </h1>
      </div>
      <div className="content-container h-4/5 overflow-y-scroll scroll-m-0 scroll-p-0 scrol">
        <Home />
      </div>
      <div className="footer-container  h-1/10"></div>
    </div>
  );
}

export default App;
