const router = require("express").Router();

const getSubmittedHwRouter = require('./get.submit');

router.use(getSubmittedHwRouter);

module.exports = router;