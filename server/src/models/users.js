const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const {
  authUtils: {
    generateJWT,
  },
} = require('../utils');

const userSchema = new mongoose.Schema({
  _id: { 
    type: String,
    default: uuidv4
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.getJwtToken = function() {
  return generateJWT({
    id: this.id,
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
