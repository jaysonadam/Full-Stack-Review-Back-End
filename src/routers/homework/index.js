const router = require("express").Router();

const getHomeworkByIdRouter = require('./get.hw');
const getHomeworkByStreamRouter = require('./get.hw');
const getHomeworkBySubjectRouter = require('./get.hw');

const postHomeworkRouter = require('./post.hw');

router.use(getHomeworkByIdRouter);
router.use(getHomeworkByStreamRouter);
router.use(getHomeworkBySubjectRouter);

router.use(postHomeworkRouter);

module.exports = router;