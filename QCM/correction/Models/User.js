import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserShema = new Schema({
  firstName: {
    type : String,
    required: true,
  },
  lastName: {
    type : String,
    required: true,
  },
  email: {
    type : String,
    required: true,
  },
  password: {
    type : String,
    required: true,
  },
  token:{
    type: String
  }
});

const UserModel = model('users', UserShema);

export default UserModel;
