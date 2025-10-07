import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFollowing,
  followUser,
  unfollowUser,
} from "../../Store/socialActions";

const Following = () => {
  const dispatch = useDispatch();
  const { following } = useSelector((state) => state.social);
  const { authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser?.id) {
      dispatch(fetchFollowing(authUser.id));
    }
  }, [dispatch, authUser]);

  const handleFollow = async (userId) => {
    try {
      await dispatch(followUser(userId));
    } catch (err) {
      console.error("Follow failed", err);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await dispatch(unfollowUser(userId));
    } catch (err) {
      console.error("Unfollow failed", err);
    }
  };

  if (!following.length) return <p className="p-6">You are not following anyone yet.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-[#1E4B6D]">Following</h2>

      <div className="space-y-4">
        {following.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center border p-4 rounded-md shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.avatar_url || "/default-avatar.png"}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>

            {user.isFollowing ? (
              <button
                onClick={() => handleUnfollow(user.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => handleFollow(user.id)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Follow
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Following;
