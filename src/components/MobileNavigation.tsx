import { Link } from "@tanstack/react-router";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

function MobileNavigation() {
  return (
    <div className="w-full h-full mt-4 border-none outline-none bg-gray-600/35 flex flex-row items-center justify-center text-center align-self-end">
      <Link
        to="/"
        className="w-1/2 h-full flex flex-col items-center justify-center gap-2 text-white [&.active]:border-t-2 hover:cursor-pointer"
      >
        <FaHome size={18} />
        Home
      </Link>
      <Link
        to="/explore"
        className="w-1/2 h-full flex flex-col items-center justify-center gap-2 text-white [&.active]:border-t-2 hover:cursor-pointer"
      >
        <FaSearch size={18} />
        Explore
      </Link>
    </div>
  );
}

export default MobileNavigation;
