/* eslint-disable @typescript-eslint/quotes */
import { Router } from "express";
import * as todoControlers  from "./todo.controllers";


const router = Router();

router.get("/", todoControlers.findAll);
router.post("/", todoControlers.createTodo);

export default router;
