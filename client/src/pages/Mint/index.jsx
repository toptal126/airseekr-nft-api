import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { getCurrentWalletConnected } from "../../utils/interactWeb3";

import BannerImage from "../../assets/banner.png";

const Mint = () => {
  const [walletAddress, setWallet] = useState("");
  useEffect(async () => {
    const { address, chainId } = await getCurrentWalletConnected();
    setWallet(address);
  }, []);

  const onMintPressed = () => {
    alert(walletAddress);
  };

  return (
    <div className="container mx-auto flex flex-col pt-10 fade-in">
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full">
          <div className="p-5">
            <h1>Mint Your Unique ONE!</h1>
            <p className="text-2xl pt-5">
              Digital Marketplace For Crypto Collectibles And Non-Fungible
              Tokens. Buy, Sell, And Discover Exclusive Digital Assets.
            </p>
            <div className="flex pt-5 gap-x-5">
              <button
                className="round-button bg-emerald-700 focus:ring-emerald-500"
                onClick={onMintPressed}
              >
                Mint
              </button>
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
