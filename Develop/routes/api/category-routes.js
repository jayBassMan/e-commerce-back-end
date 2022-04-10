const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  await Category.findAll({
    attributes: ["id", "category_name"],
    include: [{
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"]
    }]
  })
  .then((categories) => {
    res.json(categories);
  })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  await Category.findByPk(req.params.id, {
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      }
    ],
  })
  .then((category) => {
    res.json(category);
  })
  .catch((err) => {
    res.json(err);
  })
});

router.post('/', async (req, res) => {
  // create a new category
  await Category.create(req.body)
    .then((newCategory) => res.status(200).json(newCategory))
    .catch((error) => {
      console.log(error)
      res.status(400).json(error);
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then(cat => Category.findByPk(req.params.id))
  .then((updatedCategory) => res.status(200).json(updatedCategory))
  .catch((err) => {res.json(err);});
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  await Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((updatedCategory) => {
    res.json(`Category has been removed from database`)
  })
  .catch((error) => {
    res.json(err);
  });
});

module.exports = router;
