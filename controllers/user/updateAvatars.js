// const Users = require('../../models/user/usersSchema');

const ImageService = require("../../services/imageService");

const updateAvatars = async (req, res, next) => {
    try {
        const { file, user } = req
    
        if (file) {
    user.avatarURL = await ImageService.save(file, 'avatars', 'users');
        }
        
        const updatedUser = await user.save();
       
        res.status(200).json({
    user: updatedUser,
        })
        
    } catch (err) {
        next(err);
    }
  
};

module.exports = updateAvatars;