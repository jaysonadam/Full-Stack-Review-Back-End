const router = require("express").Router();

const getSubmittedHwRouter = require('./get.submit');
const getAllSubmittedHwRouter = require('./get.submit');

router.use(getSubmittedHwRouter);
router.use(getAllSubmittedHwRouter);

module.exports = router;