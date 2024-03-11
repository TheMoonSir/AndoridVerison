import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client/edge";
export const config = {
  runtime: "edge",
};

const prisma = new PrismaClient();

let scriptData: any = null;
export default async function handler(req: NextApiRequest) {
  if (req.method === "POST") {
    const parsedUrl = new URL(req.url || "");
    const pathParts = parsedUrl.pathname.split("/");
    const param = pathParts.slice(4, 10);
    const incomingMessage = req as any;
    const user = param[0];
    const body = await incomingMessage.json();
    const { Script } = body;
    console.log(Script);
    const User = await prisma.user.findFirst({
      where: {
        name: user,
      },
    });
    if (!User) {
      return Response.json({ error: "Unauthorized." }, { status: 401 });
    }
    if (!Script && !user) {
      return Response.json({ error: "Invalid." }, { status: 400 });
    }
    scriptData = Script;
    Response.json({ error: "Script received successfully." }, { status: 200 });

    setTimeout(() => {
      scriptData = null;
      console.log("Script data cleared.");
    }, 400);
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
        new Response(scriptData, { status: 200 });
      } else {
        return Response.json({ error: "Script not found." }, { status: 200 });
      }
    } else {
      return Response.json({ error: "you need to login." }, { status: 401 });
    }
  } else {
    return Response.json({ error: "Method Not Allowed" }, { status: 405 });
  }
}
