/* eslint-disable @typescript-eslint/quotes */
import { Router, Request, Response } from "express";
import Todo from "./todoModel";

const router = Router();

router.get("/", (req: Request, res: Response<Todo[]>) => {
  res.json([{ content: "learn TypeScript", done: false }]);
});

export default router;
