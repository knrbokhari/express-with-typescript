import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { Todo, TodoWithId } from './todoModel';
import { createNewTodo, findTodo } from './todoServices';

export const findAll = async (req: Request, res: Response<TodoWithId[]>, next: NextFunction) => {
  try {
    const todos = await findTodo();
    res.status(200);
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

export const createTodo = async (req: Request<{}, TodoWithId, Todo>, res: Response<TodoWithId>, next: NextFunction) => {
  try {
    const insertResult = await createNewTodo(req.body);
    if (!insertResult.acknowledged) throw new Error('Error inserting todo.');
    res.status(201);
    res.json({
      _id: insertResult.insertedId,
      ...req.body,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422);
    }
    next(error);
  }
};