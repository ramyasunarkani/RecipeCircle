import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections, removeRecipeFromCollection } from "../../Store/collectionActions";

const Collections = () => {
  const dispatch = useDispatch();
  const { items: collections, loading } = useSelector((state) => state.collections);
  const [expandedCollection, setExpandedCollection] = useState(null);

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  if (loading) return <p>Loading collections...</p>;
  if (!collections.length) return <p>No collections found.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-[#1E4B6D]">My Collections</h2>

      <div className="space-y-4">
        {collections.map((collection) => (
          <div key={collection.id} className="border rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{collection.name}</h3>
              <button
                className="text-sm text-blue-600 underline"
                onClick={() =>
                  setExpandedCollection(
                    expandedCollection === collection.id ? null : collection.id
                  )
                }
              >
                {expandedCollection === collection.id ? "Hide Recipes" : "View Recipes"}
              </button>
            </div>

            {expandedCollection === collection.id && (
              <div className="mt-3 space-y-2">
                {collection.recipes && collection.recipes.length ? (
                  collection.recipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="flex justify-between items-center border p-2 rounded-md"
                    >
                      <span>{recipe.title}</span>
                      <button
                        onClick={() =>
                          dispatch(removeRecipeFromCollection(collection.id, recipe.id))
                        }
                        className="text-sm text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No recipes in this collection.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
