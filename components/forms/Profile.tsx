"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ProfileSchema } from "@/lib/validations";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.action";
import { useToast } from "../ui/use-toast";

interface Props {
  clerkId: string;
  user: string;
}

const Profile = ({ clerkId, user }: Props) => {
  const { toast } = useToast();
  const parsedUser = JSON.parse(user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  // ⁡⁣⁢⁣𝟭. 𝗗𝗲𝗳𝗶𝗻𝗲 𝘆𝗼𝘂𝗿 𝗳𝗼𝗿𝗺.⁡
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: parsedUser.name || "",
      username: parsedUser.username || "",
      portfolioWebsite: parsedUser.portfolioWebsite || "",
      location: parsedUser.location || "",
      bio: parsedUser.bio || "",
    },
  });

  // ⁡⁣⁢⁣𝟮. 𝗗𝗲𝗳𝗶𝗻𝗲 𝗮 𝘀𝘂𝗯𝗺𝗶𝘁 𝗵𝗮𝗻𝗱𝗹𝗲𝗿.⁡
  // ✅ 𝘛𝘩𝘪𝘴 𝘸𝘪𝘭𝘭 𝘣𝘦 𝘵𝘺𝘱𝘦-𝘴𝘢𝘧𝘦 𝘢𝘯𝘥 𝘷𝘢𝘭𝘪𝘥𝘢𝘵𝘦𝘥.
  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    setIsSubmitting(true);

    try {
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolioWebsite: values.portfolioWebsite,
          location: values.location,
          bio: values.bio,
        },
        path: pathName,
      });

      // 𝘚𝘩𝘰𝘸 𝘴𝘶𝘤𝘤𝘦𝘴𝘴 𝘵𝘰𝘢𝘴𝘵 𝘯𝘰𝘵𝘪𝘧𝘪𝘤𝘢𝘵𝘪𝘰𝘯
      toast({
        title: "Profile updated successfully",
        variant: "default",
      });
      router.back();
    } catch (error) {
      console.log(error);

      // 𝘚𝘩𝘰𝘸 𝘦𝘳𝘳𝘰𝘳 𝘵𝘰𝘢𝘴𝘵 𝘯𝘰𝘵𝘪𝘧𝘪𝘤𝘢𝘵𝘪𝘰𝘯
      toast({
        title: "Error updating profile",
        variant: "destructive",
      });

      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-9 flex w-full flex-col gap-9"
      >
        {/* ⁡⁣⁢⁣𝗡𝗔𝗠𝗘 𝗙𝗼𝗿𝗺-𝗙𝗶𝗲𝗹𝗱⁡ */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="paragraph-semibold text-gray700_light800">
                Name <span className="text-primary-500">*</span>
              </FormLabel>

              <FormControl>
                <Input
                  className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-gray700_light700 min-h-[56px] border"
                  placeholder="Your Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* USERNAME */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="paragraph-semibold text-gray700_light800">
                Username <span className="text-primary-500">*</span>
              </FormLabel>

              <FormControl>
                <Input
                  className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-gray700_light700 min-h-[56px] border"
                  placeholder="Your Username"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* PORTFOLIO WEBSITE */}
        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="paragraph-semibold text-gray700_light800">
                Portfolio Link
              </FormLabel>

              <FormControl>
                <Input
                  type="url"
                  className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-gray700_light700 min-h-[56px] border"
                  placeholder="Your portfolio link"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* LOCATION */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="paragraph-semibold text-gray700_light800">
                Location
              </FormLabel>

              <FormControl>
                <Input
                  className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-gray700_light700 min-h-[56px] border"
                  placeholder="where are you from?"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* BIO */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="paragraph-semibold text-gray700_light800">
                About You
              </FormLabel>

              <FormControl>
                <Textarea
                  className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-gray700_light700 min-h-[56px] border"
                  placeholder="what's special about your?"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-7 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Profile;
