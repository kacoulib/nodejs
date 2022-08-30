const partityMiddleware = (req, res, next) => {
  const { number } = req.params;

  // is not a number
  if (isNaN(number)) {
    return res.status(500).json({ message: `${number} n'est pas un nombre !` });
  }

  req.message = `Le nombre ${number} est ${
    number % 2 === 0 ? "pair" : "impair"
  }.`;
  next();
};

export default partityMiddleware;
