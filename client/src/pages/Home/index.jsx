import { NavLink } from "react-router-dom";
import BannerImage from "../../assets/banner.png";
const Home = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row pt-10">
      <div className="w-full">
        <div className="p-5">
          <h1>Discover Collect And Sell NFT Assets</h1>
          <p className="text-2xl pt-5">
            Digital Marketplace For Crypto Collectibles And Non-Fungible Tokens.
            Buy, Sell, And Discover Exclusive Digital Assets.
          </p>
          <div className="flex pt-5 gap-x-5">
            <button className="py-2 px-10 text-2xl rounded-full text-white bg-emerald-700 focus:ring-2 focus:ring-emerald-500">
              Create
            </button>
            <NavLink
              to="/gallery"
              className="py-2 px-10 text-2xl rounded-full text-white bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
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
  );
};

export default Home;
