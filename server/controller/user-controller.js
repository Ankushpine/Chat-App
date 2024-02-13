const UserModel = require("../model/user-model");

module.exports.getUsersForSideBar= async(req,res)=>{
    try {

        const logedInUserId = req.user._id;

        const filteredUser = await UserModel.find({_id:{$ne :logedInUserId}}).select("-password");

        return res.status(200).json(filteredUser);
       
    } catch (error) {
        console.log("Error in Get getUsersForSideBar Controller :: ", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}