const express = require("express");
const router = express.Router();
const protectRoute = require("../middleware/auth");
const socialController = require("../controllers/socialController");

router.post("/users/:id/follow", protectRoute, socialController.followUser);
router.delete("/users/:id/unfollow", protectRoute, socialController.unfollowUser);

router.get("/users/:id/followers", protectRoute, socialController.getFollowers);
router.get("/users/:id/following", protectRoute, socialController.getFollowing);

router.get("/feed", protectRoute, socialController.getFeed);
router.get("/authors", socialController.getAllAuthors);


module.exports = router;
