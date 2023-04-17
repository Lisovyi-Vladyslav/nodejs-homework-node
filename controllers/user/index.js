const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const updateAvatars = require("./updateAvatars");
const repeatedVerify = require("./repeatedVerify");
const verificationRequest = require("./verificationRequest");

module.exports = {
   register,
   login,
   logout,
   current,
   updateAvatars,
   repeatedVerify,
   verificationRequest
}