const router = require("express").Router();

const postNewProduct = require('./post.products');

const getAllProducts = require('./get.products');

router.use(postNewProduct);

router.use(getAllProducts);

module.exports = router;