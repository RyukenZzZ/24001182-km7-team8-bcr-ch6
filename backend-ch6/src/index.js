require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const express = require("express");
const router = require("./routes");
const { errorHandler, notFoundURLHandler } = require("./middlewares/errors");
const fileUpload = require("express-fileupload");

const app = express();
const port = process.env.PORT || 3000;

/* Enable CORS */
app.use(cors());

app.use(express.json());

app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "ping successfully" });
});

app.use("/", router);

app.use("*", notFoundURLHandler);
app.use(errorHandler);

//port listener
app.listen(port, () => {
  console.log(`app listening into port ${port}`);
});
