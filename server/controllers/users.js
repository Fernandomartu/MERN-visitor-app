import User from "../models/user.js";
import Visitor from "../models/Visitor.js";

/* READ */

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserVisitors = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const visitors = await Promise.all(
      user.visitors.map((id) => Visitor.findById(id))
    );

    if (visitors.length == 0) {
      res.status(200).json({ message: "no visitors found" });
      return;
    }
    const formattedVisitors = visitors.map(
      ({
        _id,
        firstName,
        lastName,
        picturePath,
        ExpirationDate,
        companyName,
        OnPremises,
      }) => {
        return {
          _id,
          firstName,
          lastName,
          picturePath,
          ExpirationDate,
          companyName,
          OnPremises,
        };
      }
    );
    res.status(200).json(formattedVisitors);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const removeVisitor = async (req, res) => {
  try {
    const { id, visitorId } = req.params;

    // Remove the visitor reference from the user's 'visitors' array
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $pull: { visitors: visitorId } },
      { new: true }
    ).populate("visitors");

    // Check if the user exists and the visitor reference was removed
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the visitor document
    await Visitor.deleteOne({ _id: visitorId });
    await updatedUser.save();
    res.status(200).json({
      message: "Visitor removed successfully",
      visitors: updatedUser.visitors,
    });
  } catch (err) {}
};

export const getUserReviews = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(200).json({ message: "No users found" });
      return;
    }
    const formattedUsers = users.map((user) => {
      return {
        review: user.review,
        image: user.picturePath,
        name: `${user.firstName} ${user.lastName}`,
        // Include other user properties you need here
      };
    });

    res.status(200).json(formattedUsers);
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
};
