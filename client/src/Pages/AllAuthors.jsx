import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuthors,
  followUser,
  unfollowUser,
  fetchFollowing,
} from "../Store/socialActions";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AllAuthors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authors, following } = useSelector((state) => state.social);
  const { authUser } = useSelector((state) => state.auth);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  useEffect(() => {
    dispatch(fetchAuthors());
    if (authUser?.id) dispatch(fetchFollowing(authUser.id));
  }, [dispatch, authUser]);

  const handleFollow = async (authorId) => {
    if (!authUser) {
      toast.error("You must be logged in to follow authors!");
      navigate("/login");
      return;
    }
    try {
      await dispatch(followUser(authorId));
    } catch (err) {
      console.error("Follow failed:", err);
      toast.error("Failed to follow. Please try again.");
    }
  };

  const handleUnfollow = async (authorId) => {
    if (!authUser) {
      toast.error("You must be logged in to unfollow authors!");
      navigate("/login");
      return;
    }
    try {
      await dispatch(unfollowUser(authorId));
    } catch (err) {
      console.error("Unfollow failed:", err);
      toast.error("Failed to unfollow. Please try again.");
    }
  };

  const isFollowing = (authorId) =>
    following.some((f) => f.id === authorId);



  const visibleAuthors = authors.filter((author) => author.role !== "admin");

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-6 text-center">All Authors</h1>

      <div className="flex flex-col gap-6">
        {visibleAuthors.map((author) => (
          <div
            key={author.id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition"
          >
            <img
              src={author.avatar_url || "/avatar.png"}
              alt={author.name}
              className="w-20 h-20 rounded-full object-cover"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">{author.name}</h2>

              {selectedAuthor === author.id ? (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    {author.bio || "No bio available"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Recipes added: <b>{author.recipeCount || 0}</b>
                  </p>
                  <button
                    onClick={() => setSelectedAuthor(null)}
                    className="text-sm text-gray-700 underline mt-1"
                  >
                    Hide
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedAuthor(author.id)}
                  className="text-sm text-blue-600 underline mt-1"
                >
                  View More
                </button>
              )}
            </div>

            {authUser?.id !== author.id && (
              <div>
                {isFollowing(author.id) ? (
                  <button
                    onClick={() => handleUnfollow(author.id)}
                    className="px-4 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(author.id)}
                    className="px-4 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                  >
                    Follow
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAuthors;
