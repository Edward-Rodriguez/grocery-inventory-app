import { Router } from 'express';
import {
  getBrands,
  addNewBrand,
  deleteBrand,
} from '../controllers/brandController.js';

const brandRouter = Router();

brandRouter.post('/new', addNewBrand);
brandRouter.post('/:brandId/delete', deleteBrand);
brandRouter.get('/manage', getBrands);

export default brandRouter;
