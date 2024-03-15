import Home from "./components/Home";

function App() {
  return (
    <div className="bg-blue-purple h-screen w-full px-6">
      <div className="header-container h-1/10"></div>
      <div className="content-container h-4/5 overflow-y-scroll scroll-m-0 scroll-p-0 scrol">
        <Home />
      </div>
      <div className="footer-container  h-1/10"></div>
    </div>
  );
}

export default App;
