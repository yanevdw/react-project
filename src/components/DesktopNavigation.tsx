import { Link } from "@tanstack/react-router";

function DesktopNavigation() {
  return (
    <div className="navbar-container flex justify-end gap-8">
      <Link
        to="/"
        className="text-gray-500 [&.active]:text-white [&.active]:font-bold hover:cursor-pointer hover:font-semibold hover:text-blue-munsell"
      >
        Home
      </Link>{" "}
      <Link
        to="/explore"
        className="text-gray-500 [&.active]:text-white [&.active]:font-bold hover:cursor-pointer hover:font-semibold hover:text-blue-munsell"
      >
        Explore
      </Link>
    </div>
  );
}

export default DesktopNavigation;
