// Example
const authMiddleware = (req, res, next) => {
  /// auth verifications ...
  // if user exists
  const user = {
    id: 1,
    username: "admin",
    password: "admin",
  };

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = user;
  next();
};

export default authMiddleware;
