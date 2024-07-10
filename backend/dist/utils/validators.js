import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        else {
            return res.status(422).json({ errors: errors.array() });
        }
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Invalid email"),
    body("password")
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("Password should be atleast 6 characters long"),
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
];
//# sourceMappingURL=validators.js.map