import { NextApiRequest } from "next";
import { getSession } from "@/actions/auth/session";
import { createRazorpayOrder } from "@/lib/razorpay";

export async function POST(req: NextApiRequest) {
  const sessionToken = req.cookies.sessionToken || "";
  const session = await getSession(sessionToken);

  if (!session) {
    return Response.json({ status: 401, error: "Unauthorized" });
  }

  if (req.method === "POST") {
    try {
      console.log("razorpay : ", req.body);
      const { amount, currency } = req.body;
      const order = await createRazorpayOrder(amount, currency);

      return Response.json({ status: 200, order });
    } catch (error) {
      console.error(error);
      return Response.json({ status: 500, error: "Internal Server Error" });
    }
  }

  return Response.json({ status: 405, error: "Method Not Allowed" });
}
