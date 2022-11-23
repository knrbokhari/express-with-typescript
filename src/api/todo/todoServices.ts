import { Todo, Todos } from './todoModel';
import { ObjectId } from 'mongodb';

export const findTodo = async () => {
  const  result = await Todos.find();
  const todos = await result.toArray();
  return todos;    
};

export const createNewTodo = async (body: unknown) => {
  const validatResult = await Todo.parseAsync(body);
  const insertResult = await Todos.insertOne(validatResult);
  return insertResult;    
};

export const findOneTodo = async (id: string ) => {
  const result = await Todos.findOne({
    _id: new ObjectId(id),
  });
  return result;    
};

export const updateTodo = async (id: string, body: any ) => {
  const result = await Todos.findOneAndUpdate({
    _id: new ObjectId(id),
  }, {
    $set: body,
  }, {
    returnDocument: 'after',
  });
  return result;    
};

export const deleteTodo = async (id: string ) => {
  const result = await Todos.findOneAndDelete({
    _id: new ObjectId(id),
  });
  return result;    
};