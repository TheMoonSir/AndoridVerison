import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

type ResponseData = {
  message?: string;
  error?: string;
  id?: string;
  name?: string;
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST" ) {
    return res.status(405).end();
  }
  const { username } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        name: username,
      },
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
