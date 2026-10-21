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

async function getBrandProductCount(brandId) {
  try {
    const { rows } = await pool.query(
      `SELECT COUNT(*) FROM items
       WHERE brand_id = $1`,
      [brandId],
    );
    return rows[0];
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

async function updateItemById(
  itemId,
  img_url,
  name,
  quantity_in_stock,
  brand_id,
  price,
  discounted_price,
) {
  try {
    await pool.query(
      `UPDATE items
       SET name = $2,
           quantity_in_stock = $3,
           price = $4,
           discounted_price = $5,
           brand_id = $6,
           img_url = $7
       WHERE item_no = $1`,
      [
        itemId,
        name,
        quantity_in_stock,
        price,
        discounted_price,
        brand_id,
        img_url,
      ],
    );
  } catch (err) {
    console.error('Database query failed:', err.message);
    throw err;
  }
}

async function deleteItemById(itemId) {
  try {
    await pool.query(`DELETE FROM items WHERE item_no = $1`, [itemId]);
  } catch (err) {
    console.error('Database query failed:', err.message);
    throw err;
  }
}

async function updateItemCategories(itemId, categories) {
  try {
    //convert to an array (for cases where only 1 category is chosen)
    if (!Array.isArray(categories)) {
      categories = categories ? [categories] : [];
    }

    await pool.query(`DELETE FROM item_categories WHERE item_id = $1`, [
      itemId,
    ]);
    for (const category of categories) {
      await pool.query(
        `INSERT INTO item_categories (item_id, category_id) 
         VALUES ($1, $2)
         ON CONFLICT (item_id, category_id)
         DO NOTHING`,
        [itemId, category],
      );
    }
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
  updateItemById,
  updateItemCategories,
  deleteItemById,
  getBrandProductCount,
};
