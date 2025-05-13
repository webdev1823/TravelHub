const mongoose = require("mongoose");

var mongoURL =
  "mongodb+srv://JudeHarrison:Harry$on77@cluster0.lv17i.mongodb.net/mern-tours";

mongoose.connect(mongoURL);

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("MongoDB Connection Failed");
});

connection.on("connected", () => {
  console.log("MongoDB Connection Successful");
});

module.exports = mongoose;
