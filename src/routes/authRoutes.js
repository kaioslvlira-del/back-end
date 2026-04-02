import { Router } from "express";
import passport from "passport";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { isAuth } from "../middlewares/auth.js";

const router = Router();

// LOGIN
router.get("/discord", passport.authenticate("discord"));

// CALLBACK
router.get(
  "/discord/callback",
  passport.authenticate("discord", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
  },
);

// GET USER
router.get("/me", isAuth, getProfile);

// 🔥 ESSENCIAL PRA SALVAR
router.put("/me", isAuth, updateProfile);

// LOGOUT
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "logout" });
  });
});

export default router;
