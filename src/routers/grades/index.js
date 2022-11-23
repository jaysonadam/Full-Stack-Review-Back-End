const router = require("express").Router();

const getGradesByIdRouter = require('./get.grades');

router.use(getGradesByIdRouter);

module.exports = router;