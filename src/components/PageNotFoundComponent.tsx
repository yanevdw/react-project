import { GiSpiderWeb } from "react-icons/gi";

function PageNotFoundComponent() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4">
      <GiSpiderWeb size={90} className="text-white" />
      <h2 className="font-semibold text-white text-xl text-center">
        Oops! The page you are looking for got lost in the web and cannot be
        found.
      </h2>
      <p className="text-white text-md">
        Please navigate to a different page or try again.
      </p>
    </div>
  );
}

export default PageNotFoundComponent;
