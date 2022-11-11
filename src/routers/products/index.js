const router = require("express").Router();

const postNewProduct = require('./post.products');

const putProductDetails = require('./put.products');

const getAllProducts = require('./get.products');

router.use(postNewProduct);

router.use(putProductDetails)

router.use(getAllProducts);

module.exports = router;