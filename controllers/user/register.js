const Users = require('../../models/user/usersSchema');
const { v4 } = require("uuid");
// const Email = require('../../services/emailService');
const sendEmail = require('../../services/emailService');

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
    
        const newUser = await Users.create({ password, email, verificationToken: v4()});
        const { subscription, verificationToken } = newUser;
        
         const mail = {
        to: email,
        subject: "Verify your mail!",
        html: `<a target="_blank" href="http://localhost:3000/api/users/veryfy/${verificationToken}">Click me to verify!</a>` 
    };

    sendEmail(mail);

        res.status(201).json({
            user: {
                subscription,
                email
            }
        });
        
    } catch (err) {
        next(err);
    }
  
};

module.exports = register;