import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import DesktopNavigation from "../components/DesktopNavigation";

import MobileNavigation from "../components/MobileNavigation";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="h-screen w-full bg-plum overflow-y-hidden">
        {window.location.pathname.includes("comic") &&
        !window.location.pathname.includes("chapter") ? null : (
          <div className="header-container bg-purple-frost px-6 h-[8%] shadow-md flex items-center justify-between">
            <Link
              to="/"
              className="text-white font-sans text-2xl font-semibold hover:cursor-pointer"
            >
              Jorōgumo
            </Link>
            {window.location.pathname.includes("chapter") ? (
              <div className="web-nav-container text-white w-3/10 block mr-4">
                <DesktopNavigation />
              </div>
            ) : (
              <div className="web-nav-container text-white w-3/10 hidden mr-4 md:block">
                <DesktopNavigation />
              </div>
            )}
          </div>
        )}
        <>
          {(() => {
            if (
              window.location.pathname.includes("comic") &&
              !window.location.pathname.includes("chapter")
            ) {
              return (
                <div
                  className="content-container h-[90%] overflow-y-scroll scroll-m-0 scroll-p-0"
                  id="content-container"
                >
                  <Outlet />
                </div>
              );
            } else if (window.location.pathname.includes("chapter")) {
              return (
                <div
                  className="content-container h-[92%] overflow-y-scroll scroll-m-0 scroll-p-0"
                  id="content-container"
                >
                  <Outlet />
                </div>
              );
            } else {
              return (
                <div
                  className="content-container h-[82%] px-6 overflow-y-scroll scroll-m-0 scroll-p-0 md:h-90/100 pt-8"
                  id="content-container"
                >
                  <Outlet />
                </div>
              );
            }
          })()}
        </>

        {window.location.pathname.includes("chapter") ? (
          <div className="hidden">
            <div className="mobile-nav-container w-full h-full hidden">
              <MobileNavigation />
            </div>
          </div>
        ) : (
          <div className="footer-container w-full h-1/10 block md:hidden">
            <div className="mobile-nav-container w-full h-full">
              <MobileNavigation />
            </div>
          </div>
        )}
      </div>
    </>
  ),
});
