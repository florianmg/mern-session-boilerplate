const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.checkAuth = async (req, res, next) => {
  return res.json({ auth: true, user: req.session.user });
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) throw new Error('User not found');

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!validPassword) throw new Error("Password and email doesn't match");
    req.session.userId = user._id;

    return res.status(200).json({
      message: 'successfull connection',
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

exports.register = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      createdAt: Date.now(),
    });
    const save = await newUser.save();
    if (!save)
      throw new Error(
        'Error while trying to create the user. Please try again later',
      );

    return res.status(201).json({ message: 'user created successfully' });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

exports.logout = async (req, res, next) => {
  try {
    const destroy = await req.session.destroy();
    if (destroy) res.clearCookie('auth', { path: '/', domain: 'localhost' });
    return res.status(200).json({ message: 'user successfully logged out' });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
