import express from "express";
import { google, login, signup } from "../controllers/auth.controller.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.post("/google", google);

export default route;
