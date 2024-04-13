"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sendMessage } from "@/actions/chat.actions";
import ChatUi from "@/components/ui/ChatUi";
const formSchema = z.object({
  message: z.string().min(2, {
    message: "message must be at least 2 characters.",
  }),
});

const Page = ({ params }: PageProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [tone, setTone] = useState("romantic");
  const [language, setLanguage] = useState("hindi");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newMessage: Message = {
      role: "user",
      parts: [{ text: values.message }],
    };
    setUserMessages([...userMessages, newMessage]);
    setMessages([...messages, newMessage]);
    form.setValue("message", "");

  }

  useEffect(() => {
    const sendAndLogMessage = async () => {
      try {
        if (messages.length > 0) {
          const res = await sendMessage(messages, tone, language);
          if (res) {
            await setMessages([
              ...messages,
              { role: "model", parts: [{ text: res }] },
            ]);

          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    sendAndLogMessage();
  }, [userMessages]);
  return (
    <div className="flex  h-[calc(100dvh)] flex-col bg-[#1c2f36] ">
      <div className="h-fit overflow-y-auto">
        <ChatUi messages={messages} />
      </div>
      <div className="flex mt-auto items-center justify-end flex-col">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto">
            <div className="flex justify-between w-[80vw]  ">
              <Select onValueChange={(val) => setTone(val)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tone" defaultValue={"formal"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="romantic">Romantic</SelectItem>
                  <SelectItem value="cheerful">Cheerful</SelectItem>
                  <SelectItem value="calm">Calm</SelectItem>
                  <SelectItem value="mysterious">Mysterious</SelectItem>
                  <SelectItem value="energetic">Energetic</SelectItem>
                  {/* Add more tone options as needed */}
                </SelectContent>
              </Select>
              <Select onValueChange={(val) => setLanguage(val)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                  {/* Add more language options as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="p-4 w-[80vw] text-white ">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>message</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="send your message"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
