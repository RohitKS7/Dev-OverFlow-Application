import Profile from "@/components/forms/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";

const page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className="h1-bold text-gray500_light900">Edit Profile</h1>

      <div className="mt-9">
        <Profile
          clerkId={userId}
          user={JSON.stringify(mongoUser)} // 𝘱𝘢𝘴𝘴𝘪𝘯𝘨 𝘮𝘰𝘯𝘨𝘰𝘋𝘉 𝘤𝘰𝘮𝘱𝘭𝘦𝘹 𝘥𝘢𝘵𝘢(𝘖𝘣𝘦𝘫𝘤𝘵) 𝘢𝘧𝘵𝘦𝘳 𝘴𝘵𝘳𝘪𝘯𝘨𝘪𝘧𝘺𝘪𝘯𝘨 𝘵𝘰 𝘢𝘷𝘰𝘪𝘥 𝘤𝘰𝘯𝘴𝘰𝘭𝘦 𝘸𝘢𝘳𝘯𝘪𝘯𝘨 𝘴𝘢𝘺𝘪𝘯𝘨 "𝘤𝘢𝘯'𝘵 𝘱𝘢𝘴𝘴 𝘤𝘰𝘮𝘱𝘭𝘦𝘹 𝘫𝘢𝘷𝘢𝘴𝘤𝘳𝘪𝘱𝘵 𝘰𝘣𝘫𝘦𝘤𝘵 𝘵𝘰 𝘤𝘭𝘪𝘦𝘯𝘵 𝘤𝘰𝘮𝘱𝘰𝘯𝘦𝘯𝘵"
        />
      </div>
    </>
  );
};

export default page;
