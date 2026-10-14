import { Router } from 'express';
import { getItems } from '../controllers/itemsController.js';

const indexRouter = Router();

indexRouter.get('/', getItems);

export default indexRouter;
