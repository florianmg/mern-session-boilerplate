const auth = (req, res, next) => {
  if (!req.session || !req.session.userId)
    return res
      .status(403)
      .json({ message: 'User is not logged in', auth: false });
  next();
};

module.exports = auth;
