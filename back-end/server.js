// dependencies
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const mongoose = require("mongoose");

// import graphQL files
const { typeDefs, resolvers } = require("./schemas");

// import auth file
const { authMiddleware } = require("./utils/auth");

// set PORT env & Apollo server
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// set app with express
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// connect db with mongoose and env
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/taco-bellz", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// set log for executed mongo queries
mongoose.set("debug", true);

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  // port connection listener
  app.listen(PORT, () => {
    console.log(`
  =======================================================================
  🔥🔥  🌮  🔥🔥 Serving Up Deliciousness @ localhost:${PORT} 🔥🔥  🌮  🔥🔥
  =======================================================================
  `);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

// start Apollo server
startApolloServer(typeDefs, resolvers);
