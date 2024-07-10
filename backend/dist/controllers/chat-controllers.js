import User from "../models/User.js";
import { configGemini } from "../config/gemini-config.js";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: "User Not Registered or Token Malfunctioned" });
        // grab chats of user
        // send all chats with new one to gemini API
        let chats = [];
        // const chats = user.chats.map(({ role, parts }) => ({
        //   role,
        //   parts,
        // }));
        for (const chat of user.chats) {
            chats.push({ role: chat.role, parts: [{ text: chat.parts[0].text }] });
        }
        chats.push({ role: "user", parts: [{ text: message }] });
        // ------------------------
        // console.log(chats, chats[0].parts);
        // ---------------------------
        const model = configGemini();
        const chat = model.startChat({
            history: chats,
            generationConfig: { maxOutputTokens: 1000 },
        });
        const result = await chat.sendMessage(message);
        // console.log("response: ", result.response.text());
        user.chats.push({ role: "user", parts: [{ text: message }] });
        user.chats.push({
            role: "model",
            parts: [{ text: result.response.text() }],
        });
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Something went wrong. Please try again later." });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res
                .status(401)
                .json({ "Permissions didn't match: ": "Unauthorized" });
        }
        return res.status(200).json({
            message: "OK",
            chats: user.chats,
        });
    }
    catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ Message: "Internal Server Error", cause: err.message });
    }
};
export const deleteChat = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res
                .status(401)
                .json({ "Permissions didn't match: ": "Unauthorized" });
        }
        // @ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({
            message: "OK",
        });
    }
    catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ Message: "Internal Server Error", cause: err.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map