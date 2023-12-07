const jwt = require("jsonwebtoken");

exports.Protect = async (req, res, next) => {
  try {
    let authToken;

    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      authToken = req.headers.authorization.split(" ")[1];
    } else {
      return res.status(401).json({
        status: "failed",
        description: "Unauthorized: Missing or invalid authorization header",
      });
    }

    if (!authToken) {
      return res.status(401).json({
        status: "failed",
        description: "Unauthorized: Token is missing",
      });
    }

    const decodedToken = await jwt.verify(authToken, process.env.JWT_SECRET);

    if (decodedToken.exp < Date.now() / 1000) {
      return res.status(401).json({
        status: "failed",
        description: "Unauthorized: Token has expired",
      });
    }
    req.user = decodedToken;

    next();
  } catch (error) {
    // Log the error for debugging
    console.error("Token Verification Error:", error);

    return res.status(401).json({
      status: "failed",
      description: "Unauthorized: Invalid token",
    });
  }
};
