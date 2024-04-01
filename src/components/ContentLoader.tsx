function ContentLoader() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="loader-container w-full flex flex-row justify-center items-center">
        <span className="loading loading-spinner text-primary"></span>
        <span className="loading loading-spinner text-secondary"></span>
        <span className="loading loading-spinner text-accent"></span>
        <span className="loading loading-spinner text-neutral"></span>
        <span className="loading loading-spinner text-info"></span>
        <span className="loading loading-spinner text-success"></span>
        <span className="loading loading-spinner text-warning"></span>
        <span className="loading loading-spinner text-error"></span>
      </div>
      <h2 className="font-semibold text-white text-xl text-center">
        Building the web
      </h2>
    </div>
  );
}

export default ContentLoader;
