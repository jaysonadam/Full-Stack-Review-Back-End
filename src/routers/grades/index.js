const router = require("express").Router();

const getAllGradesRouter = require('./get.grades');
const getSearchGradesRouter = require('./get.grades');

router.use(getAllGradesRouter);
router.use(getSearchGradesRouter);

module.exports = router;