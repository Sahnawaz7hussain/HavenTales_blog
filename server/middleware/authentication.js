const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const isToken = req.headers.authorization || null;
  if (isToken) {
    const token = isToken.split(" ")[1];
    // verify token;
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) return res.status(401).json("Invalid token!");
      req.body.userId = decoded.userId;
      next();
    });
  } else {
    res.status(400).json("bad request!");
  }
};

module.exports = { authentication };
