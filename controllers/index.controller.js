const User = require('../models/user.model');

exports.home = async (req, res, next) => {
  try {
    return res.json({
      auth: true,
      user: req.session.userId,
    });
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

exports.dashboard = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) throw new Error("User doesn't exist");

    return res.json({
      auth: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
      },
    });
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};
