"use server";
import connectToDb from "@/db";
import Donation from "@/db/models/donation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Razorpay from "razorpay";

export const createOrder = async (amount: number) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      throw new Error("the user is not authenticated");
    }
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
    const options = {
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1,
      notes: { donorName: session.user.name, donorEmail: session.user.email },
    };
    const order = await razorpay.orders.create(options);
    await connectToDb();
    await Donation.create({
      amount: order.amount,
      orderId: order.id,
      currency: "INR",
      userId: session.user.id,
    });
    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID!,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "failed to create order",
    };
  }
};
