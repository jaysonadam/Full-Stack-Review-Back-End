const router = require("express").Router();

const getHomeworkByStreamRouter = require('./get.hw');
const getHomeworkBySubjectRouter = require('./get.hw');

router.use(getHomeworkByStreamRouter);
router.use(getHomeworkBySubjectRouter);

module.exports = router;