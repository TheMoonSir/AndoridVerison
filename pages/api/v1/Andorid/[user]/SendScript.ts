import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client/edge";

const prisma = new PrismaClient();
let scriptData: "";
let scriptTimeout: NodeJS.Timeout | null = null;

async function clearScriptData() {
  scriptData = "";
  console.log("Script data cleared.");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const parsedUrl = new URL(req.url || "");
    const pathParts = parsedUrl.pathname.split("/");
    const param = pathParts.slice(4, 10);
    const incomingMessage = req as any;
    const user = param[0];
    const body = await incomingMessage.json();
    const { Script } = body;
    const User = await prisma.user.findFirst({
      where: {
        name: user,
      },
    });
    if (!User) {
      return res.status(401).json({ error: "Unauthorized." });
    }
    if (!Script && !user) {
      return res.status(400).json({ error: "Invalid." });
    }
    scriptData = Script;
    if (scriptTimeout) {
      clearTimeout(scriptTimeout);
    }
    if (!scriptTimeout) {
      scriptTimeout = setTimeout(clearScriptData, 200);
    }
  } else if (req.method === "GET") {
    let username = req.query?.user;

    if (Array.isArray(username)) {
      username = username[0];
    }
    const user = await prisma.user.findFirst({
      where: {
        name: username,
      },
    });
    if (user) {
      if (scriptData) {
        return res.status(200).send(scriptData);
      } else {
        return res.send(JSON.stringify({ error: "Script not found." }));
      }
    } else {
      return res.status(404).json({ error: "you need to login." });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
