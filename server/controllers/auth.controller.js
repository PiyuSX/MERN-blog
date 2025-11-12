//Help me Copilot
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

//Register a user

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      email,
      password: hashedPassword,
    };
    await User.create(newUser);
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Login a user

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, validUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: userPassword, ...userData } = validUser.toObject();

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
      })
      .json({ message: "Login successful", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Google Authentication either Login or Signup

export const googleAuth = async (req, res) => {
  const { name, email, imgURL } = req.body;
  try {
    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Something went wrong with Google Auth" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const { password, ...userData } = existingUser.toObject();
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          path: '/',
        })
        .json({ message: "Login successful", user: userData });
    } else {
      const tempPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      const generatedUsername =
        name.toLowerCase().split(" ").join("") +
        Math.floor(100 + Math.random() * 900);

      const newUser = {
        username: generatedUsername,
        email,
        imgURL,
        password: hashedPassword,
      };
      await User.create(newUser);
      //We can directly use Given details here but for better practice we will fetch from DB //Piyush
      const createdUser = await User.findOne({ email });
      const token = jwt.sign({ id: createdUser._id, isAdmin: createdUser.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const { password, ...userData } = createdUser.toObject();
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          path: '/',
        })
        .json({ message: "Account Created Successfully", user: userData });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
