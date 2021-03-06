import { NavLink } from "react-router-dom";

import { PAGE_LINKS, LOGO_WEBP } from "../config/contants";

import { ReactComponent as MenuOpen } from "../assets/icon/MenuOpen.svg";
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
  const [menuShown, setMenuShown] = useState(false);
  useEffect(() => {
    window.innerWidth > 1024 && setMenuShown(true);
  }, []);

  const linkChanged = () => {
    window.innerWidth <= 1024 && setMenuShown(false);
  };

  return (
    <div className="fixed w-full top-0 lg:px-8 px-5 py-5 z-10 header border-b border-zinc-400 dark:border-slate-800 bg-opacity-30 backdrop-filter backdrop-blur-lg">
      <div className="flex h-full lg:items-center justify-center max-w-11xl mx-auto">
        <div className="flex-grow relative z-10">
          <div className="flex justify-between">
            <NavLink className="w-min-content" to="/">
              <img
                className="app-logo h-20 p-2 rounded"
                src={LOGO_WEBP}
                alt="logo"
              />
            </NavLink>
            <MenuOpen
              className="my-auto w-8 h-8 fill-red-500 cursor-pointer lg:hidden hover:fill-red-800 dark:hover:fill-red-300 transition-all duration-500"
              onClick={() => setMenuShown(!menuShown)}
            />
          </div>
        </div>
        <div className="items-center flex absolute lg:relative right-0 lg:right-[unset]">
          <ul
            className={
              (!menuShown ? "hidden" : "") +
              " flex flex-col lg:flex-row lg:space-x-2  min-w-[100vw] lg:min-w-[unset] left-0 mt-[6.25rem] lg:mt-[unset] fade-in"
            }
          >
            {PAGE_LINKS.map((link, index) => (
              <li key={index}>
                <NavLink
                  onClick={() => linkChanged()}
                  to={link.link}
                  className="bg-gray-400 dark:bg-black dark:bg-gray-800 dark:lg:bg-white lg:bg-opacity-20 dark:lg:bg-opacity-20 dark:hover:bg-opacity-70 dark:hover:lg:bg-opacity-70 text-black dark:text-white h-12 lg:h-7 leading-[3rem] lg:leading-[unset] uppercase duration-200 px-4 lg:rounded flex justify-center flex-row text-2xl lg:text-base"
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
            <li>
              <div className="bg-black dark:bg-white bg-opacity-20 dark:bg-opacity-20 hover:bg-opacity-70 dark:hover:bg-opacity-70 text-black hover:text-white dark:text-white items-center relative h-7 items-center pt-0.5 first::pt-0 duration-1000 uppercase text-2xs padding-huge duration-200 items-center px-4 rounded flex justify-center flex-row">
                Shop
                <span className="absolute whitespace-nowrap -top-2 -right-1 flex items-center text-4xs tracking-wide w-auto left-1/2s transforms -translate-x-1/2s bg-white shadow pt-0.5 px-2 rounded-sm text-red-500">
                  Soon
                </span>
              </div>
            </li>
            <li>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/azukizen"
                className="bg-black dark:bg-white bg-opacity-20 dark:bg-opacity-20 hover:bg-opacity-70 dark:hover:bg-opacity-70 text-black hover:text-white dark:text-white items-center relative h-7 items-center pt-0.5 first::pt-0 duration-1000 uppercase text-2xs padding-huge duration-200 items-center px-4 rounded flex justify-center flex-row"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current stroke-current h-4 w-4"
                  viewBox="0 0 40 40"
                >
                  <path d="M38.526 8.625a15.199 15.199 0 01-4.373 1.198 7.625 7.625 0 003.348-4.211 15.25 15.25 0 01-4.835 1.847 7.6 7.6 0 00-5.557-2.404c-4.915 0-8.526 4.586-7.416 9.346-6.325-.317-11.934-3.347-15.69-7.953C2.01 9.869 2.97 14.345 6.358 16.612a7.58 7.58 0 01-3.446-.953c-.084 3.527 2.444 6.826 6.105 7.56a7.63 7.63 0 01-3.438.13 7.618 7.618 0 007.112 5.286A15.306 15.306 0 011.42 31.79a21.55 21.55 0 0011.67 3.42c14.134 0 22.12-11.937 21.637-22.643a15.499 15.499 0 003.799-3.941z"></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div className="lg:hidden z-50">
          <div className="single-small">
            <button
              className="hamburger single-small single-small--magnetic"
              type="button"
            >
              <div className="inner transition ease-in-out duration-500">
                <span className="before:bg-white after:bg-white bar transition ease-in-out duration-500"></span>
                <span className="before:bg-white after:bg-white bg-white bar"></span>
                <span className="before:bg-white after:bg-white bar transition ease-in-out duration-500"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
