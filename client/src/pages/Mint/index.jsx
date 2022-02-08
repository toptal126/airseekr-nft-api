import { NavLink } from "react-router-dom";
import BannerImage from "../../assets/banner.png";
const Mint = () => {
  return (
    <div className="container mx-auto flex flex-col pt-10">
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full">
          <div className="p-5">
            <h1>Mint Your Unique ONE!</h1>
            <p className="text-2xl pt-5">
              Digital Marketplace For Crypto Collectibles And Non-Fungible
              Tokens. Buy, Sell, And Discover Exclusive Digital Assets.
            </p>
            <div className="flex pt-5 gap-x-5">
              <NavLink
                to="/mint"
                className="round-button bg-emerald-700 focus:ring-emerald-500"
              >
                Mint
              </NavLink>
              <NavLink
                to="/gallery"
                className="round-button bg-indigo-700 focus:ring-indigo-500"
              >
                Explore
              </NavLink>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="p-5">
            <img className="animate-banner" src={BannerImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
