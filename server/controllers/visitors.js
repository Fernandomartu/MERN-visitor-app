import User from "../models/user.js";
import Visitor from "../models/Visitor.js";

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

    const user = await User.findById(id);

    const newVisitor = new Visitor({
      firstName,
      lastName,
      email,
      companyName,
      ExpirationDate,
      phone,
    });

    const savedVisitor = await newVisitor.save();

    user.visitors.push(savedVisitor);
    res.status(201).json(savedVisitor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
