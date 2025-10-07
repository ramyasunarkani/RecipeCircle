import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchReviews,
  addOrUpdateReview,
  deleteReview,
} from "../../Store/reviewActions";
import { fetchRecipeById } from "../../Store/recipeActions";
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";
import FavoriteButton from "../FavoriteButton";
import CollectionManager from "../CollectionManager";
import AuthorCard from "../AuthorCard";


const RecipeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { items: reviews, isLoading } = useSelector((state) => state.reviews);
  const { currentRecipe, isLoading: recipeLoading } = useSelector(
    (state) => state.recipes
  );
  const { authUser } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchRecipeById(id));
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  const userReview = authUser
    ? reviews.find((r) => r.user_id === authUser.id)
    : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!authUser) return alert("Please login to add a review.");
    dispatch(addOrUpdateReview(id, { rating, comment }));
    setRating(0);
    setComment("");
    setEditing(false);
  };

  const handleEdit = (review) => {
    setRating(review.rating);
    setComment(review.comment);
    setEditing(true);
  };

  const handleDelete = (reviewId) => {
    dispatch(deleteReview(reviewId));
    setEditing(false);
    setRating(0);
    setComment("");
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {recipeLoading ? (
        <p>Loading recipe...</p>
      ) : currentRecipe ? (
        <>
          <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
                <img
                  src={currentRecipe.image_url || "/recipe.png"}
                  alt={currentRecipe.title}
                  className="w-full max-h-72 object-contain rounded-lg"
                />
              </div>

              <div className="flex-1 w-full">
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold text-[#1E4B6D] capitalize">
                    {currentRecipe.title}
                  </h1>
                  {authUser && <FavoriteButton recipeId={currentRecipe.id} />}
                </div>

                <p className="text-gray-600 mt-3">{currentRecipe.description}</p>

                <div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-700">
                  <span>
                    <strong className="text-[#1E4B6D]">Difficulty:</strong>{" "}
                    {currentRecipe.difficulty}
                  </span>
                  <span>
                    <strong className="text-[#1E4B6D]">Dietary:</strong>{" "}
                    {Array.isArray(currentRecipe.dietary)
                      ? currentRecipe.dietary.join(", ")
                      : currentRecipe.dietary}
                  </span>
                  <span>
                    <strong className="text-[#1E4B6D]">Cooking Time:</strong>{" "}
                    {currentRecipe.cooking_time} mins
                  </span>
                  <span>
                    <strong className="text-[#1E4B6D]">Servings:</strong>{" "}
                    {currentRecipe.servings}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-[#1E4B6D] mb-2">
                Ingredients
              </h2>
              <ul className="list-disc list-inside text-gray-700">
                {currentRecipe.ingredients?.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold text-[#1E4B6D] mt-4 mb-2">
                Instructions
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {currentRecipe.instructions}
              </p>
            </div>

            {currentRecipe.author && (
              <AuthorCard
                authorId={currentRecipe.author.id}
                authorName={currentRecipe.author.name}
                authorAvatar={currentRecipe.author.avatar_url}
              />
            )}
          </div>

          {authUser && (
            <div className="mb-8">
              <CollectionManager recipeId={currentRecipe.id} />
            </div>
          )}

          <h2 className="text-2xl font-semibold mb-4 text-[#1E4B6D]">Reviews</h2>
          {isLoading ? (
            <p>Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="space-y-4 mb-6">
              {reviews.map((r) => (
                <ReviewItem
                  key={r.id}
                  review={r}
                  authUser={authUser}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {authUser && (editing || !userReview) && (
            <ReviewForm
              editing={editing}
              rating={rating}
              hover={hover}
              comment={comment}
              setRating={setRating}
              setHover={setHover}
              setComment={setComment}
              handleSubmit={handleSubmit}
            />
          )}

          {!authUser && (
            <p className="text-gray-600">
              Login to add a review, favorite, or collection.
            </p>
          )}
        </>
      ) : (
        <p>Recipe not found.</p>
      )}
    </div>
  );
};

export default RecipeDetails;
