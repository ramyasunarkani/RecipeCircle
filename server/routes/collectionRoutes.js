const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/auth');
const collectionController = require('../controllers/collectionController');

router.post('/', protectRoute, collectionController.createCollection);
router.get('/', protectRoute, collectionController.getCollections);
router.post('/:collectionId/add/:recipeId', protectRoute, collectionController.addRecipeToCollection);
router.delete('/:collectionId/remove/:recipeId', protectRoute, collectionController.removeRecipeFromCollection);

module.exports = router;
