"use server";

import { z } from "zod";
import { db } from "@/db";
import { waitlistEntries } from "@/db/schema";

const waitlistSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^\+91[0-9]{10}$/, "Enter a valid 10-digit Indian phone number"),
  businessType: z.enum([
    "sole_proprietorship",
    "llp_partnership",
    "private_limited",
    "unregistered",
  ]),
  turnoverRange: z.enum(["below_50l", "50l_to_2cr", "2cr_to_5cr", "above_5cr"]),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;

export type WaitlistResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitWaitlist(
  formData: FormData
): Promise<WaitlistResponse> {
  const rawData = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    businessType: formData.get("businessType") as string,
    turnoverRange: formData.get("turnoverRange") as string,
  };

  const result = waitlistSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await db.insert(waitlistEntries).values({
      name: result.data.name,
      phone: result.data.phone,
      businessType: result.data.businessType,
      turnoverRange: result.data.turnoverRange,
    });

    return {
      success: true,
      message: "Successfully joined the waitlist!",
    };
  } catch (error: unknown) {
    console.error("Database error:", error);

    if (error instanceof Error) {
      if (error.message.includes("duplicate key value")) {
        return {
          success: false,
          message: "This phone number is already registered",
          errors: { phone: ["This phone number is already on the waitlist"] },
        };
      }

      // Log the full error for debugging
      console.error("Full error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    }

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
