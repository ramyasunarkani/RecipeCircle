import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaFolderPlus } from "react-icons/fa";
import { fetchCollections, createCollection, addRecipeToCollection } from "../Store/collectionActions";
import toast from "react-hot-toast";

const CollectionManager = ({ recipeId }) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const { items: collections } = useSelector((state) => state.collections);

  const [newCollectionName, setNewCollectionName] = useState("");

  const handleAddToCollection = async (collectionId) => {
    if (!authUser) return toast.error("Login to add to collection.");
    try {
      await dispatch(addRecipeToCollection(collectionId, recipeId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateCollection = async () => {
    if (!authUser) return toast.error("Login to create collection.");
    if (!newCollectionName.trim()) return toast.error("Collection name required.");
    try {
      const collection = await dispatch(createCollection(newCollectionName));
      setNewCollectionName("");
      await dispatch(addRecipeToCollection(collection.id, recipeId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Add to Collection</h3>
      <div className="flex gap-2 flex-wrap mb-2">
        {collections.map(c => (
          <button
            key={c.id}
            onClick={() => handleAddToCollection(c.id)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="New collection name"
          value={newCollectionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
          className="px-3 py-1 border rounded flex-1"
        />
        <button
          onClick={handleCreateCollection}
          className="px-3 py-1 bg-[#1E4B6D] text-white rounded hover:bg-[#163a54]"
        >
          <FaFolderPlus className="inline mr-1" /> Create
        </button>
      </div>
    </div>
  );
};

export default CollectionManager;
