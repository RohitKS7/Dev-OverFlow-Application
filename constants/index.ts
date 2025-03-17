import { ProjectLinks, SidebarLink, SocialLinks } from "@/types";

// themes
export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

// laptop view sidebar links
export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/home",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const socialLinks: SocialLinks[] = [
  {
    imgURL: "/assets/icons/github.svg",
    link: "https://github.com/RohitKS7",

    label: "Github",
  },
  {
    imgURL: "/assets/icons/linkedin.svg",
    link: "https://linkedin.com/in/rohit-kumar-suman",
    label: "LinkedIn",
  },
  {
    imgURL: "/assets/icons/twitterx.svg",
    link: "https://twitter.com/SumanRohitK7",
    label: "twitterX",
  },
];

export const projectLinks: ProjectLinks[] = [
  {
    imgURL: "/assets/images/shopit.png",
    projectlink: "https://shopit-admin-dashboard.vercel.app/",
    codelink: "https://github.com/RohitKS7/Admin_Dashboard",
    label: "ShopIt",
    type: "(Web2)",
  },
  {
    imgURL: "/assets/images/metaversus.png",
    projectlink: "https://metaversus-by-rohit.vercel.app/",
    codelink: "https://bootstraphub.com/RohitKS7/Metaverse-Modern-NEXT-13-Site",
    label: "Metaversus",
    type: "(Web2)",
  },
  {
    imgURL: "/assets/images/nft-game.png",
    projectlink: "https://rohit-nft-card-game.vercel.app/",
    codelink: "https://github.com/RohitKS7/NFT_card_game",
    label: "NFT Card Game",
    type: "(Web3)",
  },
  {
    imgURL: "/assets/images/crowdfunding.png",
    projectlink: "https://crowdfunding-by-rohit.netlify.app/",
    codelink: "https://github.com/RohitKS7/Crowd-Funding-Web3-App",
    label: "CrowdFunding",
    type: "(Web3)",
  },
  {
    imgURL: "/assets/images/cryptoverse.png",
    projectlink: "https://cryptoverse-by-rohit.vercel.app/",
    codelink: "https://github.com/RohitKS7/Cryptoverse",
    label: "Cryptoverse",
    type: "(Web2)",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 5,
    SILVER: 10,
    GOLD: 15,
  },
  ANSWER_COUNT: {
    BRONZE: 5,
    SILVER: 10,
    GOLD: 15,
  },
  QUESTION_UPVOTES: {
    BRONZE: 5,
    SILVER: 10,
    GOLD: 15,
  },
  ANSWER_UPVOTES: {
    BRONZE: 5,
    SILVER: 10,
    GOLD: 15,
  },
  TOTAL_VIEWS: {
    BRONZE: 50,
    SILVER: 80,
    GOLD: 100,
  },
};
