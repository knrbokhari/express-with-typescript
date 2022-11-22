import { Todo, Todos } from './todoModel';


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
  