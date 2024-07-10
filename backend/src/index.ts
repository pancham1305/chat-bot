import app from "./app.js";
import { connect } from "./db/connection.js";
connect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server is running");
    });
  })
  .catch((error) => {
    console.log(error);
  });
