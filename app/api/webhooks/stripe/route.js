import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        const userId = session.client_reference_id
        const customerId = session.customer
        const subscriptionId = session.subscription

        await supabaseAdmin
          .from("accounts")
          .upsert({
            user_id: userId,
            subscription_tier: "pro",
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
          })
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object
        await supabaseAdmin
          .from("accounts")
          .update({ subscription_tier: "free" })
          .eq("stripe_subscription_id", subscription.id)
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object
        await supabaseAdmin
          .from("accounts")
          .update({ subscription_tier: "free" })
          .eq("stripe_customer_id", invoice.customer)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}