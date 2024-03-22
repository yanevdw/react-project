import { Link } from "@tanstack/react-router";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

function MobileNavigation() {
  return (
    <div className="w-full h-16 mt-4 border-none outline-none bg-gray-600/35 flex flex-row items-center justify-center text-center align-self-end">
      <Link
        to="/"
        className="w-1/2 h-full flex flex-col items-center justify-center gap-1 text-white [&.active]:border-t-2 hover:cursor-pointer"
      >
        <FaHome />
        Home
      </Link>
      <Link
        to="/explore"
        className="w-1/2 h-full flex flex-col items-center justify-center gap-1 text-white [&.active]:border-t-2 hover:cursor-pointer"
      >
        <FaSearch />
        Explore
      </Link>
    </div>
  );
}

export default MobileNavigation;
