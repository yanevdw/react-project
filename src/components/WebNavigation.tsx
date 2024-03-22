import { Link } from "@tanstack/react-router";

function WebNavigation() {
  return (
    <div className="navbar-container flex justify-end gap-8">
      <Link
        to="/"
        className="[&.active]:font-bold [&.active]:border-b-2 hover:cursor-pointer hover:border-b-2 hover:border-blue-munsell"
      >
        Home
      </Link>{" "}
      <Link
        to="/explore"
        className="[&.active]:font-bold [&.active]:border-b-2 hover:cursor-pointer  hover:border-b-2 hover:border-blue-munsell"
      >
        Explore
      </Link>
    </div>
  );
}

export default WebNavigation;
