import { PiLightningFill, PiSwordFill, PiAlienFill } from "react-icons/pi";
import { FaLaugh } from "react-icons/fa";
import { FaHourglassHalf, FaWandMagicSparkles } from "react-icons/fa6";
import { GiMagnifyingGlass } from "react-icons/gi";
import { IoSunnySharp } from "react-icons/io5";

// Some popular genres to search for
export const comicGenres = [
  "Action",
  "Adventure",
  "Comedy",
  "Historical",
  "Magic",
  "Mystery",
  "Sci-Fi",
  "Slice of Life",
];

// Used to set the background of the respective pills associated with each genre.
export const colourCodeGenreLabels = [
  "bg-red-600/20",
  "bg-orange-500/20",
  "bg-yellow-500/20",
  "bg-lime-500/20",
  "bg-cyan-500/20",
  "bg-purple-400/20",
  "bg-green-700/20",
  "bg-pink-500/20",
];

// Icons assoicated with each genre.
export const comicGenreIcons = [
  <PiLightningFill key="lightning" className="text-red-600 text-lg" />,
  <PiSwordFill key="sword" className="text-orange-500 text-lg" />,
  <FaLaugh key="laugh" className="text-yellow-500 text-lg" />,
  <FaHourglassHalf key="hourglass" className="text-lime-500 text-lg" />,
  <FaWandMagicSparkles key="sparkles" className="text-cyan-500 text-lg" />,
  <GiMagnifyingGlass
    key="magnifying-glass"
    className="text-purple-400 text-lg"
  />,
  <PiAlienFill key="alien" className="text-green-700 text-lg" />,
  <IoSunnySharp key="sun" className="text-pink-500 text-lg" />,
];
