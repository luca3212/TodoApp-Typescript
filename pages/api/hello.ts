// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

export const tareasInitial = [
  {
    id: 0.4997791401449019,
    text: "Complete online JavaScript course",
    status: true,
  },
  {
    id: 0.2292685369590317,
    text: "Jog around the park 3x",
    status: false,
  },
  {
    id: 0.20117835310195242,
    text: "10 minutes meditation",
    status: false,
  },
  {
    id: 0.1723650739265925,
    text: "Read for 1 hour",
    status: false,
  },
  {
    id: 0.2534669125824929,
    text: "Pick up groceries",
    status: false,
  },
  {
    id: 0.014519289267771907,
    text: "Complete Todo App on Frontend Mentor",
    status: false,
  },
];
