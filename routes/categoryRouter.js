import { Router } from 'express';
import {
  getCategories,
  addNewCategory,
  deleteCategory,
} from '../controllers/categoryController.js';

const categoryRouter = Router();

categoryRouter.post('/new', addNewCategory);
categoryRouter.post('/:categoryId/delete', deleteCategory);
categoryRouter.get('/manage', getCategories);

export default categoryRouter;
