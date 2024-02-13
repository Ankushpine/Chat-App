const UserModel = require("../model/user-model");
const generateTokenAndSetCookie = require("../util/generateToken");
const bcrypt = require("bcrypt");

module.exports.signUp = async (req, res) => {
  try {
    const { fullName, userName, password, cnfpassword, gender } = req.body;

    if (password != cnfpassword) {
      return res
        .status(400)
        .json({ error: "Password and confirm password don't match." });
    }

    const userExist = await UserModel.findOne({ userName });

    if (userExist) {
      return res.status(400).json({ error: "User already exist." });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const NewUser = new UserModel({
      fullName,
      userName,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (NewUser) {
      generateTokenAndSetCookie(NewUser._id, res);

      await NewUser.save();

      return res.status(201).json({
        _id: NewUser._id,
        fullName: NewUser.fullName,
        userName: NewUser.userName,
        profilePic: NewUser.profilePic,
      });
    } else {
      return res.status(500).json({ error: "Invalid user data." });
    }
  } catch (error) {
    console.log("Error in SignUp Controller :: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await UserModel.findOne({ userName });
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(500).json({ error: "Invalid Credentials." });
    }

    const token = generateTokenAndSetCookie(user._id, res);

    // console.log(token);

    return res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
      token: token,
    });
  } catch (error) {
    console.log("Error in SignIp Controller :: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.signOut = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged Out Successfully." });
  } catch (error) {
    console.log("Error in SignOut Controller :: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
