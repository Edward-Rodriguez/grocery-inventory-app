import * as db from '../db/queries.js';

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

function calculatePercentOff(discounted_price, price) {
  const percentOff = (1 - discounted_price / price) * 100;
  return Math.round(percentOff);
}

export { getItems };
