import { useEffect, useState } from "react";

import WalletButton from "../../components/WalletButton";

import {
  connectWallet,
  getCurrentWalletConnected,
  requestSwitchNetwork,
} from "../../utils/interactWeb3";

import { getChain } from "../../utils/chainList";

import { ReactComponent as LoadingBricks } from "../../assets/icon/LoadingBricks.svg";
import { ReactComponent as Metamask } from "../../assets/icon/Metamask.svg";
import { ReactComponent as WalletConnect } from "../../assets/icon/WalletConnect.svg";

const Room = () => {
  const [loading, setLoading] = useState(true);
  const [walletAddress, setWallet] = useState("");
  const [chainId, setChainId] = useState("");
  //   const [status, setStatus] = useState("");

  useEffect(async () => {
    const { address, chainId } = await getCurrentWalletConnected();
    setLoading(false);
    setWallet(address);
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
  };
  return (
    <div className="container mx-auto flex flex-col pt-10 px-2 lg:px-0 fade-in">
      <div className="subheader my-10">
        <h1 className="block text-center">You Own Room</h1>
      </div>
      {!loading && (
        <div className="flex flex-col lg:flex-row gap-y-2 gap-x-5 justify-center mb-5">
          {window.ethereum && (
            <button
              className={
                "fade-in relative mb-10 mx-auto py-2 px-10 text-2xl rounded-full text-white focus:ring-2 " +
                (walletAddress.length === 0 ||
                !getChain(window.ethereum.chainId).valid
                  ? "bg-red-500 focus:ring-red-500"
                  : "bg-emerald-500 focus:ring-emerald-500")
              }
              onClick={connectWalletPressed}
            >
              {walletAddress.length > 0
                ? `Connected: 
            ${String(walletAddress).substring(0, 6)}...${String(
                    walletAddress
                  ).substring(38)} 
            (${getChain(window.ethereum.chainId).name})`
                : `Connect Wallet`}
              {!getChain(window.ethereum.chainId).valid &&
                walletAddress.length !== 0 && (
                  <span
                    className="absolute whitespace-nowrap -top-6 -right-10 flex items-center text-4xs tracking-wide w-auto left-1/2s transforms -translate-x-1/2s bg-white hover:bg-slate-300 shadow pt-0.5 px-2 rounded-sm text-red-500"
                    onClick={() => requestSwitchNetwork("0x1")}
                  >
                    Switch to Mainnet
                  </span>
                )}
            </button>
          )}
          {window.ethereum === undefined && (
            <>
              <WalletButton
                text="WalletConnect"
                detail="Scan with WalletConnect to connect"
                clickHandler={connectWalletPressed}
                icon={<WalletConnect className="w-20 h-20 my-6 mx-6" />}
              />
              <WalletButton
                text="Install MetaMask"
                detail="Start exploring blockchain applications in seconds.  Trusted by over 10 million users worldwide."
                clickHandler={() => {
                  window.open(
                    "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
                    "_blank"
                  );
                }}
                icon={<Metamask className="w-32 h-32" />}
              />
            </>
          )}
        </div>
      )}
      {loading && (
        <div>
          <LoadingBricks className="w-32 h-32" />
        </div>
      )}
    </div>
  );
};

export default Room;
