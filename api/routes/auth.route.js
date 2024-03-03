import express from "express";
import {
  google,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.post("/google", google);
route.get("/logout", logout);

export default route;
