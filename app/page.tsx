import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProjectLinks {
  imgURL: string;
  projectlink: string;
  codelink: string;
  label: string;
}

interface SocialLinks {
  imgURL: string;
  link: string;
  label: string;
}

const projectLinks: ProjectLinks[] = [
  {
    imgURL: "/assets/images/shopit.png",
    projectlink: "https://shopit-admin-dashboard.vercel.app/",
    codelink: "https://github.com/RohitKS7/Admin_Dashboard",

    label: "ShopIt",
  },
  {
    imgURL: "/assets/images/metaversus.png",
    projectlink: "https://metaversus-by-rohit.vercel.app/",
    codelink: "https://bootstraphub.com/RohitKS7/Metaverse-Modern-NEXT-13-Site",

    label: "Metaversus",
  },
  {
    imgURL: "/assets/images/nft-game.png",
    projectlink: "https://rohit-nft-card-game.vercel.app/",
    codelink: "https://github.com/RohitKS7/NFT_card_game",
    label: "NFT Card Game (Web3)",
  },
  {
    imgURL: "/assets/images/crowdfunding.png",
    projectlink: "https://crowdfunding-by-rohit.netlify.app/",
    codelink: "https://github.com/RohitKS7/Crowd-Funding-Web3-App",
    label: "CrowdFunding (Web3)",
  },
];

const socialLinks: SocialLinks[] = [
  {
    imgURL: "/assets/icons/github.svg",
    link: "https://twitter.com/SumanRohitK7",
    label: "Github",
  },
  {
    imgURL: "/assets/icons/linkedin.svg",
    link: "https://linkedin.com/in/rohit-kumar-suman",
    label: "LinkedIn",
  },
  {
    imgURL: "/assets/icons/twitterX.svg",
    link: "https://github.com/RohitKS7",
    label: "twitterX",
  },
];
const IntroPage = () => {
  return (
    <main className="flex-center min-h-screen w-full bg-[#ffdada] ">
      {/* Floating Container */}
      <div className="intro-shadow relative  flex h-[75dvh] w-full max-w-[75vw] flex-col items-center justify-around gap-8 bg-white">
        {/* Creator & Project Name */}
        <div className="flex-center flex-col gap-6">
          <Link href="/home" className="mt-4 flex items-center gap-3">
            <Image
              src="/assets/images/site-logo.svg"
              width={50}
              height={50}
              alt="DevOverflow"
            />

            <p className="cursor-pointer font-spaceGrotesk text-4xl font-bold text-gray-500">
              Dev <span className="text-primary-500">Overflow</span>
            </p>
          </Link>
          <p className="paragraph-medium max-w-[75%] text-gray-700">
            DevOverflow is a complex Next.js 14 app that exhibits Q&A platform
            for developers to ask questions, share knowledge, and learn from
            each other.
          </p>
          <p className="h3-semibold text-gray-500 ">
            Created By -
            <span className=" h1-bold mx-2 text-primary-500">
              Rohit Kumar Suman
            </span>
          </p>
          {/* ⁡⁣⁢⁣Link to HomePage⁡ */}
          <div className="paragraph-medium text-gray-700">
            Explore the
            <Link
              href="/home"
              className="h2-semibold mx-2 cursor-pointer capitalize text-primary-500 underline hover:text-gray-700"
            >
              Application
            </Link>
          </div>
        </div>
        {/* ⁡⁣⁢⁣Social Links⁡ */}
        <div className="absolute right-0">
          {socialLinks.map((item) => (
            <Link
              key={item.imgURL}
              href={item.link}
              className="flex-center cursor-pointer flex-col"
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={50}
                height={50}
                className="object-contain"
              />
            </Link>
          ))}
        </div>
        {/* ⁡⁣⁢⁣More Projects Link⁡ */}
        <div className="flex-center flex-col gap-6">
          <div className="h3-semibold text-gray-500">More Projects By Me :</div>

          <div className="flex flex-1 items-start justify-center gap-8">
            {projectLinks.map((item) => (
              <div
                key={item.label + item.projectlink}
                className="flex cursor-pointer flex-col items-center justify-between gap-8"
              >
                <div className="flex-center max-w-40 flex-col gap-3">
                  <Link href={item.projectlink}>
                    <Image
                      src={item.imgURL}
                      alt={item.label}
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </Link>
                  <Link
                    href={item.codelink}
                    className="paragraph-medium mx-4 text-gray-700"
                  >
                    {item.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default IntroPage;
