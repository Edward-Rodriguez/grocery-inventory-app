import { Router } from 'express';
import {
  getBrands,
  //   addNewBrand,
  //   deleteBrandPost,
} from '../controllers/brandController.js';

const brandRouter = Router();

brandRouter.get('/manage', getBrands);
// brandRouter.get('/manage/new', addNewBrand);
// brandRouter.post('/manage/:brandId/delete', deleteBrandPost);

export default brandRouter;
