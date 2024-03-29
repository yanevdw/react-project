import { createRootRoute, Outlet } from "@tanstack/react-router";
import DesktopNavigation from "../components/DesktopNavigation";

import MobileNavigation from "../components/MobileNavigation";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="h-screen w-full bg-plum overflow-y-hidden">
        <div className="header-container px-6 h-1/10 flex items-center justify-between">
          <h1 className="text-white font-sans text-2xl font-semibold">
            Jorōgumo
          </h1>
          {window.location.pathname.includes("chapter") ? (
            <div className="web-nav-container text-white w-3/10 block">
              <DesktopNavigation />
            </div>
          ) : (
            <div className="web-nav-container text-white w-3/10 hidden md:block lg:block xl:block 2xl:block">
              <DesktopNavigation />
            </div>
          )}
        </div>
        {window.location.pathname.includes("chapter") ? (
          <div className="content-container h-[90%] overflow-y-scroll scroll-m-0 scroll-p-0">
            <Outlet />
          </div>
        ) : (
          <div className="content-container px-6 h-4/5 overflow-y-scroll scroll-m-0 scroll-p-0">
            <Outlet />
          </div>
        )}

        {window.location.pathname.includes("chapter") ? (
          <div className="hidden">
            <div className="mobile-nav-container w-full h-full hidden">
              <MobileNavigation />
            </div>
          </div>
        ) : (
          <div className="footer-container w-full h-1/10">
            <div className="mobile-nav-container w-full h-full block md:hidden lg:hidden xl:hidden 2xl:hidden">
              <MobileNavigation />
            </div>
          </div>
        )}
      </div>
    </>
  ),
});
