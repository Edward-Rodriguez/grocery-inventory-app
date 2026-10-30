import * as db from '../db/queries.js';
import { body, validationResult, matchedData } from 'express-validator';

const defaultImage = '../public/no-image.png';
const discountErr = 'Discount price must be less than original price.';
const quantityErr = 'Quantity must be between 0 and 99999';
const urlErr = 'Please enter a valid URL';
const lengthErr = (length) => 'must be between 3 and ' + length + ' characters';

const validateItem = [
  body('imageUrl')
    .trim()
    .optional({ values: 'falsy' })
    .isURL()
    .withMessage(urlErr),
  body('item_name')
    .trim()
    .customSanitizer((value) => (value === '' ? null : value))
    .isLength({ min: 2, max: 255 })
    .withMessage(`Item name ${lengthErr(255)}`),
  body('brand')
    .trim()
    .customSanitizer((value) => (value === '' ? null : value))
    .optional({ values: 'null' }),
  body('categories').trim().optional({ values: 'falsy' }),
  body('quantity_in_stock')
    .trim()
    .isInt({ min: 0, max: 99999 })
    .withMessage(quantityErr),
  body('price')
    .trim()
    .customSanitizer((value) => (value === '' ? null : value))
    .optional({ values: 'null' })
    .isFloat({ min: 0.0, max: 10000.0 })
    .withMessage(quantityErr),
  body('discounted_price')
    .trim()
    .customSanitizer((value) => (value === '' ? null : value))
    .optional({ values: 'null' })
    .isFloat({ min: 0.0, max: 10000.0 })
    .withMessage(quantityErr)
    .custom((value, { req }) => {
      if (value >= Number(req.body.price)) {
        throw new Error(discountErr);
      } else return true;
    }),
];

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

async function addItemGet(req, res) {
  const brands = await db.getAllBrands();
  const categories = await db.getAllCategories();
  res.render('editProduct', {
    title: 'Add Product',
    newProduct: true,
    brands,
    categories,
    item: {
      item_no: null,
      img_url: null,
      item_name: null,
      brand_id: null,
      quantity_in_stock: null,
      price: null,
      discounted_price: null,
      categories: null,
    },
  });
}

const addItemPost = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);

      return res.status(400).render('editProduct', {
        title: 'Add Product',
        errors: errors.array(),
        newProduct: true,
        item: {},
        brands: await db.getAllBrands(),
        categories: await db.getAllCategories(),
      });
    }
    const {
      imageUrl: img_url,
      item_name: name,
      quantity_in_stock,
      brand: brand_id,
      categories,
      price,
      discounted_price,
    } = matchedData(req);
    const newItemId = (
      await db.addItem(
        img_url,
        name,
        quantity_in_stock,
        brand_id,
        price,
        discounted_price,
      )
    ).item_no;

    await db.updateItemCategories(newItemId, categories);
    res.redirect('/');
  },
];

async function editItem(req, res) {
  const { itemId } = req.params;
  const viewData = await getEditItemData(itemId);
  res.render('editProduct', viewData);
}

async function getEditItemData(itemId) {
  const item = await db.getItemById(itemId);
  item.categories = await db.getItemCategoriesByItemId(itemId);
  const brands = await db.getAllBrands();
  const categories = await db.getAllCategories();
  return {
    title: 'Edit Product',
    item,
    brands,
    categories,
    newProduct: false,
  };
}

const updateItemPost = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    const { itemId } = req.params;

    if (!errors.isEmpty()) {
      const viewData = await getEditItemData(itemId);
      console.log(errors);

      return res
        .status(400)
        .render('editProduct', { ...viewData, errors: errors.array() });
    }

    const {
      imageUrl: img_url,
      item_name: name,
      quantity_in_stock,
      brand: brand_id,
      categories,
      price,
      discounted_price,
    } = matchedData(req);
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
  },
];

async function deleteItemPost(req, res) {
  const { itemId } = req.params;
  await db.deleteItemById(itemId);
  res.redirect('/');
}

function calculatePercentOff(discounted_price, price) {
  const percentOff = (1 - discounted_price / price) * 100;
  return Math.round(percentOff);
}

export {
  getItems,
  editItem,
  updateItemPost,
  deleteItemPost,
  addItemPost,
  addItemGet,
};
