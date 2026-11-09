const categories = document.querySelectorAll('.item-category');

categories.forEach((category) => {
  switch (category.textContent.trim()) {
    case 'Dairy':
      category.classList.add('category-dairy');
      break;
    case 'Baby Items':
      category.classList.add('category-baby');
      break;
    case 'Baking':
      category.classList.add('category-baking');
      break;
    case 'Beverages':
      category.classList.add('category-beverages');
      break;
    case 'Bread & Bakery':
      category.classList.add('category-bread');
      break;
    case 'Canned Goods':
      category.classList.add('category-canned');
      break;
    case 'Condiments & Spices':
      category.classList.add('category-condiments');
      break;
    case 'Deli':
      category.classList.add('category-deli');
      break;
    case 'Fish & Seafood':
      category.classList.add('category-seafood');
      break;
    case 'Frozen Foods':
      category.classList.add('category-frozen');
      break;
    case 'Fruits':
      category.classList.add('category-fruits');
      break;
    case 'Health Care':
      category.classList.add('category-health');
      break;
    case 'Household & Cleaning Supplies':
      category.classList.add('category-household');
      break;
    case 'Meat':
      category.classList.add('category-meat');
      break;
    case 'Pasta, Rice & Cereal':
      category.classList.add('category-pasta');
      break;
    case 'Personal Care':
      category.classList.add('category-personal');
      break;
    case 'Pets':
      category.classList.add('category-pets');
      break;
    case 'Snacks':
      category.classList.add('category-snacks');
      break;
    case 'Vegetables':
      category.classList.add('category-vegetables');
      break;
    case 'Produce':
      category.classList.add('category-produce');
      break;
    default:
      category.classList.add('category-default');
      break;
  }
});
