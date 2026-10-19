import { Router } from 'express';
import {
  editItem,
  getItems,
  updateItemPost,
} from '../controllers/itemsController.js';

const itemRouter = Router();

itemRouter.get('/:itemId/edit', editItem);
itemRouter.post('/:itemId/update', updateItemPost);
itemRouter.get('/', getItems);

export default itemRouter;
