import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ReviewItem = ({ review, authUser, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div
        className="flex items-center gap-2 mb-2 cursor-pointer"
        onClick={() => navigate(`/profile/${review.user_id}`)}
      >
        <img
          src={review.user?.avatar_url || "/avatar.png"}
          alt={review.user?.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium">{review.user?.name}</span>
      </div>

      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>

      <p className="text-gray-700">{review.comment}</p>

      {authUser?.id === review.user_id && (
        <div className="mt-2 flex gap-2">
          <button onClick={() => onEdit(review)} className="text-blue-600 text-sm">
            Edit
          </button>
          <button
            onClick={() => onDelete(review.id)}
            className="text-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
