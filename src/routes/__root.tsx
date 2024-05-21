import {createRootRoute, Link, Outlet} from "@tanstack/react-router";
import DesktopNavigation from "../components/DesktopNavigation";

import MobileNavigation from "../components/MobileNavigation";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="h-screen w-full bg-plum overflow-y-hidden">
          {window.location.pathname.includes("comic") && !window.location.pathname.includes("chapter") ? null : (
              <div className="header-container px-6 h-1/10 flex items-center justify-between">

                  <Link to="/" className="text-white font-sans text-2xl font-semibold hover:cursor-pointer">
                      Jorōgumo
                  </Link>
                  {window.location.pathname.includes("chapter") ? (
                      <div className="web-nav-container text-white w-3/10 block">
                          <DesktopNavigation/>
                      </div>
                  ) : (
                      <div className="web-nav-container text-white w-3/10 hidden md:block">
                          <DesktopNavigation/>
                      </div>
                  )}
              </div>)}

          {window.location.pathname.includes("chapter") || window.location.pathname.includes("comic") ? (
              <div className="content-container h-90/100 overflow-y-scroll scroll-m-0 scroll-p-0">
                  <Outlet/>
              </div>
          ) : (
              <div className="content-container h-4/5 px-6 overflow-y-scroll scroll-m-0 scroll-p-0 md:h-90/100">
                  <Outlet/>
              </div>
          )}

          {window.location.pathname.includes("chapter") ? (
              <div className="hidden">
                  <div className="mobile-nav-container w-full h-full hidden">
                      <MobileNavigation/>
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
