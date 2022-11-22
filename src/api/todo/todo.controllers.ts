import { NextFunction, Request, Response } from 'express';
import { InsertOneResult } from 'mongodb';
import { Todo, TodoWithId } from './todoModel';
import { createNewTodo, findTodo } from './todoServices';

export const findAll = async (req: Request, res: Response<TodoWithId[]>, next: NextFunction) => {
  try {
    const todos = await findTodo();
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

export const createTodo = async (req: Request<{}, InsertOneResult<Todo>, Todo>, res: Response<InsertOneResult<Todo>>, next: NextFunction) => {
  try {
    const result = await createNewTodo(req.body);    
    res.json(result);
  } catch (err) {
    next(err);
  }
};