const router = require("express").Router();

const getAllSubjectsRouter = require('./get.subjects');

router.use(getAllSubjectsRouter);


module.exports = router;