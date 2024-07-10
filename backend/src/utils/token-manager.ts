import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
import { Request, Response, NextFunction } from "express";
export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  return token;
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim === "") {
    return res.status(401).json({ Message: "Token Not Recieved" });
  }
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
        return res.status(401).send("Unauthorized");
      }
      // return resolve();
      console.log("Token Verified");
      resolve();
      res.locals.jwtData = decoded;
      return next();
    });
  });
};
