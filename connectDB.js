var mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_LINK,{})
  .then(() => {
    console.log("connection successful with database");
  })
  .catch((err) => {
    console.log("Error Got while setupping connection with database :" + err);
  });
