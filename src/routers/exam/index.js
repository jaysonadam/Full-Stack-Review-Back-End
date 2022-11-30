const router = require("express").Router();

const getExamIdRouter = require('./get.exam');

router.use(getExamIdRouter);

module.exports = router;