const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
    await Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [{
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
      through: "ProductTag",
    },],
  })
  .then((tagData) => {
    res.json(tagData);
  }).catch((error) => {
    res.json(error);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id, {
    include: [{
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
      through: "ProductTag",
    }]
  })
  .then((tagRetrieved) => {
    res.json(tagRetrieved)
  })
  .catch((error) => {
    res.json(error)
  })
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((tagname)  => {
    res.json(tagname);
  })
  .catch((error) => {
    res.json(error)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name,
  },{
    where: {
      id: req.params.id,
    },
  })
  .then((tagname) => {
    res.json(tagname)
  })
  .catch((error) => {
    res.json(error);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((quantityRemoved) => {
    res.json(`${quantityRemoved} has been moved from the database`);
  })
  .catch((error) => {
    res.json(error)
  })
});

module.exports = router;
