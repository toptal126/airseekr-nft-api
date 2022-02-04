import { Outlet, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Routers from "./config/routers";
import ColorThemeToggler from "./components/ColorThemeToggler";

function App() {
  return (
    <>
      <Header />
      <div className="w-full pt-32">
        <Routers />
        <Footer />
      </div>

      <ColorThemeToggler />
      <Outlet />
    </>
  );
}

export default App;
