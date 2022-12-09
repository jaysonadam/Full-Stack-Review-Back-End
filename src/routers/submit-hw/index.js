const router = require("express").Router();

const getSubmittedHwRouter = require('./get.submit');
const getAllSubmittedHwRouter = require('./get.submit');

const postSubmitRouter = require('./post.submit');

router.use(getSubmittedHwRouter);
router.use(getAllSubmittedHwRouter);

router.use(postSubmitRouter);

module.exports = router;