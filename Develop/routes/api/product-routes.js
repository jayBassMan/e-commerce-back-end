const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  await Product.findAll({
    attributes:  ["id", "product_name", "price", "stock", "category_id"],
    include: [
      {
        model: Tag,
        attributes: ["id", "tag_name"],
        through: "ProductTag",
      },
      {
        model: Category,
        attributes: ["id", "category_name"],
      },
    ],
  })
  .then((prodData) => {
    res.json(prodData);
  })
  .catch((error) => {
    res.json(error);
  })
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findByPk(req.params.id, {
    include: [
      {
        model: Tag,
        attributes: ["id", "category_name"],
        through: "ProductTag"
      },
      {
        model: Category,
        attributes: ["id", "category_name"],
      },
    ],
  })
  .then((correctProduct) => {
    res.json(correctProduct);
  })
  .catch((error) => {
    res.json(error);
  })
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const prodTagIdArray = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(prodTagIdArray);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((prodTagIds) => res.status(200).json(prodTagIds))
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({where: {product_id: req.params.id} });
    })
    .then((prodTags) => {
      // get list of current tag_ids
      const prodTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProdTags = req.body.tagIds
        .filter((tag_id) => !prodTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const prodTagsRemove = prodTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: prodTagsRemove } }),
        ProductTag.bulkCreate(newProdTags),
      ]);
    })
    .then((updatedProdTags) => res.json(updatedProdTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  let productDelete = Product.findByPk(req.params.id);
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((product) => {
    res.json(`${productDelete} has been removed from the database`);
  })
  .catch((error) => {
    res.json(error);
  });
});

module.exports = router;
