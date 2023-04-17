const Users = require('../../models/user/usersSchema');

   
const verificationRequest = async (req, res, next) => {
    try {
       
        const { verificationToken } = req.params;

        const user = await Users.findOne({ verificationToken });

        if (!user) return res.status(401).json({ message: "User not found" });
        
 
        user.verificationToken = null;
        user.verify = true;

       await user.save();

         res.status(200).json({ message: 'Verification successful' })
        
    } catch (err) {
        next(err);
    }
  
};

module.exports = verificationRequest;