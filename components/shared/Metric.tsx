import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}: MetricProps) => {
  // it's this component's content to make optional rendering of clickable and non-clickable component.
  const metricContent = (
    <>
      <div className="relative size-[16px] overflow-hidden">
        <Image
          fill
          src={imgUrl}
          alt={alt}
          // * "href" = if it's a link
          className={`object-cover ${href ? "rounded-full" : ""}`}
        />
      </div>

      <p className={`${textStyles} flex items-center gap-1`}>
        {value}

        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );

  // If the component have href link then provide a Link for that component
  /* CLICKABLE COMPONENTS HERE */
  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {metricContent}
      </Link>
    );
  }

  // this will work for unclickable components like 'votes', 'answers' and 'views' but not for author because it have a lin, but we can't turn the whole component into a link. This is why we have to define the component above as separate content
  /* NON-CLICKABLE COMPONENTS HERE */
  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};

export default Metric;
