const { login, register, logout, getUsers } = require("../controllers/userController.js");

const express=require("express")
const router = express.Router()


router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.get('/',getUsers);

module.exports = router;