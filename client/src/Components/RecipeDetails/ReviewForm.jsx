import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({
  editing,
  rating,
  hover,
  comment,
  setRating,
  setHover,
  setComment,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">
        {editing ? "Edit Your Review" : "Add Your Review"}
      </h3>

      <div className="flex gap-2 mb-3">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;
          return (
            <FaStar
              key={i}
              size={28}
              className={`cursor-pointer ${
                starValue <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
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
  );
};

export default ReviewForm;
