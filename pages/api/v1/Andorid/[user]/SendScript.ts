import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type ResponseData = {
  message?: string;
  error?: string;
};


let scriptData: any = null;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { Script, User } = req.body;
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
    const session = await getSession({ req });
    if (session?.user) {
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
