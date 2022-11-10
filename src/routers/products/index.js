const router = require("express").Router();

const postNewProduct = require('./post.products')

router.use(postNewProduct)

module.exports = router;