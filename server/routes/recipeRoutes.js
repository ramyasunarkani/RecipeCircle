const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/auth');
const recipeController = require('../controllers/recipeController');
const upload = require('../utils/upload');

router.post('/create', protectRoute, upload.single('image'), recipeController.createRecipe);
router.put('/edit/:id', protectRoute, upload.single('image'), recipeController.updateRecipe);
router.delete('/delete/:id', protectRoute, recipeController.deleteRecipe);
router.get('/all', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipe);

module.exports = router;
