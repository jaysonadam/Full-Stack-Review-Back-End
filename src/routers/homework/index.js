const router = require("express").Router();

const getHomeworkByStreamRouter = require('./get.hw');

router.use(getHomeworkByStreamRouter);

module.exports = router;