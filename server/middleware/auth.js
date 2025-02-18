import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
  try {
    // Check if the authorization header is present
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      return response.status(401).json({ message: "No authorization token found" });
    }

    const token = authorizationHeader.split(" ")[1]; // Extract the token part from "Bearer <token>"
    
    if (!token) {
      return response.status(401).json({ message: "Authorization token is invalid" });
    }

    const isCustomAuth = token.length < 500;
    let decodedData;
    
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      request.userId = decodedData?.id;
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication Error:", error);
    return response.status(401).json({ message: "Authentication failed" });
  }
};

export default auth;
