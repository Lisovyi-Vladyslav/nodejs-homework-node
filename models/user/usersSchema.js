const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
     required: [true, 'Verify token is required'],
    nullable: true
  },
  avatarURL: String,
  token: String
});

userSchema.pre('save', async function (next) {
  if (this.isNew) {
     this.avatarURL = gravatar.url(`${this.email}`, {s: '250', d: 'retro'}, false);
  }

  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
  next();
});

// Custom method
userSchema.methods.checkPassword = (candidate, hash) => bcrypt.compare(candidate, hash);

const Users = model('users', userSchema);

module.exports = Users;