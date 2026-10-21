import * as db from '../db/queries.js';

async function getBrands(req, res) {
  const brands = await db.getAllBrands();

  for (const brand of brands) {
    const count = (await db.getBrandProductCount(brand.id)).count;
    brand.productCount = Number(count);
  }

  res.render('manageBrands', {
    title: 'Manage Brands',
    brands: brands,
  });
}

export { getBrands };
