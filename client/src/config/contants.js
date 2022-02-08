import { createAlchemyWeb3 } from "@alch/alchemy-web3";

export const PAGE_LINKS = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Gallery",
    link: "/gallery",
  },
  {
    text: "My Room",
    link: "/room",
  },
  {
    text: "Updates",
    link: "/invoices",
  },
  {
    text: "About US",
    link: "/",
  },
];

export const SOCIAL_LINKS = [
  {
    text: "twitter",
    icon: "fas fa-discord",
    href: "https://twitter.com",
    hover: "Twitter",
  },
  {
    text: "discord",
    icon: "fas fa-discord",
    href: "http://discord.gg/azuki",
    hover: "Discord",
  },
  {
    text: "instagram",
    icon: "fas fa-discord",
    href: "https://www.instagram.com/airseekr/?hl=en",
    hover: "Instagram",
  },
  { text: "opensea", icon: "fas fa-discord", href: "", hover: "Opensea" },
];

export const LOGO_WEBP = require("../assets/logo.webp");

export const AZUKI_URI =
  "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/";

export const ALCHEMY_URL =
  "https://eth-rinkeby.alchemyapi.io/v2/GVk1Bj0Az_4igUYW8syP7APSSJwI6GeP";
export const ALCHEMY_WS_URL =
  "wss://eth-rinkeby.ws.alchemyapi.io/ws/GVk1Bj0Az_4igUYW8syP7APSSJwI6GeP";

export const alchemy_web3 = createAlchemyWeb3(ALCHEMY_WS_URL);
