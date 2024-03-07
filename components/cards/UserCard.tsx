"use client";

import { getTopInteractedTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/RenderTag";
import { useEffect, useState } from "react";

interface UserProps {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

//! Using async in the component function directly:

//* Pros:
// Simplifies code structure by directly fetching data in the component function.
// Allows for more straightforward control flow.

//* Cons:
// Can lead to potential issues during server-side rendering (SSR) and client-side hydration, as Next.js expects components to be synchronous.
// May result in slower initial rendering if data fetching delays component rendering.

//! Using async within a useEffect hook:

//* Pros:
// Helps prevent hydration issues by fetching data only on the client side.
// Ensures that the component renders synchronously during SSR and hydration, improving performance.

//* Cons:
// Requires additional code complexity with the use of useEffect and conditional checks.
// Can lead to less straightforward control flow, especially in more complex scenarios.

const UserCard = ({ user }: UserProps) => {
  //!   This 'useState' and 'useEffect' logic is being used to prevent hydration because Next.js expects components to be synchronous, but you're using async in your component definition which could cause issues during server-side rendering (SSR) and client-side hydration.
  // TODO: Remove this Logic if needed in future
  const [interactedTags, setInteractedTags] = useState<
    { _id: number; name: string }[]
  >([]);

  useEffect(() => {
    // Fetch data only on the client side
    if (typeof window !== "undefined") {
      const fetchInteractedTags = async () => {
        const tags = await getTopInteractedTags({ userId: user._id });
        setInteractedTags(tags);
      };
      fetchInteractedTags();
    }
  }, [user._id]);

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light200_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex-center w-full flex-col rounded-2xl border p-8 ">
        {/* Image */}
        <Image
          src={user.picture}
          alt="user profile picture"
          width={100}
          height={100}
          className="rounded-full"
        />

        {/*  Name and UserName */}
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-5">
          {interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No Tags Yet</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
