import { useState, useEffect } from "react";

const useSpeechSynthesis = () => {
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const fetchVoices = async () => {
      if ("speechSynthesis" in window) {
        const synthesis = window.speechSynthesis;
        const fetchedVoices = await synthesis.getVoices();
        setVoices(fetchedVoices);
      }
    };

    fetchVoices();

    const handleVoicesChanged = () => {
      fetchVoices();
    };

    window.speechSynthesis.addEventListener(
      "voiceschanged",
      handleVoicesChanged,
    );

    return () => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        handleVoicesChanged,
      );
    };
  }, []);

  const speak = (text: string) => {
    if ("speechSynthesis" in window && voices.length > 0) {
      const synthesis = window.speechSynthesis;
      const voice = voices.find((v) => v.lang === "hi-IN") || voices[0];
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.lang = voice.lang;

      console.log("Utterance:", utterance);

      utterance.onstart = () => {
        console.log("Speaking:", text);
        setSpeaking(true);
      };

      utterance.onend = () => {
        console.log("Speech ended:", text);
        setSpeaking(false);
      };

      utterance.onerror = (error) => {
        console.error("Speech synthesis error:", error);
      };

      synthesis.speak(utterance);
    } else {
      console.error("Speech synthesis not supported or voices not available");
    }
  };

  const pause = () => {
    setSpeaking(false);
    window.speechSynthesis.pause();
  };

  const resume = () => {
    setSpeaking(true);
    window.speechSynthesis.resume();
  };

  return { speaking, speak, pause, resume };
};
export default useSpeechSynthesis;
