import { Router } from 'express';
import {
  editItem,
  getItems,
  updateItemPost,
  deleteItemPost,
  addItemPost,
  addItemGet,
} from '../controllers/itemsController.js';

const itemRouter = Router();

itemRouter.get('/:itemId/edit', editItem);
itemRouter.post('/:itemId/update', updateItemPost);
itemRouter.post('/:itemId/delete', deleteItemPost);
itemRouter.get('/new', addItemGet);
itemRouter.post('/new', addItemPost);
itemRouter.get('/', getItems);

export default itemRouter;
