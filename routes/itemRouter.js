import { Router } from 'express';
import { editItem, getItems } from '../controllers/itemsController.js';

const itemRouter = Router();

itemRouter.get('/:itemId/edit', editItem);
itemRouter.get('/', getItems);

export default itemRouter;
