import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routers from "./config/routers";
import ColorThemeToggler from "./components/ColorThemeToggler";
function App() {
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
        console.log("accountsChanged");
      });
    }
  }, []);
  return (
    <>
      <Header />
      <div className="w-full pt-[7.5rem] root-container">
        <Toaster position="top-center" reverseOrder={false} />
        <Routers />
        <Footer />
      </div>

      <ColorThemeToggler />
      <Outlet />
    </>
  );
}

export default App;
