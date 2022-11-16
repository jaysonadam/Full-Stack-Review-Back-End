const router = require("express").Router();

const postLoginUserRouter = require("./post.students");
const postRegisterUserRouter = require("./post.students");

const getAllUsersRouter = require("./get.students");
const getUserByIdRouter = require("./get.students");

const putUserDetailsRouter = require("./put.students");

router.use(putUserDetailsRouter);

router.use(postLoginUserRouter);
router.use(postRegisterUserRouter);

router.use(getAllUsersRouter);
router.use(getUserByIdRouter);

module.exports = router;