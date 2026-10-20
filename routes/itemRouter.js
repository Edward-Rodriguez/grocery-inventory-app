import { Router } from 'express';
import {
  editItem,
  getItems,
  updateItemPost,
  deleteItemPost,
} from '../controllers/itemsController.js';

const itemRouter = Router();

itemRouter.get('/:itemId/edit', editItem);
itemRouter.post('/:itemId/update', updateItemPost);
itemRouter.post('/:itemId/delete', deleteItemPost);
itemRouter.get('/', getItems);

export default itemRouter;
