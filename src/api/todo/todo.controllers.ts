import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { Todo, TodoWithId } from './todoModel';
import { createNewTodo, deleteTodo, findOneTodo, findTodo, updateTodo } from './todoServices';

export const findAll = async (req: Request, res: Response<TodoWithId[]>, next: NextFunction) => {
  try {
    const todos = await findTodo();
    res.status(200 );
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

export const findOne = async (req: Request<ParamsWithId, TodoWithId, {}>, res: Response<TodoWithId>, next: NextFunction) => {
  try {
    const result = await findOneTodo(req.params.id);
    if (!result) {
      res.status(404);
      throw new Error(`Todo with id "${req.params.id}" not found.`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateOne = async (req: Request<ParamsWithId, TodoWithId, Todo>, res: Response<TodoWithId>, next: NextFunction) => {
  try {
    const result = await updateTodo(req.params.id, req.body);
    if (!result.value) {
      res.status(404);
      throw new Error(`Todo with id "${req.params.id}" not found.`);
    }
    res.json(result.value);
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) => {
  try {
    const result = await deleteTodo(req.params.id);

    if (!result.value) {
      res.status(404);
      throw new Error(`Todo with id "${req.params.id}" not found.`);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  } 
};