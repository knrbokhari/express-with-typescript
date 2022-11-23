import { Router } from 'express';
import * as todoControlers  from './todo.controllers';
import { validateRequest } from '../../middlewares';
import { Todo } from './todoModel';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

const router = Router();

router.get('/', todoControlers.findAll);
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  todoControlers.findOne,
);
router.post('/', validateRequest({ body: Todo }), todoControlers.createTodo);
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Todo,
  }),
  todoControlers.updateOne,
);
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  todoControlers.deleteOne,
);

export default router;
