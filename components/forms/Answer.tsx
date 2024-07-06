"use client";

// ⁡⁣⁢⁣𝗜𝗠𝗣𝗢𝗥𝗧𝗦⁡
import { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnswerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "../ui/button";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { SignedIn, SignedOut } from "@clerk/nextjs";

interface Props {
  question: string;
  questionId: string;
  authorId: string;
}

// ⁡⁣⁢⁣𝗠𝗔𝗜𝗡 𝗖𝗢𝗠𝗣𝗢𝗡𝗘𝗡𝗧⁡
const Answer = ({ question, questionId, authorId }: Props) => {
  const { toast } = useToast();
  const pathName = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAI, setIsSubmittingAI] = useState(false);
  const { mode } = useTheme();
  const editorRef = useRef(null);

  //!  ⁡⁣⁢⁣𝟭. 𝗗𝗲𝗳𝗶𝗻𝗲 𝘆𝗼𝘂𝗿 𝗳𝗼𝗿𝗺.⁡
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  //!  ⁡⁣⁢⁣𝟮. 𝗗𝗲𝗳𝗶𝗻𝗲 𝗮 𝘀𝘂𝗯𝗺𝗶𝘁 𝗵𝗮𝗻𝗱𝗹𝗲𝗿.⁡
  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);

    try {
      await createAnswer({
        content: values.answer,
        author: authorId,
        question: JSON.parse(questionId),
        path: pathName,
      });

      form.reset();

      toast({
        title: "Answer Created Successfuly",
        variant: "default",
      });

      // Clearing the Editor
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
    } catch (error) {
      console.log(error);

      toast({
        title: "Error While Creating The Answer",
        variant: "destructive",
      });
      throw error;
    } finally {
      // finally:  is used to say "Whatever happens (process successfull or failed) Just setIsSubmitting to false"
      setIsSubmitting(false);
    }
  };

  // ⁡⁢⁣⁢AI Answer Generation Function⁡
  const generateAIAnswer = async () => {
    if (!authorId) {
      return toast({
        title: "Please log in",
        description: "You must be logged-in to perform this action",
        variant: "destructive",
      });
    }

    setIsSubmittingAI(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        }
      );

      if (!response.ok) {
        toast({
          title: "Too Many Requests",
          variant: "destructive",
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const aiAnswer = await response.json();

      // Convert Plain Text to HTML format (get the explaination from chatgpt or google for better understanding)
      // ⁡⁢⁣⁣Newline Character ⁡⁣⁣⁢(\n)⁡⁣⁣⁢:⁡⁡ Indicates the end of one line and the start of a new one in plain text.
      // ⁡⁢⁣⁣HTML Line Break⁡ ⁡⁣⁣⁢(<br />):⁡ An HTML tag used to create a line break in web content.
      // ⁡⁢⁣⁣Conversion Purpose:⁡ Replaces ⁡⁣⁣⁢\n⁡ with ⁡⁣⁣⁢<br />⁡ to ensure that the text is displayed with the correct formatting when rendered in HTML.
      // ⁡⁣⁣⁢𝗴⁡ : globally
      const formattedAnswer = aiAnswer.reply.replace(/\n/g, "<br />");

      // checking reference to editor, if Yes that means we can manipulate the editor
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(formattedAnswer);
      }

      toast({
        title: "Answer Generated Successfuly",
        variant: "default",
      });
    } catch (error: any) {
      console.error("Fetch error:", error.message);
    } finally {
      setIsSubmittingAI(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-gray700_light800">
          Write your answer here
        </h4>

        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none "
          onClick={generateAIAnswer}
          disabled={isSubmittingAI}
        >
          {isSubmittingAI ? (
            <>Generating...</>
          ) : (
            <>
              <Image
                src="/assets/icons/stars.svg"
                alt="generate an AI answer"
                width={12}
                height={12}
                className="object-contain"
              />
              Generate AI Answer
            </>
          )}
        </Button>
      </div>

      {/* ⁡⁣⁢⁣𝗙𝗢𝗥𝗠⁡ */}
      {/* ⁡⁣⁣⁢Spreading the values of React-Hook-Form from `⁡⁢⁣⁣form⁡` ⁡⁣⁣⁢in⁡ `⁡⁢⁣⁣Form⁡` ⁡⁣⁣⁢element to use the reacthookform.⁡⁡ */}
      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
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
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      // changing editor's mode according to application's theme
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <SignedIn>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="primary-gradient w-fit text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Answer..." : "Submit"}
              </Button>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex justify-end">
              <Button
                className="primary-gradient w-fit text-white"
                disabled={true}
              >
                Log-In To Submit Your Answer
              </Button>
            </div>
          </SignedOut>
        </form>
      </Form>
    </>
  );
};

export default Answer;
