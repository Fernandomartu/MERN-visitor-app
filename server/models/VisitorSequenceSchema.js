import mongoose from "mongoose";

const visitorSequenceSchema = new mongoose.Schema({
  visitorId: {
    type: String,
    default: "barcodeId",
    unique: true,
  },
  sequenceValue: {
    type: Number,
    default: 0,
  },
});

const VisitorSequenceSchema = mongoose.model(
  "VisitorSequence",
  visitorSequenceSchema
);

export default VisitorSequenceSchema;
