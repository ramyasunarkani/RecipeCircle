import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addFavorite, removeFavorite } from "../Store/favoriteActions";
import toast from "react-hot-toast";

const FavoriteButton = ({ recipeId }) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const { items: favorites } = useSelector((state) => state.favorites);

  const isFavorited = authUser ? favorites.some(f => f.id === recipeId) : false;

  const handleFavorite = async () => {
    if (!authUser) return toast.error("Login to add to favorites.");
    try {
      if (isFavorited) {
        await dispatch(removeFavorite(recipeId));
      } else {
        await dispatch(addFavorite(recipeId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleFavorite} className="text-2xl">
      {isFavorited ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
    </button>
  );
};

export default FavoriteButton;
