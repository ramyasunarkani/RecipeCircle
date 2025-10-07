const { generateToken } = require("../utils/token-gen");
const bcrypt = require("bcryptjs");
const uploadImageToS3 = require("../utils/uploadToS3"); 
const { User } = require("../models");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar_url: null,
    });

    const token = generateToken(newUser.id);

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        bio: newUser.bio,
        avatar_url: newUser.avatar_url,
        is_banned:newUser.is_banned,
        is_approved:newUser.is_approved
      },
    });
  } catch (error) {
    console.error("Error in signup:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatar_url: user.avatar_url,
        is_banned:user.is_banned,
        is_approved:user.is_approved
      },
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.name) user.name = req.body.name;
    if (req.body.bio) user.bio = req.body.bio;

    if (req.file) {
      const imageUrl = await uploadImageToS3(
        req.file.buffer,
        `user-${req.user.id}-${Date.now()}.jpg`,
        req.file.mimetype
      );
      user.avatar_url = imageUrl;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatar_url: user.avatar_url,
         is_banned:user.is_banned,
        is_approved:user.is_approved
      },
    });
  } catch (error) {
    console.error("Error in update profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signup, login, updateProfile };
