import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed } from "../Store/socialActions";

const Feed = () => {
  const dispatch = useDispatch();
  const { feed } = useSelector((state) => state.social || { feed: [] });

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (!feed.length) return <p className="text-center text-gray-500">No recent activity.</p>;

  return (
    <div className="space-y-4">
      {feed.map((item, idx) => (
        <div key={idx} className="border p-3 rounded-md shadow hover:shadow-md">
          <p className="text-sm text-gray-600">{item.user_name} {item.action} {item.recipe_title}</p>
          <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
