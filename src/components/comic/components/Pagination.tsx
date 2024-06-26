function Pagination({
  totalChapters,
  chaptersPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalChapters: number;
  chaptersPerPage: number;
  setCurrentPage: (value: number) => void;
  currentPage: number;
}) {
  let pages: number[] = [];

  for (let i = 1; i <= Math.ceil(totalChapters / chaptersPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="w-full">
      <div className="pagination w-full flex flex-row gap-2 overflow-x-scroll justify-start md:justify-center">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => {
              setCurrentPage(page);
            }}
            className={
              page === currentPage
                ? "page-button bg-purple-power text-white text-lg p-3 rounded-md"
                : "page-button bg-blue-munsell text-white text-lg p-3 rounded-md"
            }
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
