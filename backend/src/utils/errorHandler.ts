import { Request, Response } from "express";

export const handleError = (error: any, res: Response) => {
  if (error instanceof Error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  } else {
    res.status(500).json({ message: "Server error", error: "Unknown error" });
  }
};
export const handleErrorMessage = (
  message: string,
  code: number,
  res: Response
) => {
  res.status(code).json({ message });
};
