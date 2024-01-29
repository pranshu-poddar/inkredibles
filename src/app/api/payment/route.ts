import { getSession } from "@/actions/auth/session";
import { createRazorpayOrder } from "@/lib/razorpay";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get("sessionToken")?.value || "";
  const session = await getSession(sessionToken);

  if (!session) {
    return Response.json({ status: 401, error: "Unauthorized" });
  }

  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { amount, currency } = body;
      const order = await createRazorpayOrder(amount, currency);

      return Response.json({ status: 200,order});
    } catch (error) {
      console.error("Error:", error);
      return Response.json({ status: 500, error: "Internal Server Error" });
    }
  }

  return Response.json({ status: 405, error: "Method Not Allowed" });
}
