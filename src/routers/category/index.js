const router = require("express").Router();

const getCategory = require('./get.category')

router.use(getCategory)

module.exports = router;