import { cn } from "@/lib/utils";
import Image from "next/image";
import { AvatarIcon, PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import useSpeechSynthesis from "@/hooks/useSpeechSynthesis";
import React, { useRef, useState, useEffect } from "react";

export default function ChatList({ messages }: { messages: Message[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { speak, speaking, pause, resume } = useSpeechSynthesis();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const scrollToBottom = () => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    };
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const username = localStorage.getItem("ollama_user");
    if (username) {
      setName(username);
    }
  }, []);

  const handlePlay = (text: string) => () => {
    console.log("Playing", text);
    
    if (speaking) pause();
    else speak(text);
  };

  const handlePause = () => {
    if (speaking) pause();
    else resume();
  };

  if (messages.length === 0) {
    return (
      <div className="w-full min-h-[calc(80dvh)] flex justify-center items-center">
        <div className="flex flex-col gap-4 items-center">
          <Image
            src="/logo.svg"
            alt="AI"
            width={60}
            height={60}
            className="h-20 w-14 object-contain dark:invert"
          />
          <p className="text-center text-lg text-white">
            How can I help you today?
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="scroller"
      className="w-full overflow-y-scroll overflow-x-hidden h-full justify-end"
    >
      <div className="w-full flex flex-col overflow-x-hidden overflow-y-hidden min-h-full justify-end">
        {messages.map((message: Message, index: number) => (
          <div
            key={index}
            className={cn(
              "flex flex-col gap-2 p-4 whitespace-pre-wrap",
              message.role === "user" ? "items-end" : "items-start ",
            )}
          >
            <div className="flex gap-3 items-center">
              {message.role === "user" && (
                <div className="flex items-end gap-3">
                  <span className="bg-accent p-3 rounded-md max-w-xs sm:max-w-2xl overflow-x-auto bg-blue-400">
                    {message.parts[0].text}
                  </span>
                  <p className="flex justify-start items-center overflow-hidden">
                    <AvatarIcon className="object-contain" />
                    <p>{name && name.substring(0, 2).toUpperCase()}</p>
                  </p>
                </div>
              )}
              {message.role === "model" && (
                <div className="flex items-end gap-2">
                  <span className="bg-accent p-3 rounded-md max-w-xs sm:max-w-2xl overflow-x-auto">
                    {message.parts[0].text.split("```").map((part, index) => {
                      return (
                        <React.Fragment key={index}>
                          {" "}
                          <div>{part}</div>{" "}
                          {speaking ? (
                            <PauseIcon
                              onClick={handlePause}
                              className="cursor-pointer"
                            />
                          ) : (
                            <PlayIcon
                              onClick={handlePlay(part)}
                              className="cursor-pointer bg-red-500"
                            />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div id="anchor" ref={bottomRef}></div>
    </div>
  );
}
