import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { validate, chatCompletionValidator } from "../utils/validators.js";
import { generateChatCompletion, sendChatsToUser, deleteChat, } from "../controllers/chat-controllers.js";
const chatRoutes = Router();
// protected API
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChat);
export default chatRoutes;
//# sourceMappingURL=chat.js.map