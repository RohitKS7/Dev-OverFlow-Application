import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/actions/user.action";
import { formatTimestamp } from "@/lib/utils";
import { URLProps } from "@/types";
import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = async ({ params, searchParams }: URLProps) => {
  // 𝘳𝘦𝘯𝘢𝘮𝘪𝘯𝘨 '𝘶𝘴𝘦𝘳𝘐𝘥' 𝘵𝘰 '𝘤𝘭𝘦𝘳𝘬𝘐𝘥'
  const { userId: clerkId } = auth();
  const userInfo = await getUserInfo({ userId: params.id });

  const formattedDateWithMonthYear = formatTimestamp(
    userInfo?.user.joinedAt,
    true
  );
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        {/* ⁡⁣⁢⁣𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢⁡ */}
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userInfo?.user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />
          {/* ⁡⁣⁣⁢NAME, USERNAME, BIO, LOCATION, ⁡⁣⁣⁢JOINED AT⁡⁡ */}
          <div className="mt-3">
            {/* ⁡⁢⁣⁣Name⁡ */}
            <h2 className="h2-bold text-dark100_light900">
              {userInfo?.user.name}
            </h2>
            {/* ⁡⁢⁣⁣Username⁡ */}
            <p className="paragraph-regular text-dark200_light800">
              @{userInfo?.user.username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {/* ⁡⁢⁣⁣𝘓𝘰𝘤𝘢𝘵𝘪𝘰𝘯⁡ */}
              {userInfo?.user.location && <>location</>}
              {/* ⁡⁢⁣⁣𝘑𝘰𝘪𝘯𝘦𝘥 𝘈𝘵⁡⁡ */}
              <div className="flex-center gap-1">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="Joined At"
                  width={20}
                  height={20}
                />
                <p className="paragraph-medium text-dark400_light700">
                  Joined {formattedDateWithMonthYear}
                </p>
              </div>
              {/* ⁡⁢⁣⁣𝘉𝘪𝘰⁡ */}
              {userInfo?.user.bio && <p>{userInfo?.user.bio}</p>}
            </div>
          </div>
        </div>

        {/* ⁡⁣⁢⁣𝗘𝗗𝗜𝗧 𝗕𝗨𝗧𝗧𝗢𝗡⁡ */}
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          {/* ⁡⁣⁢⁡⁣⁣⁢If the user is signedIn only then show this element⁡ */}
          <SignedIn>
            {/* If the clerkId of logged-in user is equal to the clerkId of profile page's user. Basically it means the logged-in user is currently on thier's profile details page */}
            {/* 𝗜𝗳 𝘁𝗵𝗮𝘁'𝘀 𝘁𝗵𝗲 𝗰𝗮𝘀𝗲 𝘁𝗵𝗲𝗻 𝘀𝗵𝗼𝘄 𝗘𝗗𝗜𝗧 𝗼𝗽𝘁𝗶𝗼𝗻 */}
            {clerkId === userInfo?.user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3 ">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      Stats
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1 ">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">Posts</TabsContent>
          <TabsContent value="answers">Answers</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
