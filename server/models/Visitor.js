import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
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
  barcodeId: {
    type: Number,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
    min: 1,
  },
  email: {
    type: String,
    required: true,
    min: 5,
  },
  OnPremises: {
    type: Boolean,
    required: true,
  },
  ExpirationDate: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    min: 10,
  },
  picturePath: {
    type: String,
    default: "",
  },
  pinCode: {
    type: Number,
    required: true,
    min: 6,
  },
});

const Visitor = mongoose.model("Visitor", visitorSchema);
export default Visitor;
