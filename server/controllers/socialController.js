const { Follow, Activity, User, Recipe } = require("../models");

const followUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id: followId } = req.params;

    if (userId === parseInt(followId))
      return res.status(400).json({ message: "Cannot follow yourself" });

    const exists = await Follow.findOne({ where: { follower_id: userId, following_id: followId } });
    if (exists) return res.status(400).json({ message: "Already following" });

    await Follow.create({ follower_id: userId, following_id: followId });

    await Activity.create({
      user_id: userId,
      type: "FOLLOW_USER",
      payload: { followedUserId: followId },
      recipe_id: null,
    });

    res.status(201).json({ message: "User followed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id: followId } = req.params;

    await Follow.destroy({ where: { follower_id: userId, following_id: followId } });

    await Activity.create({
      user_id: userId,
      type: "UNFOLLOW_USER",
      payload: { unfollowedUserId: followId },
      recipe_id: null,
    });

    res.status(200).json({ message: "User unfollowed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [{ model: User, as: "followers", attributes: ["id", "name", "avatar_url"] }]
    });
    res.status(200).json(user.followers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [{ model: User, as: "following", attributes: ["id", "name", "avatar_url"] }]
    });
    res.status(200).json(user.following);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFeed = async (req, res) => {
  try {
    const userId = req.user.id;

    const following = await Follow.findAll({ where: { follower_id: userId } });
    const followingIds = following.map(f => f.following_id);
    if (followingIds.length === 0) return res.status(200).json([]);

    const activities = await Promise.all(
      followingIds.map(async (fid) => {
        return await Activity.findOne({
          where: { user_id: fid },
          include: [
            { model: User, as: "user", attributes: ["id", "name", "avatar_url"] },
            { model: Recipe, as: "recipe", attributes: ["id", "title"] }
          ],
          order: [["createdAt", "DESC"]],
        });
      })
    );

    const filteredActivities = activities.filter(a => a !== null);

    const feedData = filteredActivities.map(a => ({
      id: a.id,
      user_id: a.user_id,
      user_name: a.user.name,
      user_avatar: a.user.avatar_url,
      action: a.type.replace(/_/g, ' ').toLowerCase(), 
      recipe_id: a.recipe_id,
      recipe_title: a.recipe?.title || "",
      createdAt: a.createdAt
    }));

    res.status(200).json(feedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "avatar_url", "bio","role"],
      include: [
        {
          model: Recipe,
          as: "recipes",
          attributes: ["id"], 
        },
      ],
    });

    const authors = users.map((user) => ({
      id: user.id,
      name: user.name,
      avatar_url: user.avatar_url,
      bio: user.bio,
      recipeCount: user.recipes.length,
      role:user.role
    }));

    res.status(200).json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logRecipeActivity = async (userId, recipeId, type, payload = {}) => {
  await Activity.create({
    user_id: userId,
    type,
    payload,
    recipe_id: recipeId,
  });
};

module.exports = { followUser, unfollowUser, getFollowers, getFollowing, getFeed, getAllAuthors, logRecipeActivity };
