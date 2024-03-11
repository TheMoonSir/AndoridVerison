import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

type ResponseData = {
  message?: string;
  error?: string | undefined;
  id?: string;
  name?: string;
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method != "POST") {
    return res.status(404).json({ error: "Method is not allowed." });
  }
  const { username } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        name: username,
      },
    });
    return res.status(201).json(newUser);
  } catch (err: any) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: err || "Unknown error." });
  }
}
