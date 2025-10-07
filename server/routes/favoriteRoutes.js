const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/auth');
const favoriteController = require('../controllers/favoriteController');

router.post('/:recipeId', protectRoute, favoriteController.addFavorite);
router.delete('/:recipeId', protectRoute, favoriteController.removeFavorite);
router.get('/', protectRoute, favoriteController.getFavorites);

module.exports = router;
