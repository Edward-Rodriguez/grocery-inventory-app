import * as db from '../db/queries.js';

async function getCategories(req, res) {
  const categories = await db.getAllCategories();
  const unCategorizedItems = await db.getUncategorizedItems();

  for (const category of categories) {
    const count = (await db.getCategoryProductCount(category.id)).count;
    category.productCount = Number(count);
  }

  res.render('manageCategories', {
    title: 'Manage Categories',
    categories: categories,
    unCategorized: unCategorizedItems,
  });
}

async function addNewCategory(req, res) {
  const { category } = req.body;
  await db.addCategory(category);
  res.redirect('/categories/manage');
}

async function deleteCategory(req, res) {
  const { categoryId } = req.params;
  await db.deleteCategoryById(categoryId);
  res.redirect('/categories/manage');
}

export { getCategories, deleteCategory, addNewCategory };
