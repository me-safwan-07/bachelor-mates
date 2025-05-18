import { NextResponse } from "next/server";
import Razorpay from "razorpay";


export async function POST(req: Request) {
    const body = await req.json();
    const { amount, currency, receipt } = body;

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    try {
        const options = {
            amount: amount * 100, // Amount in paise (₹49 = 4900)
            currency: currency || "INR",
            receipt: receipt || `receipt_order_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json(order);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}