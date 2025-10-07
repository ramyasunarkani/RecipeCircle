const User = require("./User");
const Recipe = require("./Recipe");
const Favorite = require("./Favorite");
const Collection = require("./Collection");
const CollectionItem = require("./CollectionItem");
const Review = require("./Review");
const Follow = require("./Follow");
const Activity = require("./Activity");

User.hasMany(Recipe, { foreignKey: "user_id", as: "recipes" });
Recipe.belongsTo(User, { foreignKey: "user_id", as: "author" });

User.belongsToMany(Recipe, { through: Favorite, as: "favorites", foreignKey: "user_id" });
Recipe.belongsToMany(User, { through: Favorite, as: "likedBy", foreignKey: "recipe_id" });

User.hasMany(Collection, { foreignKey: "user_id", as: "collections" });
Collection.belongsTo(User, { foreignKey: "user_id" });
Collection.belongsToMany(Recipe, { through: CollectionItem, as: "recipes", foreignKey: "collection_id" });
Recipe.belongsToMany(Collection, { through: CollectionItem, as: "collections", foreignKey: "recipe_id" });

User.hasMany(Review, { foreignKey: "user_id" });
Recipe.hasMany(Review, { foreignKey: "recipe_id" });
Review.belongsTo(User, { foreignKey: "user_id", as: "user" });
Review.belongsTo(Recipe, { foreignKey: "recipe_id", as: "recipe" });

User.belongsToMany(User, { through: Follow, as: "followers", foreignKey: "following_id", otherKey: "follower_id" });
User.belongsToMany(User, { through: Follow, as: "following", foreignKey: "follower_id", otherKey: "following_id" });

User.hasMany(Activity, { foreignKey: "user_id" });
Activity.belongsTo(User, { foreignKey: "user_id", as: "user" });

Recipe.hasMany(Activity, { foreignKey: "recipe_id" });
Activity.belongsTo(Recipe, { foreignKey: "recipe_id", as: "recipe" });

module.exports = { User, Recipe, Favorite, Collection, CollectionItem, Review, Follow, Activity };
