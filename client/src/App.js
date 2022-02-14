import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routers from "./config/routers";
import ColorThemeToggler from "./components/ColorThemeToggler";

import {
  subscribeEvent,
  getCurrentWalletConnected,
  getSaleStatus,
  getTotalSupply,
} from "./utils/interactWeb3";
import { notifyEvent } from "./utils/toast";
import { shortenAddress, wei2Eth } from "./utils/favor";
import { useStore } from "./utils/store";

import { ReactComponent as BounceInfo } from "./assets/icon/BounceInfo.svg";
import { ReactComponent as BounceCheck } from "./assets/icon/BounceCheck.svg";

function App() {
  const web3Util = useStore((state) => state.web3Util);
  const setSaleStatus = useStore((state) => state.setSaleStatus);
  const setWeb3Util = useStore((state) => state.setWeb3Util);
  const setMyTokens = useStore((state) => state.setMyTokens);
  const setTotalSupply = useStore((state) => state.setTotalSupply);
  const galleryData = useStore((state) => state.galleryData);

  const transferHandler = ({ from, to, tokenId }) => {
    // Mint
    if (from === "0x0000000000000000000000000000000000000000") {
      notifyEvent(
        "info",
        <BounceInfo className="w-16 h-16" />,
        `🎂 AZK #${tokenId} was born!`,
        `${shortenAddress(to)} gave birth to AZK #${tokenId}`
      );
      setTotalSupply(galleryData.totalSupply + 1);
      if (to === web3Util.address)
        setMyTokens({ ...galleryData.myTokens, tokenId });
    }
  };
  const saleStatusHandler = ({ isSaleActive }) => {
    isSaleActive = !isSaleActive;
    notifyEvent(
      isSaleActive ? "success" : "info",
      isSaleActive ? (
        <BounceCheck className="w-16 h-16" />
      ) : (
        <BounceInfo className="w-16 h-16" />
      ),
      isSaleActive ? "⛏️ The Minting Activated!" : "🚫 The Minting Paused!",
      isSaleActive
        ? "The sale is just activated NOW!"
        : "The sale is just paused!"
    );
    getSaleStatus().then((data) => {
      setSaleStatus(data);
    });
  };
  const preSaleStatusHandler = ({ isPresaleActive }) => {
    notifyEvent(
      isPresaleActive ? "success" : "info",
      isPresaleActive ? (
        <BounceCheck className="w-16 h-16" />
      ) : (
        <BounceInfo className="w-16 h-16" />
      ),
      isPresaleActive ? "🔓 The Presale is Open!" : "🔒 The presale is closed!",
      isPresaleActive
        ? "The presale is just activated NOW!"
        : "The presale is just finished!"
    );

    getSaleStatus().then((data) => {
      setSaleStatus(data);
    });
  };
  const publicSaleStatusHandler = ({ isPublicsaleActive }) => {
    notifyEvent(
      isPublicsaleActive ? "success" : "info",
      isPublicsaleActive ? (
        <BounceCheck className="w-16 h-16" />
      ) : (
        <BounceInfo className="w-16 h-16" />
      ),
      isPublicsaleActive
        ? "🔓 Public sale is Open!"
        : "🔒 Public sale is closed!",
      isPublicsaleActive
        ? "The public sale is just activated NOW!"
        : "The public sale is just finished!"
    );
    getSaleStatus().then((data) => {
      setSaleStatus(data);
    });
  };
  const bettingHandler = ({ holder, tokenId, price, betted }) => {
    notifyEvent(
      betted ? "success" : "info",
      <BounceInfo className="w-16 h-16" />,
      betted
        ? `⚔️ AZK #${tokenId} was betted at ${wei2Eth(price)}!`
        : `💨 AZK #${tokenId}! was retreated`,
      betted
        ? "Let's go to win the 2 X REWARD!"
        : `You can no longer see AZK #${tokenId} at betting list!`
    );
  };
  const finishedBettingHandler = ({
    staker,
    challenger,
    stakedTokenId,
    challengedTokenId,
    challengerWined,
    reward,
  }) => {
    const winner = shortenAddress(challengerWined ? challenger : staker);
    const loser = shortenAddress(!challengerWined ? challenger : staker);
    const winnerId = challengerWined ? challengedTokenId : stakedTokenId;
    const loserId = !challengerWined ? challengedTokenId : stakedTokenId;
    notifyEvent(
      "success",
      <BounceInfo className="w-16 h-16" />,
      `AZK #${winnerId} 🆚 AZK #${loserId} !`,
      `🏆 ${winner} + ${wei2Eth(reward)}  ${loser}`
    );
  };
  const eventHandler = (event) => {
    console.log(event);
    if (event.event === "Transfer") transferHandler(event.returnValues);
    if (event.event === "SaleStatus") saleStatusHandler(event.returnValues);
    if (event.event === "PreSaleStatus")
      preSaleStatusHandler(event.returnValues);
    if (event.event === "PublicSaleStatus")
      publicSaleStatusHandler(event.returnValues);
    if (event.event === "Betting") bettingHandler(event.returnValues);
    if (event.event === "FinishedBetting")
      finishedBettingHandler(event.returnValues);
  };
  useEffect(() => {
    if (web3Util.status === false) {
      getCurrentWalletConnected().then((data) => {
        setWeb3Util(data);
      });
      getTotalSupply().then((data) => {
        setTotalSupply(data.totalSupply);
      });
    }
    subscribeEvent(eventHandler);
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
