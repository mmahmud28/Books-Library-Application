import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const orderId = formData.get("orderId");

    const origin = (await headers()).get("origin");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: "price_1U0wnHGYDeWfvXCmeOslibUl",
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard/readers/books/booksOrder/success?orderId=${orderId}`,
      cancel_url: `${origin}/dashboard/readers/books/booksOrder/payment/${orderId}`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}