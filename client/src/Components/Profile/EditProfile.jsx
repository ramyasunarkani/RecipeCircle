import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../Store/authActions";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null); 
  const [preview, setPreview] = useState(null); 

  useEffect(() => {
    if (authUser) {
      setName(authUser.name || "");
      setBio(authUser.bio || "");
      setPreview(authUser.avatar_url || null);
    }
  }, [authUser]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    if (avatar) formData.append("image", avatar); 

    dispatch(updateProfile(formData));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center">
          {preview && (
            <img
              src={preview}
              alt="avatar preview"
              className="w-24 h-24 rounded-full mb-2 object-cover"
            />
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={isUpdatingProfile}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {isUpdatingProfile ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
