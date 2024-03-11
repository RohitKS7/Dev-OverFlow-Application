// 80% of the code present here is taken from ShadCN form component
"use client";

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
import { createQuestion } from "@/lib/actions/question.action";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeProvider";

//  setting the type of form as create
const type: any = "create";

interface Props {
  mongoUserId: string;
}

const Question = ({ mongoUserId }: Props) => {
  const { mode } = useTheme();
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  // ! 1. Define your form.
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  // ! 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    // setIsSubmitting allows us to press our submit button second time and cause some chaos in our database
    setIsSubmitting(true);

    try {
      // make an async call to your API(backend) -> to create a question
      // which contain all form data
      await createQuestion({
        // coming directly from Title field of question form
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        //   Make a request call to the database to retrive the userData for author
        author: JSON.parse(mongoUserId),
        path: pathName,
      });

      // After that navigate back to home page to see the created question
      router.push("/");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  // ! Handle Tags Output Function
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

  // ! Handle Tag Removing function (iss function me hum bol rahe hai ki hum tag ko remove kr rahe hai pr reality me hum ek new array create kr rahe hai aur clicked tag ko add nahi kr rahe hai) This is called `reverse-engineering`.
  const handleTagRemove = (tag: string, field: any) => {
    // First we must figure out how remove only the tag we click-on and we mustn't mutate the state directly here (meaning we shouldn't mutate the original array of tags but instead create a copy of that array and make change in it)
    const newTags = field.value.filter((t: string) => t !== tag);
    // explaination of above line:- This line is spitting a new array after filtering the tag we clicked meaning this array will not include the clicked tag and spits the remaining tags in an arrya which we will append in our existing tags array

    console.log(newTags);
    form.setValue("tags", newTags);
  };

  // Return the components
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        {/* QUESTION TITLE Form */}
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

        {/* EXPLANATION Form */}
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
                  initialValue=""
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

        {/* TAGS Form */}
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
                          onClick={() => handleTagRemove(tag, field)}
                        >
                          {tag}
                          <Image
                            src="assets/icons/close.svg"
                            alt="Close icon"
                            width={12}
                            height={12}
                            className="cursor-pointer object-contain invert-0 dark:invert"
                          />
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
        {/* Reusable form by checking for type */}
        <Button
          type="submit"
          className="primary-gradient w-full !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "edit" ? "Edit Question" : "Ask a Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
