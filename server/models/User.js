import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  review: {
    type: String,
    required: false,
    min: 5,
  },
  visitors: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Visitor",
      },
    ],
    default: [],
  },
  picturePath: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
