const checkIsAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.json("U have to login first.");
};

const checkIsNotAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.json("U have to login first.");
  }

  next();
};

module.exports = {
  checkIsAuth,
  checkIsNotAuth,
};
