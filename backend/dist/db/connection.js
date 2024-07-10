import mongoose from "mongoose";
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Error connecting to database");
    }
}
async function disconnect() {
    try {
        await mongoose.disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("Error disconnecting from database");
    }
}
export { connect, disconnect };
//# sourceMappingURL=connection.js.map