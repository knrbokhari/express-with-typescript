/* eslint-disable @typescript-eslint/quotes */
import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import todos from "./todo/todoRoute";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/todo", todos);

export default router;
