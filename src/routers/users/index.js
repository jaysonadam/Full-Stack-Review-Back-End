const router = require("express").Router();

const postLoginUserRouter = require("./post.users");
const postRegisterUserRouter = require("./post.users");

const getAllUsersRouter = require("./get.users");
const getUserByIdRouter = require("./get.users");
const getStudentsByStreamRouter = require("./get.users");

const putUserDetailsRouter = require("./put.users");

router.use(putUserDetailsRouter);

router.use(postLoginUserRouter);
router.use(postRegisterUserRouter);

router.use(getAllUsersRouter);
router.use(getUserByIdRouter);
router.use(getStudentsByStreamRouter);

module.exports = router;