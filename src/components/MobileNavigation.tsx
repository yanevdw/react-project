import { Link } from "@tanstack/react-router";
import {FaBinoculars} from "react-icons/fa";
import {FaHouse} from "react-icons/fa6";

function MobileNavigation() {
  return (
    <div className="w-full h-full border-none outline-none bg-purple-frost backdrop-blur rounded-t-2xl flex flex-row items-center justify-center text-center align-self-end">
      <Link
        to="/"
        className="w-1/2 h-full flex flex-col items-center justify-center text-frost gap-1 text-sm [&.active]:text-white hover:cursor-pointer"
      >
        <FaHouse size={20} />
        Home
      </Link>
      <Link
        to="/explore"
        className="w-1/2 h-full flex flex-col items-center justify-center gap-1 text-frost text-sm [&.active]:text-white hover:cursor-pointer"
      >
        <FaBinoculars size={20} />
        Explore
      </Link>
    </div>
  );
}

export default MobileNavigation;
