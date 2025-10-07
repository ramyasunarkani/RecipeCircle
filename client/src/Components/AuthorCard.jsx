import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser, fetchFollowing } from "../Store/socialActions";
import toast from "react-hot-toast";

const AuthorCard = ({ authorId, authorName, authorAvatar }) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const { following = [] } = useSelector((state) => state.social);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (authUser?.id) {
      dispatch(fetchFollowing(authUser.id));
    }
  }, [dispatch, authUser?.id]);

  useEffect(() => {
    setIsFollowing(following.some((f) => f.id === authorId));
  }, [following, authorId]);

  const handleFollowToggle = async () => {
    if (!authUser?.id) return toast.error("Login to follow authors.");

    try {
      if (isFollowing) {
        await dispatch(unfollowUser(authorId));
        toast.success("Unfollowed successfully");
      } else {
        await dispatch(followUser(authorId));
        toast.success("Followed successfully");
      }

      dispatch(fetchFollowing(authUser.id));
    } catch (err) {
      console.error(err);
      toast.error("Action failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-between border-t pt-4 mt-8">
      <div className="flex items-center gap-3">
        <img
          src={authorAvatar || "/avatar.png"}
          alt={authorName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-[#1E4B6D]">{authorName}</h3>
        </div>
      </div>

      {authUser?.id && authUser.id !== authorId && (
        <button
          onClick={handleFollowToggle}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isFollowing
              ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
              : "bg-[#1E4B6D] text-white hover:bg-[#163955]"
          }`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default AuthorCard;
