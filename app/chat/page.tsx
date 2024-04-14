"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { sendMessage } from "@/actions/chat.actions";
import ChatUi from "@/components/ui/ChatUi";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
const formSchema = z.object({
  message: z.string().min(2, {
    message: "message must be at least 2 characters.",
  }),
  language: z.string({
    required_error: "Please select a language.",
  }),
  tone: z.string({
    required_error: "Please select a tone.",
  }),
});

interface LangTone {
  label: string;
  value: string;
}
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [languages, setLanguages] = useState([
    { label: "Hindi", value: "hindi" },
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
    { label: "Arabic", value: "ar" },
    { label: "Bengali", value: "bn" },
    { label: "Dutch", value: "nl" },
    { label: "Finnish", value: "fi" },
    { label: "Greek", value: "el" },
    { label: "Hebrew", value: "he" },
    { label: "Indonesian", value: "id" },
    { label: "Italian", value: "it" },
    { label: "Malay", value: "ms" },
    { label: "Norwegian", value: "no" },
    { label: "Polish", value: "pl" },
    { label: "Romanian", value: "ro" },
    { label: "Swedish", value: "sv" },
    { label: "Thai", value: "th" },
    { label: "Turkish", value: "tr" },
    { label: "Ukrainian", value: "uk" },
    { label: "Vietnamese", value: "vi" },
    { label: "Czech", value: "cs" },
    { label: "Danish", value: "da" },
    { label: "Filipino", value: "fil" },
    { label: "Hungarian", value: "hu" },
    { label: "Kannada", value: "kn" },
    { label: "Malayalam", value: "ml" },
    { label: "Marathi", value: "mr" },
    { label: "Punjabi", value: "pa" },
    { label: "Slovak", value: "sk" },
    { label: "Tamil", value: "ta" },
    { label: "Telugu", value: "te" },
    { label: "Afrikaans", value: "af" },
    { label: "Albanian", value: "sq" },
    { label: "Amharic", value: "am" },
    { label: "Azerbaijani", value: "az" },
    { label: "Basque", value: "eu" },
    { label: "Belarusian", value: "be" },
    { label: "Bosnian", value: "bs" },
    { label: "Bulgarian", value: "bg" },
    { label: "Catalan", value: "ca" },
    { label: "Corsican", value: "co" },
    { label: "Croatian", value: "hr" },
    { label: "Esperanto", value: "eo" },
    { label: "Estonian", value: "et" },
    { label: "Fijian", value: "fj" },
    { label: "Galician", value: "gl" },
  ]);
  const [tones, setTones] = useState([
    { label: "Romantic", value: "romantic" },
    { label: "Formal", value: "formal" },
    { label: "Casual", value: "casual" },
  ]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      language: "",
      tone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newMessage: Message = {
      role: "user",
      parts: [{ text: values.message }],
    };
    setUserMessages((prevUserMessages) => [...prevUserMessages, newMessage]);
    await setMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);
    try {
      const { message, tone, language } = values;
      if (!values.message || !values.tone || !values.language) {
        form.setError("language", { message: "Please add messages" });
      }

      const res = await sendMessage(message, tone, language);
      if (res) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "model", parts: [{ text: res }] },
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    form.setValue("message", "");
  }

  useEffect(() => {
    const savedMessages = localStorage.getItem("messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);
  const handleDelete = () => {
    setMessages([]);
    setUserMessages([]);
    localStorage.removeItem("messages");
  };

  return (
    <div className="flex pt-10 h-[calc(100dvh)] flex-col bg-[#212121] ">
      <div className="h-fit custom-scrollbar overflow-y-auto">
        <ChatUi messages={messages} />
      </div>

      <div className="flex mt-auto items-center justify-end flex-col">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto">
            <div className="flex flex-wrap justify-between w-[80vw]  ">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-white">Language</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? languages.find(
                                  (language) => language.value === field.value,
                                )?.label
                              : "Select language"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault(); // Prevent default form submission
                                const inputValue = (
                                  e?.target as HTMLInputElement
                                )?.value?.trim();

                                const matchedLanguage: LangTone | undefined =
                                  languages.find((lang) =>
                                    lang.label
                                      .toLowerCase()
                                      .includes(inputValue.toLowerCase()),
                                  );

                                if (!matchedLanguage) {
                                  form.setValue("language", inputValue);
                                  const newLanguage = {
                                    label: inputValue,
                                    value: inputValue,
                                  };
                                  const updatedLanguages = [
                                    ...languages,
                                    newLanguage,
                                  ];
                                  // Update the state with the new array including the added language
                                  setLanguages(updatedLanguages);
                                }

                                if (matchedLanguage) {
                                  form.setValue(
                                    "language",
                                    matchedLanguage.value,
                                  );
                                } else if (matchedLanguage) {
                                  form.setValue(
                                    "language",
                                    (matchedLanguage as { value: string })
                                      .value,
                                  );
                                }
                              }
                            }}
                          />

                          <CommandEmpty>
                            Press enter to select the language you wrote{" "}
                          </CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {languages.map((language) => (
                                <CommandItem
                                  value={language.label}
                                  key={language.value}
                                  className="hover:bg-red-foreground hover:text-primary-background"
                                  onSelect={() => {
                                    form.setValue("language", language.value);
                                  }}
                                >
                                  {language.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      language.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-white">Tone</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? tones.find((tone) => tone.value === field.value)
                                  ?.label
                              : "Select Tone"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0 ">
                        <Command>
                          <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault(); // Prevent default form submission
                                const inputValue = (
                                  e?.target as HTMLInputElement
                                )?.value?.trim();

                                const matchedTone: LangTone | undefined =
                                  tones.find((tone) =>
                                    tone.label
                                      .toLowerCase()
                                      .includes(inputValue.toLowerCase()),
                                  );

                                if (!matchedTone) {
                                  form.setValue("tone", inputValue);
                                  const newTone = {
                                    label: inputValue,
                                    value: inputValue,
                                  };
                                  const updatedTones = [...tones, newTone];
                                  // Update the state with the new array including the added language
                                  setTones(updatedTones);
                                }
                                if (matchedTone) {
                                  form.setValue("tone", matchedTone.value);
                                } else if (matchedTone) {
                                  form.setValue(
                                    "tone",
                                    (matchedTone as { value: string }).value,
                                  );
                                }
                              }
                            }}
                          />
                          <CommandEmpty>
                            Press enter to select the Tone you wrote .
                          </CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {tones.map((tone) => (
                                <CommandItem
                                  value={tone.label}
                                  key={tone.value}
                                  className="hover:bg-red-foreground hover:text-primary-background"
                                  onSelect={() => {
                                    form.setValue("tone", tone.value);
                                  }}
                                >
                                  {tone.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      tone.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <div className="flex  mt-2 gap-5">
                <Button type="submit" disabled={loading}>
                  {loading ? "Translating..." : "Send"}
                </Button>

                <Button onClick={() => handleDelete()} variant={"destructive"}>
                  Delete Chats
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
