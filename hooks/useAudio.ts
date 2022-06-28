import { useEffect, useState } from "react";

export default function useAudio(
  audioLinks: Array<string>
): Array<HTMLAudioElement> {
  const [audio, setAudio] = useState<Array<HTMLAudioElement>>([]);

  useEffect(() => {
    const audioList = audioLinks.map((item) => new Audio(item));
    setAudio(audioList);
  }, [audioLinks]);

  return audio;
}
