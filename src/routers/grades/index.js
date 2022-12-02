const router = require("express").Router();

const getStudentGradesRouter = require('./get.grades');
const getAllGradesRouter = require('./get.grades');
const getGradesRouter = require('./get.grades');

router.use(getStudentGradesRouter);
router.use(getAllGradesRouter);
router.use(getGradesRouter);

module.exports = router;