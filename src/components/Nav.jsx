import { NavLink, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const title = useMemo(() => {
    if (pathname.startsWith("/create")) return "Create Ticket";
    if (pathname.startsWith("/ticket")) return "Ticket Detail";
    return "Dashboard";
  }, [pathname]);

  const linkBase =
    "px-4 py-2 rounded-full text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-300";
  const linkActive = "text-indigo-900 bg-white shadow-sm";
  const linkIdle = "text-white/90 hover:bg-white/15";

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <div className="bg-indigo-600 shadow-md">
        <div className="container px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-white">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Support Ticket
                </h1>
                <p className="text-white/90 text-xs sm:text-sm">{title}</p>
              </div>
            </div>

            <button
              className="sm:hidden p-2 rounded-lg text-white/90 hover:bg-white/20 transition"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close Menu" : "Open Menu"}
            >
              <svg
                className={`w-6 h-6 ${open ? "hidden" : "block"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className={`w-6 h-6 ${open ? "block" : "hidden"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <nav className="hidden sm:flex items-center gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkIdle}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkIdle}`
                }
              >
                Create Ticket
              </NavLink>
            </nav>
          </div>

          <div
            className={`sm:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
              open ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
            }`}
          >
            <nav className="flex flex-col gap-2">
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${linkBase} ${
                    isActive
                      ? "bg-white text-indigo-900 shadow-sm"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/create"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${linkBase} ${
                    isActive
                      ? "bg-white text-indigo-900 shadow-sm"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`
                }
              >
                Create Ticket
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
