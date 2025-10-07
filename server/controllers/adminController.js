const { User, Recipe } = require("../models");
const { generateToken } = require("../utils/token-gen");
const bcrypt = require("bcryptjs");

const adminSignup = async (req, res) => {
  const { name, email, password, secretKey } = req.body;

  try {
    if (!name || !email || !password || !secretKey) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: "Invalid admin secret key" });
    }

    const existingAdmin = await User.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      is_approved: true,
    });

    const token = generateToken(admin.id);

    res.status(201).json({
      message: "Admin signup successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Error in adminSignup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ where: { email, role: "admin" } });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin.id);

    res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Error in adminLogin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: "user" },
      attributes: ["id", "name", "email", "is_banned", "is_approved", "createdAt"],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const approveUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id, role: "user" } });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.is_approved = true;
    user.is_banned = false; 
    await user.save();

    res.status(200).json({ message: "User approved", user });
  } catch (error) {
    console.error("Error approving user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const banUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id, role: "user" } });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.is_banned = true;
    user.is_approved = false; 
    await user.save();

    res.status(200).json({ message: "User banned", user });
  } catch (error) {
    console.error("Error banning user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      include: [{ model: User, as: "author", attributes: ["id", "name", "email"] }],
    });
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    await recipe.destroy();
    res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  adminSignup,
  adminLogin,
  getAllUsers,
  approveUser,
  banUser,
  getAllRecipes,
  deleteRecipe,
};
