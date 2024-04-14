import { cn } from "@/lib/utils";
import Image from "next/image";
import useSpeechSynthesis from "@/hooks/useSpeechSynthesis";
import React, { useRef, useState, useEffect } from "react";
import { CopyIcon } from "@radix-ui/react-icons";

export default function ChatList({ messages }: { messages: Message[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { speak, speaking, pause, resume } = useSpeechSynthesis();
  const [name, setName] = useState<string>("");
  const [currentSpeakingIndex, setCurrentSpeakingIndex] = useState<
    number | null
  >(null);
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

  const handlePlay = (text: string, index: number) => () => {
    setCurrentSpeakingIndex(index);
    speak(text);
  };

  const handlePause = () => {
    if (speaking) {
      pause();
      setCurrentSpeakingIndex(null);
    } else {
      resume();
    }
  };
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Optionally, you can provide feedback to the user after successful copying
      console.log("Text copied to clipboard:", text);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };
  if (messages.length === 0) {
    return (
      <div className="w-full custom-scrollbar min-h-[calc(80dvh)] flex justify-center items-center">
        <div className="flex   flex-col gap-4 items-center">
          <Image
            src="/logo.png"
            alt="AI"
            width={60}
            height={60}
            className="h-20 w-14 object-contain dark:invert"
          />
          <p className="text-center text-lg text-white">
            Translate any language with the power of AI with human like behavior
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="scroller"
      className="w-full custom-scrollbar  overflow-y-scroll overflow-x-hidden h-full justify-end"
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
                  <p className="text-white p-3 rounded-md max-w-xs sm:max-w-2xl overflow-x-auto bg-transparent border">
                    {message.parts[0].text}
                  </p>
                </div>
              )}
              {message.role === "model" && (
                <div className="flex items-end gap-2">
                  <span className="bg-accent p-3 rounded-md max-w-xs sm:max-w-2xl overflow-x-auto">
                    {message.parts[0].text.split("```").map((part, index) => (
                      <React.Fragment key={index}>
                        <p>{part}</p>
                        <CopyIcon
                          onClick={() => handleCopy(part)}
                          className="cursor-pointer hover:text-green-500"
                        />
                        {/* {currentSpeakingIndex === index && speaking ? (
                          <PauseIcon
                            onClick={handlePause}
                            className="cursor-pointer"
                          />
                        ) : (
                          <PlayIcon
                            onClick={handlePlay(part, index)}
                            className="cursor-pointer"
                          />
                        )} */}
                      </React.Fragment>
                    ))}
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
