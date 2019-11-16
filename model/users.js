const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  profile_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  provider:{
    type: String,
  },
  role : {
     type: String,
  },
  auth_tocken : {
     type: String,
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
