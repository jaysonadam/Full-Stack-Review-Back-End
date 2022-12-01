const router = require("express").Router();

const getAllGradesRouter = require('./get.grades');
const getGradesRouter = require('./get.grades');

router.use(getAllGradesRouter);
router.use(getGradesRouter);

module.exports = router;