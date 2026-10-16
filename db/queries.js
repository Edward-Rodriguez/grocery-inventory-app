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

async function getAllBrands() {
  try {
    const { rows } = await pool.query(`SELECT * FROM brands ORDER BY name`);
    return rows;
  } catch (err) {
    console.error('Database query failed:', err.message);
    throw err;
  }
}

async function getAllCategories() {
  try {
    const { rows } = await pool.query(`SELECT * FROM categories ORDER BY name`);
    return rows;
  } catch (err) {
    console.error('Database query failed:', err.message);
    throw err;
  }
}

async function getItemById(itemId) {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM items
       WHERE item_no = $1`,
      [itemId],
    );
    return rows[0];
  } catch (err) {
    console.error('Database query failed:', err.message);
    throw err;
  }
}

async function getItemCategoriesByItemId(itemId) {
  try {
    const { rows } = await pool.query(
      `SELECT cat.name, cat.id FROM item_categories ic
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

export {
  getAllItems,
  getItemById,
  getItemCategoriesByItemId,
  getAllBrands,
  getAllCategories,
};
