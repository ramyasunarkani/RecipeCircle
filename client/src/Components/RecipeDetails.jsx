import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import {
  fetchReviews,
  addOrUpdateReview,
  deleteReview,
} from "../Store/reviewActions";
import { fetchRecipeById } from "../Store/recipeActions";

const RecipeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: reviews, isLoading } = useSelector((state) => state.reviews);
  const { currentRecipe, isLoading: recipeLoading } = useSelector((state) => state.recipes);
  const { authUser } = useSelector((state) => state.auth);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchRecipeById(id));
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  const userReview = authUser ? reviews.find(r => r.user_id === authUser.id) : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!authUser) return alert("Please login to add a review.");
    dispatch(addOrUpdateReview(id, { rating, comment }));
    setRating(0);
    setComment("");
    setEditing(false);
  };

  const handleEdit = () => {
    if (userReview) {
      setRating(userReview.rating);
      setComment(userReview.comment);
      setEditing(true);
    }
  };

  const handleDelete = (reviewId) => {
    dispatch(deleteReview(reviewId));
    setEditing(false);
    setRating(0);
    setComment("");
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {recipeLoading ? (
        <p>Loading recipe...</p>
      ) : currentRecipe ? (
        <>
          <h1 className="text-3xl font-bold text-[#1E4B6D] mb-4">{currentRecipe.title}</h1>
          <img
            src={currentRecipe.image_url || "/recipe.png"}
            alt={currentRecipe.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-700 mb-6">{currentRecipe.description}</p>
          <p className="text-sm text-gray-500 mb-6">
            Difficulty: {currentRecipe.difficulty.charAt(0).toUpperCase() + currentRecipe.difficulty.slice(1)}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Dietary: {currentRecipe.dietary.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(", ")}
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-[#1E4B6D]">Reviews</h2>
          {isLoading ? (
            <p>Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review!</p>
          ) : (
            <div className="space-y-4 mb-6">
              {reviews.map((r) => (
                <div key={r.id} className="border rounded-lg p-4 shadow-sm">
                  <div
                    className="flex items-center gap-2 mb-2 cursor-pointer"
                    onClick={() => navigate(`/profile/${r.user_id}`)}
                  >
                    <img
                      src={r.user?.avatar_url || "/avatar.png"}
                      alt={r.user?.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium">{r.user?.name}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < r.rating ? "text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{r.comment}</p>
                  {authUser?.id === r.user_id && !editing && (
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={handleEdit}
                        className="text-blue-600 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="text-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {authUser && (editing || !userReview) && (
            <form onSubmit={handleSubmit} className="border p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">{editing ? "Edit Your Review" : "Add Your Review"}</h3>
              <div className="flex gap-2 mb-3">
                {[...Array(5)].map((_, i) => {
                  const starValue = i + 1;
                  return (
                    <FaStar
                      key={i}
                      size={28}
                      className={`cursor-pointer ${
                        starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  );
                })}
              </div>
              <textarea
                className="w-full border rounded-md p-2 mb-3"
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-[#1E4B6D] text-white px-4 py-2 rounded hover:bg-[#163a54]"
              >
                {editing ? "Update Review" : "Submit Review"}
              </button>
            </form>
          )}

          {!authUser && <p className="text-gray-600">Login to add a review.</p>}
        </>
      ) : (
        <p>Recipe not found.</p>
      )}
    </div>
  );
};

export default RecipeDetails;
