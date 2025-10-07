const { Review, Recipe, User } = require("../models");

const addOrUpdateReview = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { rating, comment } = req.body;

    if (!rating) return res.status(400).json({ message: "Rating is required" });

    let review = await Review.findOne({ where: { user_id: req.user.id, recipe_id: recipeId } });

    if (review) {
      review.rating = rating;
      review.comment = comment;
      await review.save();
      return res.status(200).json({ message: "Review updated", review });
    }

    review = await Review.create({
      rating,
      comment,
      user_id: req.user.id,
      recipe_id: recipeId
    });

    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getReviewsForRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const reviews = await Review.findAll({
      where: { recipe_id: recipeId },
      include: [{
        model: User,
        as: "user", 
        attributes: ["id", "name", "avatar_url"]
      }]
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);

    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user_id !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    await review.destroy();
    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addOrUpdateReview, getReviewsForRecipe, deleteReview };
