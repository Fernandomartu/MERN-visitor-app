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
