import * as db from '../db/queries.js';

const defaultImage = '../public/no-image.png';

async function getItems(req, res) {
  const items = await db.getAllItems();

  for (const item of items) {
    item.categories = await db.getItemCategoriesByItemId(item.item_no);
  }

  res.render('index', {
    title: 'Groceries Inventory',
    items: items,
    calculatePercentOff,
  });
}

async function editItem(req, res) {
  const { itemId } = req.params;
  const item = await db.getItemById(itemId);
  item.categories = await db.getItemCategoriesByItemId(itemId);
  const brands = await db.getAllBrands();
  const categories = await db.getAllCategories();
  res.render('editProduct', {
    title: 'Edit Product',
    item: item,
    brands: brands,
    categories: categories,
  });
}

async function updateItemPost(req, res) {
  const { itemId } = req.params;
  const {
    imageUrl: img_url,
    item_name: name,
    quantity_in_stock,
    brand: brand_id,
    categories,
    price,
    discounted_price,
  } = req.body;
  await db.updateItemById(
    itemId,
    img_url,
    name,
    quantity_in_stock,
    brand_id,
    price,
    discounted_price,
  );
  await db.updateItemCategories(itemId, categories);
  res.redirect('/');
}

function calculatePercentOff(discounted_price, price) {
  const percentOff = (1 - discounted_price / price) * 100;
  return Math.round(percentOff);
}

export { getItems, editItem, updateItemPost };
