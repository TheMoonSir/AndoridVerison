import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authOptions from "@/pages/api/auth/[...nextauth]";

type ResponseData = {
  message?: string;
  error?: string;
};

interface Session {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  }
}

let scriptData: any = null;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const session: Session | null = await getServerSession(req, res, authOptions);
  if (req.method === "POST") {
    const { Script, User } = req.body;
    if (!session?.user?.name) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!Script && !User) {
      return res.status(400).json({ error: "Invalid." });
    }
    scriptData = Script;
    res.status(200).json({ message: "Script received successfully." });

    setTimeout(() => {
      scriptData = null;
      console.log("Script data cleared.");
    }, 400);
  } else if (req.method === "GET") {
    if (session?.user?.name) {
      if (scriptData) {
        res.status(200).send(scriptData);
      } else {
        res.status(200).json({ error: "Script not found." });
      }
    } else {
      res.status(200).json({ error: "you need to login." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
