import express from "express";
import { createUser, login } from "../controllers/auth-controller";

const router = express.Router()



//post::
router.post("/register", createUser)
router.post("/login", login)

module.exports = router;