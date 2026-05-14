import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    logger.info("Connection to DB Successful");
  } catch (error) {
    logger.error("Connection to DB Failed");
    process.exit(1);
  }
}

export default connect;
