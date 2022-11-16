const router = require("express").Router();

const postLoginTeacherRouter = require('./post.teachers');

router.use(postLoginTeacherRouter);

module.exports = router;