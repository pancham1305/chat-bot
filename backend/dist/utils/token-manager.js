import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
};
export const verifyToken = (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim === "") {
        return res.status(401).json({ Message: "Token Not Recieved" });
    }
    return new Promise((resolve, reject) => {
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
//# sourceMappingURL=token-manager.js.map