const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
//
dotenv.config({ path: "./.env" });

// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, {}).then((conn) => {
  console.log(conn.connections);
});

const port = process.env || 4000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);

});
