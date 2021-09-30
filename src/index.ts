import express from "express";
import cors from "cors";
import connectDB from "./Loader/db";
import config from "./config";
import logger from "./middleware/logger";

const app = express();

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
app.use("/",logger, require("./routes/index"))

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  res.status(err.status || 500);
  res.render("error");
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
