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

async function deleteBrand(req, res) {
  const { brandId } = req.params;
  await db.deleteBrandById(brandId);
  res.redirect('/brands/manage');
}

export { getBrands, deleteBrand };
