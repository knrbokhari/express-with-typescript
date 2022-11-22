import { Router } from 'express';
import * as todoControlers  from './todo.controllers';
import { validateRequest } from '../../middlewares';
import { Todo } from './todoModel';

const router = Router();

router.get('/', todoControlers.findAll);
router.post('/', validateRequest({ body: Todo }), todoControlers.createTodo);

export default router;
