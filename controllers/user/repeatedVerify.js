// const Users = require('../../models/user/usersSchema');

const Users = require("../../models/user/usersSchema");
const sendEmail = require("../../services/emailService");
// const Email = require("../../services/emailService");

const repeatedVerify = async (req, res, next) => {
    try {
        const { email } = req.body;
        
         if (!email) return res.status(400).json({ message: "missing required field email" });
        
        const user = await Users.findOne({ email }).select('+verificationToken');

        const { verificationToken, verify } = user;
        
         if (verify) return res.status(400).json({ message: "Verification has already been passed" });
        
        const mail = {
        to: email,
        subject: "Verify your mail!",
        html: `<a target="_blank" href="http://localhost:3000/api/users/veryfy/${verificationToken}">Click me to verify!</a>` 
    };

    sendEmail(mail);
        
        res.status(200).json({ message: 'Verification successful' })
        
    } catch (err) {
        next(err);
    }
  
};

module.exports = repeatedVerify;