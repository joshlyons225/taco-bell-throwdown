// dependencies
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const mongoose = require("mongoose");

// setup app through express and define port env
const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect db with mongoose and env
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/taco-bellz", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// set log for executed mongo queries
mongoose.set("debug", true);

// port connection listener
app.listen(PORT, () =>
  console.log(`
  =======================================================================
  🔥🔥  🌮  🔥🔥 Serving Up Deliciousness @ localhost:${PORT} 🔥🔥  🌮  🔥🔥
  =======================================================================
  `)
);
