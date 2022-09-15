const router = require("express").Router();

const postLoginUserRouter = require("./post.users");

const getAllUsersRouter = require("./get.users");
const getUserByIdRouter = require("./get.users");

router.use(postLoginUserRouter);

router.use(getAllUsersRouter);
router.use(getUserByIdRouter);

module.exports = router;