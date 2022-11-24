const router = require("express").Router();

const getFilteredGradesRouter = require('./get.grades');
const getGradesByStudentIdRouter = require('./get.grades');
const getAllGradesRouter = require('./get.grades');

router.use(getFilteredGradesRouter);
router.use(getGradesByStudentIdRouter);
router.use(getAllGradesRouter);

module.exports = router;