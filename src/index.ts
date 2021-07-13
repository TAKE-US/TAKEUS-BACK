import express from "express";
const app = express();
import connectDB from "./Loader/db";

// Connect Database
connectDB();

app.use(express.urlencoded());
app.use(express.json());

// Define Routes
app.use("/api/dogs", require("./api/dogs"));
app.use("/api/airports", require("./api/airports"));
app.use("/api/reviews", require("./api/reviews"));
app.use("/api/login", require("./api/login"));
app.use("/api/email", require("./api/email"));

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app
  .listen(5000, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: 5000 🛡️
    ################################################
  `);
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });
