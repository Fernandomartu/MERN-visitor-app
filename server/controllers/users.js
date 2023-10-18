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

/* UPDATE */

export const removeVisitor = async (req, res) => {
  try {
    const { id, visitorId } = req.params;
    const user = await User.findById(id);
    const visitor = await Visitor.findById(visitorId);

    if (user.visitors.includes(visitorId)) {
      user.visitors = user.visitors.filter((id) => id !== visitorId);
    }
  } catch (err) {}
};
