const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const protectRoute = require("../middleware/auth");

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

router.get("/users", protectRoute, isAdmin, adminController.getAllUsers);
router.patch("/users/:id/approve", protectRoute, isAdmin, adminController.approveUser);
router.patch("/users/:id/ban", protectRoute, isAdmin, adminController.banUser);

router.post("/signup", adminController.adminSignup);
router.post("/login", adminController.adminLogin);

router.get("/recipes", protectRoute, isAdmin, adminController.getAllRecipes);
router.delete("/recipes/:id", protectRoute, isAdmin, adminController.deleteRecipe);

module.exports = router;
