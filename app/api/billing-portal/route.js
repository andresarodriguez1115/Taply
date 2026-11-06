import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    // Make sure the request comes from a signed-in user
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    if (!token) return NextResponse.json({ error: "Not signed in" }, { status: 401 })

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
    if (error || !user) return NextResponse.json({ error: "Not signed in" }, { status: 401 })

    const { data: account } = await supabaseAdmin
      .from("accounts")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle()

    if (!account?.stripe_customer_id) {
      return NextResponse.json({ error: "No subscription found" }, { status: 404 })
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: account.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account`,
    })

    return NextResponse.json({ url: portal.url })
  } catch (err) {
    console.error("Billing portal error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}