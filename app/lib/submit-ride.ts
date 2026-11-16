import { createServerFn } from "@tanstack/react-start";
import { parseRideInquiry } from "@/lib/ride-inquiry";

export const submitRideInquiry = createServerFn({ method: "POST" })
  .validator((input: unknown) => parseRideInquiry(input))
  .handler(async () => {
    const bytes = new Uint8Array(4);
    crypto.getRandomValues(bytes);
    const reference = `HTL-${Array.from(bytes, (b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()}`;
    return { reference };
  });