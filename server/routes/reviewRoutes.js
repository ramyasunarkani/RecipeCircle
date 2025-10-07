const express = require("express");
const router = express.Router();
const { addOrUpdateReview, getReviewsForRecipe, deleteReview } = require("../controllers/reviewController");
const protectRoute  = require("../middleware/auth");

router.post("/recipes/:recipeId/reviews", protectRoute, addOrUpdateReview);

router.get("/recipes/:recipeId/reviews", getReviewsForRecipe);

router.delete("/reviews/:id", protectRoute, deleteReview);

module.exports = router;
