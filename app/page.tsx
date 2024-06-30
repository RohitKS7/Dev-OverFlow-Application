import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProjectLinks {
  imgURL: string;
  projectlink: string;
  codelink: string;
  label: string;
  type: string;
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
];

const socialLinks: SocialLinks[] = [
  {
    imgURL: "/assets/icons/github-gray.svg",
    link: "https://twitter.com/SumanRohitK7",
    label: "Github",
  },
  {
    imgURL: "/assets/icons/linkedIn-gray.svg",
    link: "https://linkedin.com/in/rohit-kumar-suman",
    label: "LinkedIn",
  },
  {
    imgURL: "/assets/icons/twitterX-gray.svg",
    link: "https://github.com/RohitKS7",
    label: "twitterX",
  },
];
const IntroPage = () => {
  return (
    <main className="flex-center min-h-screen w-full bg-[#ffdada] ">
      {/* Floating Container */}
      <div className="intro-shadow relative  flex w-full max-w-[70vw] flex-col items-center justify-between gap-8 overflow-hidden  bg-[#f8f8ff]">
        {/* Creator & Project Name */}
        <div className="flex-center mt-4 flex-col gap-6">
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
          <p className="body-regular max-w-[75%] text-gray-700">
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
          <div className="body-regular text-gray-700">
            Explore the
            <Link
              href="/home"
              className="h3-semibold mx-2 cursor-pointer capitalize text-primary-500 underline hover:text-gray-700"
            >
              Application
            </Link>
          </div>
        </div>
        {/* ⁡⁣⁢⁣More Projects Link⁡ */}
        <div className="flex-center flex-col gap-6">
          <div className="h3-semibold text-gray-500">More Projects By Me :</div>

          <div className="flex flex-1 items-end justify-center gap-8">
            {projectLinks.map((item) => (
              <div
                key={item.label + item.projectlink}
                className="flex cursor-pointer flex-col items-center justify-between gap-8  bg-[#ffdada] px-3 pt-3"
              >
                <div className="flex-center max-w-40 flex-col gap-3">
                  <Link
                    href={item.codelink}
                    className="body-semibold group relative w-full text-center text-gray-700"
                  >
                    <div>
                      {item.label}
                      <p className="mt-[2px]">{item.type}</p>
                      <div className="paragraph-semibold project-hover-shadow absolute inset-x-0 top-[-40px] flex items-end justify-center bg-[#ffdada] p-[5px] text-gray-700 opacity-0 duration-300 group-hover:opacity-100">
                        Code
                      </div>
                    </div>
                  </Link>
                  <Link href={item.projectlink} className="group relative">
                    <Image
                      src={item.imgURL}
                      alt={item.label}
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                    <div
                      className="paragraph-semibold absolute inset-x-0 bottom-0 flex items-end justify-center bg-[#ffdada]
text-gray-700 opacity-0 duration-300 group-hover:opacity-100"
                    >
                      Website
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ⁡⁣⁢⁣Social Links⁡ */}
        <div className="absolute right-0 top-[35%]">
          {socialLinks.map((item) => (
            <Link
              key={item.imgURL}
              href={item.link}
              className="flex-center cursor-pointer flex-col"
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={30}
                height={30}
                className="my-1 object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default IntroPage;
