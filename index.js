const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config.env" });
}

require("./connectDB");
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "uploads")));
app.use(errorMiddleware);

const userRouter = require("./routes/routerUser");
app.use(userRouter);

app.listen(PORT, () => {
  console.log("server started running");
});
