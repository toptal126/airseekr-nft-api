import { NavLink } from "react-router-dom";
import BannerImage from "../../assets/banner.png";
const Home = () => {
  return (
    <div className="container mx-auto flex flex-col pt-10 fade-in">
      <div className="w-full flex flex-col-reverse md:flex-row">
        <div className="w-full">
          <div className="p-5">
            <h1>Discover Collect And Sell NFT Assets</h1>
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
          <div className="p-0 lg:p-5">
            <img className="animate-banner" src={BannerImage} alt="banner" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
