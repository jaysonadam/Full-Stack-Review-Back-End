const router = require("express").Router();

const getFilteredGradesRouter = require('./get.grades');
const getGradesByIdRouter = require('./get.grades');
const getAllGradesRouter = require('./get.grades');

router.use(getFilteredGradesRouter);
router.use(getGradesByIdRouter);
router.use(getAllGradesRouter);

module.exports = router;