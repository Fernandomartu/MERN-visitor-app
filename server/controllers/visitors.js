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
      OnPremises,
      image,
    } = req.body;

    const user = await User.findById(id);
    const newBarcodeId = user.visitors.length + 1;

    const newVisitor = new Visitor({
      firstName,
      lastName,
      email,
      companyName,
      ExpirationDate,
      phone,
      barcodeId: newBarcodeId,
      OnPremises,
      picturePath: image,
    });
    const visitor = await newVisitor.save();

    user.visitors.push(visitor);
    await user.save();
    res.status(201).json(visitor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVisitor = async (req, res) => {
  try {
    const { visitorId } = req.params;

    const visitor = await Visitor.findById(visitorId);

    res.status(201).json(visitor);
  } catch (err) {}
};

export const updateVisitor = async (req, res) => {
  try {
    console.log("working");
    const {
      visitorId,
      firstName,
      lastName,
      email,
      companyName,
      ExpirationDate,
      phone,
      OnPremises,
      image,
    } = req.body;

    const visitor = await Visitor.findByIdAndUpdate(
      visitorId,
      {
        firstName,
        lastName,
        email,
        companyName,
        ExpirationDate,
        phone,
        OnPremises,
        picturePath: image, // Update the picturePath
      },
      { new: true } // Return the updated visitor
    );

    if (!visitor) {
      return res.status(404).json({ error: "Visitor not found" });
    }

    res.status(201).json(visitor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// export const getUserVisitors = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     const visitors = await Promise.all(
//       user.visitors.map((id) => Visitor.findById(id))
//     );

//     const formattedVisitors = visitors.map(
//       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//         return { _id, firstName, lastName, occupation, location, picturePath };
//       }
//     );
//     res.status(200).json(formattedVisitors);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// export const removeVisitor = async (req, res) => {
//   try {
//     const { id, visitorId } = req.params;
//     const user = await User.findById(id);
//     const visitor = await Visitor.findById(visitorId);

//     if (user.visitors.includes(visitorId)) {
//       user.visitors = user.visitors.filter((id) => id !== visitorId);
//     }
//   } catch (err) {}
// };
