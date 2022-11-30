const router = require("express").Router();

const getFilteredGradesRouter = require('./get.grades');
const getGradesByStudentIdRouter = require('./get.grades');
const getStreamGradesRouter = require('./get.grades');
const getGradesByExamIdRouter = require('./get.grades');

router.use(getFilteredGradesRouter);
router.use(getGradesByStudentIdRouter);
router.use(getStreamGradesRouter);
router.use(getGradesByExamIdRouter);

module.exports = router;