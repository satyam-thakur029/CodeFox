"use server";
import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

export const streamTokenProvider = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");

  if (!process.env.NEXT_PUBLIC_STREAM_API_KEY || !process.env.STREAM_SECRET_KEY) {
    throw new Error("Stream API keys are missing");
  }

  const streamClient = new StreamClient(
    process.env.NEXT_PUBLIC_STREAM_API_KEY!,
    process.env.STREAM_SECRET_KEY!
  );

  const token = streamClient.generateUserToken({user_id : user.id});

  console.log("User ID:", user.id);
  console.log("Generated Token:", token);

  return token;
};
