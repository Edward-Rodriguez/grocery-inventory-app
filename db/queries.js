import pool from './pool.js';

async function getAllItems() {
  try {
    const { rows } = await pool.query(
      ` SELECT
            items.item_no,
            items.name AS item_name,
            items.quantity_in_stock,
            items.price,
            items.discounted_price,
            items.img_url,
            brands.name AS brand_name
        FROM items
        INNER JOIN brands
        ON items.brand_id = brands.id`,
    );
    return rows;
  } catch (err) {
    console.error('Database query failed:', err.message);
    throw err;
  }
}

async function getItemCategoriesByItemId(itemId) {
  try {
    const { rows } = await pool.query(
      `SELECT cat.name FROM item_categories ic
       INNER JOIN categories cat ON ic.category_id = cat.id
       WHERE item_id = $1`,
      [itemId],
    );
    return rows;
  } catch (err) {
    console.error('Database query failed:', err.message);
    throw err;
  }
}

export { getAllItems, getItemCategoriesByItemId };
