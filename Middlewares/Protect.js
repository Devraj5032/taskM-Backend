const jwt = require("jsonwebtoken");

exports.Protect = async (req, res, next) => {
  try {
    console.log("saefgb");
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

    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);

    if (decodedToken.exp < Date.now() / 1000) {
      return res.status(401).json({
        status: "failed",
        description: "Unauthorized: Token has expired",
      });
    }

    // Log decoded token for debugging
    console.log("Decoded Token:", decodedToken);

    req.user = decodedToken;
    console.log(decodedToken);

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
