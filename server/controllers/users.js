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

export const createModule = async (req, res) => {
  try {
    const module = req.body[0];
    const userId = req.body[1];
    const user = await User.findById(userId);
    if (!user) {
      res.status(200).json({ message: "No user found" });
      return;
    }

    user.modules.push(module);
    user.modulesCreated += 1;
    await user.save();
    console.log("module created and saved to user");
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
};

export const getUserModules = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const modules = user.modules;
    if (modules.length == 0) {
      res.status(200).json({ message: "no modules found" });
      return;
    }

    res.status(200).json(modules);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateModule = async (req, res) => {
  try {
    const userId = req.body[0];
    const updatedModule = req.body[1];
    console.log(req.body);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const modules = user.modules;

    // Find the index of the module with matching _id
    const moduleIndex = modules.findIndex(
      (module) => module._id == updatedModule._id
    );

    console.log(moduleIndex);

    if (moduleIndex === -1) {
      return res.status(404).json({ message: "Module not found" });
    }

    // Update the module with the properties from updatedModule
    user.modules[moduleIndex].senderSocketId = updatedModule.senderSocketId;

    user.markModified("modules");

    const finalModule = modules[moduleIndex];
    // Save the updated user object
    await user.save();

    res
      .status(200)
      .json({ message: "Module updated successfully", finalModule });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
