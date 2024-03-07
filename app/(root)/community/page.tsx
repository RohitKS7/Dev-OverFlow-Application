// "use client";

import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";

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

const Community = async () => {
  const usersList = await getAllUsers({});

  return (
    <>
      {/* HEADING */}
      <h1 className="h1-bold text-dark100_light900"> All Users </h1>

      {/* SEARCH and FILTER */}
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col ">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />

        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {usersList.users.length > 0 ? (
          usersList.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join! to be the first
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Community;
