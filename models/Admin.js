const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  first_name:{
    type:String
  },
  last_name:{
    type:String
  },
  email: {
    type: String,
    
    required: true,
    unique: true,
  },
  phone:{
    type:String
  },
  password: {
    type: String,
    required: true,
  },
  hashed_password:{
    type: String
  },
  refresh_token: {
    type: String,
    trim: true
  }
},{
  timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);
