// 80% 𝘰𝘧 𝘵𝘩𝘦 𝘤𝘰𝘥𝘦 𝘱𝘳𝘦𝘴𝘦𝘯𝘵 𝘩𝘦𝘳𝘦 𝘪𝘴 𝘵𝘢𝘬𝘦𝘯 𝘧𝘳𝘰𝘮 𝘚𝘩𝘢𝘥𝘊𝘕 𝘧𝘰𝘳𝘮 𝘤𝘰𝘮𝘱𝘰𝘯𝘦𝘯𝘵
"use client";

// ⁡⁣⁢⁣𝗜𝗠𝗣𝗢𝗥𝗧𝗦⁡
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// Zod is a TypeScript-first schema declaration and validation library. The goal is to eliminate duplicative type declarations
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { QuestionsSchema } from "@/lib/validations";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeProvider";

// ⁡⁣⁢⁣𝗣𝗥𝗢𝗣𝗦⁡
interface Props {
  type?: string;
  mongoUserId: string;
  questionDetails?: string;
}

// ⁡⁣⁢⁣𝗠𝗔𝗜𝗡 𝗖𝗢𝗠𝗣𝗢𝗡𝗘𝗡𝗧⁡
const Question = ({ type, mongoUserId, questionDetails }: Props) => {
  const { mode } = useTheme();
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  // ⁡⁣⁣⁢Question Details to pre-populate the form field in case of Editing⁡
  const parsedQuestionDetails =
    questionDetails && JSON.parse(questionDetails || "");
  const groupedTags = parsedQuestionDetails?.tags.map(
    (tag: { name: any }) => tag.name
  );

  // ! ⁡⁣⁢⁣𝟭⁡⁣⁢⁣.⁡ ⁡⁣⁣⁢Define your form.⁡
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: parsedQuestionDetails?.title || "",
      explanation: parsedQuestionDetails?.content || "",
      tags: groupedTags || [],
    },
  });

  // ! ⁡⁣⁢⁣𝟮.⁡ ⁡⁣⁣⁢Define a submit handler⁡.
  async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    // 𝘴𝘦𝘵𝘐𝘴𝘚𝘶𝘣𝘮𝘪𝘵𝘵𝘪𝘯𝘨 𝘢𝘭𝘭𝘰𝘸𝘴 𝘶𝘴 𝘵𝘰 𝘱𝘳𝘦𝘴𝘴 𝘰𝘶𝘳 𝘴𝘶𝘣𝘮𝘪𝘵 𝘣𝘶𝘵𝘵𝘰𝘯 𝘴𝘦𝘤𝘰𝘯𝘥 𝘵𝘪𝘮𝘦 𝘢𝘯𝘥 𝘤𝘢𝘶𝘴𝘦 𝘴𝘰𝘮𝘦 𝘤𝘩𝘢𝘰𝘴 𝘪𝘯 𝘰𝘶𝘳 𝘥𝘢𝘵𝘢𝘣𝘢𝘴𝘦
    setIsSubmitting(true);

    try {
      if (type === "Edit") {
        await editQuestion({
          questionId: parsedQuestionDetails._id,
          title: values.title,
          content: values.explanation,
          path: pathName,
        });

        router.push(`/question/${parsedQuestionDetails._id}`);
      } else {
        // 𝘮𝘢𝘬𝘦 𝘢𝘯 𝘢𝘴𝘺𝘯𝘤 𝘤𝘢𝘭𝘭 𝘵𝘰 𝘺𝘰𝘶𝘳 𝘈𝘗𝘐(𝘣𝘢𝘤𝘬𝘦𝘯𝘥) -> 𝘵𝘰 𝘤𝘳𝘦𝘢𝘵𝘦 𝘢 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯
        // 𝘸𝘩𝘪𝘤𝘩 𝘤𝘰𝘯𝘵𝘢𝘪𝘯 𝘢𝘭𝘭 𝘧𝘰𝘳𝘮 𝘥𝘢𝘵𝘢
        await createQuestion({
          // 𝘤𝘰𝘮𝘪𝘯𝘨 𝘥𝘪𝘳𝘦𝘤𝘵𝘭𝘺 𝘧𝘳𝘰𝘮 𝘛𝘪𝘵𝘭𝘦 𝘧𝘪𝘦𝘭𝘥 𝘰𝘧 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯 𝘧𝘰𝘳𝘮
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          //   𝘔𝘢𝘬𝘦 𝘢 𝘳𝘦𝘲𝘶𝘦𝘴𝘵 𝘤𝘢𝘭𝘭 𝘵𝘰 𝘵𝘩𝘦 𝘥𝘢𝘵𝘢𝘣𝘢𝘴𝘦 𝘵𝘰 𝘳𝘦𝘵𝘳𝘪𝘷𝘦 𝘵𝘩𝘦 𝘶𝘴𝘦𝘳𝘋𝘢𝘵𝘢 𝘧𝘰𝘳 𝘢𝘶𝘵𝘩𝘰𝘳
          author: JSON.parse(mongoUserId),
          path: pathName,
        });
        // 𝘈𝘧𝘵𝘦𝘳 𝘵𝘩𝘢𝘵 𝘯𝘢𝘷𝘪𝘨𝘢𝘵𝘦 𝘣𝘢𝘤𝘬 𝘵𝘰 𝘩𝘰𝘮𝘦 𝘱𝘢𝘨𝘦 𝘵𝘰 𝘴𝘦𝘦 𝘵𝘩𝘦 𝘤𝘳𝘦𝘢𝘵𝘦𝘥 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  // ! ⁡⁣⁢⁣𝗛𝗮𝗻𝗱𝗹𝗲 𝗧𝗮𝗴𝘀 𝗢𝘂𝘁𝗽𝘂𝘁 𝗙𝘂𝗻𝗰𝘁𝗶𝗼𝗻⁡
  const handleInputKeyDown = (
    // type of `e` is keyboardEvent specifically `HTMLInputElement`
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      // prevent page refresh
      e.preventDefault();

      // Get the target (the input itself) (the value we put in input field)
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          // set an error message on 'tags' field
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }

        if (field.value.includes(tagValue)) {
          return form.setError("tags", {
            type: "required",
            message: "Duplicate tags are not allowed, Please enter a new tag.",
          });
        }

        // checking for existing tag values, if it's already exist than never add a same tag again
        if (!field.value.includes(tagValue as never)) {
          // if the value is not there then append that tagvalue
          form.setValue("tags", [...field.value, tagValue]);
          // reset the input field for adding more tags
          tagInput.value = "";
          // clear the error on tags field if there is any
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  // ! ⁡⁣⁢⁣Handle Tag Removing function (iss function me hum bol rahe hai ki hum tag ko remove kr rahe hai pr reality me hum ek new array create kr rahe hai aur clicked tag ko add nahi kr rahe hai) This is called `reverse-engineering`.⁡
  const handleTagRemove = (tag: string, field: any) => {
    // First we must figure out how remove only the tag we click-on and we mustn't mutate the state directly here (meaning we shouldn't mutate the original array of tags but instead create a copy of that array and make change in it)
    const newTags = field.value.filter((t: string) => t !== tag);
    // explaination of above line:- This line is spitting a new array after filtering the tag we clicked meaning this array will not include the clicked tag and spits the remaining tags in an arrya which we will append in our existing tags array

    console.log(newTags);
    form.setValue("tags", newTags);
  };

  // ⁡⁣⁢⁣𝗥𝗲𝘁𝘂𝗿𝗻 𝘁𝗵𝗲 𝗰𝗼𝗺𝗽𝗼𝗻𝗲𝗻𝘁𝘀⁡
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        {/* ⁡⁣⁢⁣𝗤𝗨𝗘𝗦𝗧𝗜𝗢𝗡 𝗧𝗜𝗧𝗟𝗘 𝗙𝗼𝗿𝗺⁡ */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* ⁡⁣⁢⁣𝗘𝗫𝗣𝗟𝗔𝗡𝗔𝗧𝗜𝗢𝗡 𝗙𝗼𝗿𝗺⁡ */}
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) =>
                    // @ts-ignore
                    (editorRef.current = editor)
                  }
                  // onBlur prop save the content once we exit the editor
                  onBlur={field.onBlur}
                  // content is the content of editor
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={parsedQuestionDetails?.content || ""}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "codesample | bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist ",
                    content_style: "body { font-family:Inter; font-size:16px }",
                    skin: mode === "dark" ? "oxide-dark" : "oxide",
                    content_css: mode === "dark" ? "dark" : "light",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* ⁡⁣⁢⁣𝗧𝗔𝗚𝗦 𝗙𝗼𝗿𝗺⁡ */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              {/* FormControl can only take a single element. but I made a rookie mistake and added another element(map for inputvalues) resulting in error. To prevent this just wrap both elements inside a HTML wrapping element which is this `<>Both Element</>`  */}
              <FormControl className="mt-3.5">
                <>
                  <Input
                    disabled={type === "Edit"}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add tags..."
                    // remove this spread operator `{...field}` , to manually adjust the output
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />

                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                          onClick={() =>
                            type !== "Edit"
                              ? handleTagRemove(tag, field)
                              : () => {}
                          }
                        >
                          {tag}
                          {type !== "Edit" && (
                            <Image
                              src="assets/icons/close.svg"
                              alt="Close icon"
                              width={12}
                              height={12}
                              className="cursor-pointer object-contain invert-0 dark:invert"
                            />
                          )}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* ⁡⁣⁣⁢𝗥𝗲𝘂𝘀𝗮𝗯𝗹𝗲 𝗳𝗼𝗿𝗺 𝗯𝘆 𝗰𝗵𝗲𝗰𝗸𝗶𝗻𝗴 𝗳𝗼𝗿 𝘁𝘆𝗽𝗲⁡ */}
        <Button
          type="submit"
          className="primary-gradient w-full !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "Edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "Edit" ? "Edit Question" : "Ask a Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
