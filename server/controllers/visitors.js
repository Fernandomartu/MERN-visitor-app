import User from "../models/user.js";
import Visitor from "../models/Visitor.js";
import VisitorSequenceSchema from "../models/VisitorSequenceSchema.js";

export const createVisitor = async (req, res) => {
  try {
    const {
      id,
      firstName,
      lastName,
      email,
      companyName,
      ExpirationDate,
      phone,
    } = req.body;

    console.log("req body", req.body);
    const user = await User.findById(id);

    const visitorSequence = await VisitorSequenceSchema.findOneAndUpdate(
      { visitorId: "barcodeId" },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );

    const newBarcodeId = visitorSequence.sequenceValue;

    const newVisitor = new Visitor({
      firstName,
      lastName,
      email,
      companyName,
      ExpirationDate,
      phone,
      barcodeId: newBarcodeId,
    });

    const savedVisitor = await newVisitor.save();

    user.visitors.push(savedVisitor);
    res.status(201).json(savedVisitor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserVisitors = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const visitors = await Promise.all(
      user.visitors.map((id) => Visitor.findById(id))
    );

    const formattedVisitors = visitors.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedVisitors);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
