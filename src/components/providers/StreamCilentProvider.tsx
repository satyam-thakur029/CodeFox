"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import LoaderUI from "../LoaderUI";
import { streamTokenProvider } from "@/actions/stream.action";



const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [streamVideoClient, setStreamVideoClient] = useState<StreamVideoClient | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const setupClient = async () => {
      if (!isLoaded || !user) return;

      try {
        const token = await streamTokenProvider();
        if (!token) throw new Error("Stream token is empty");

        const client = new StreamVideoClient({
          apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
          user: {
            id: user.id,
            name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.id,
            image: user.imageUrl,
          },
          tokenProvider: () => Promise.resolve(token),
        });

        setStreamVideoClient(client);
      } catch (error) {
        console.error("Error setting up StreamVideoClient:", error);
      }
    };

    setupClient();
  }, [user, isLoaded]);

  if (!streamVideoClient) return <LoaderUI />;

  return <StreamVideo client={streamVideoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
