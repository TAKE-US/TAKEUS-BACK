import express from "express";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./Loader/db";
import config from "./config";
import requestLog from "./middleware/logger";
import { logger } from "./Logger/logger";
import { RM } from "./utils/responseMessage";

const app = express();

app.use(helmet());

const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

// Connect Database
connectDB();

app.use(express.urlencoded());
app.use(express.json());

// Define Routes
app.use("/", requestLog, require("./routes/index"));

// error handler
app.use(function (err, req, res, next) {
  logger.error("error name : " + err + " error stack : " + err.stack);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  res.status(err.status || 500).send({ error: RM.INTERNAL_SERVER_ERROR });
});

app
  .listen(config.port, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: ${config.port} 🛡️
    ################################################
  `);
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });
