import User from "../models/user.js";
import Visitor from "../models/Visitor.js";

export const returnVisitor = async (data) => {
  try {
    const { userId, barcodeId, pincode } = data.text;

    const user = await User.findById(userId);

    const visitors = await Promise.all(
      user.visitors.map((id) => Visitor.findById(id))
    );

    const matchedVisitor = visitors.filter((visitor) => {
      return (
        visitor.barcodeId.toString() == barcodeId &&
        visitor.pinCode.toString() == pincode
      );
    })[0];

    if (!matchedVisitor) {
      return { message: "Bad Scan" };
    } else {
      return matchedVisitor;
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteModule = async (socket) => {
  try {
    // Find all users
    const users = await User.find({});

    if (users.length === 0) {
      return;
    }

    // Define the socket ID to match against
    const socketId = socket.id;

    // Iterate through each user
    for (const user of users) {
      // Filter the user's modules to keep only those with a different receiverSocketId
      const updatedModules = user.modules.filter(
        (module) => module.receiverSocketId !== socketId
      );

      // Update the user's modules array with the filtered array
      user.modules = updatedModules;

      if (user.modules.length == 0) {
        user.modulesCreated = 0;
      }
      // Save the user to persist the changes
      await user.save();
    }

    console.log("Modules updated successfully");
  } catch (err) {
    console.log(err.message);
  }
};
