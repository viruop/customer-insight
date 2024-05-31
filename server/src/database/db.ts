import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

function connectDatabase() {
  mongoose.connect(process.env.MONGO_URL!);
  const connection = mongoose.connection;
  connection
    .once("open", () => {
      console.log("Database Connected");
    })
    .on("error", (err) => {
      console.log(`Logged Error: ${err}`);
      connection.close();
    });
}

export default connectDatabase;
