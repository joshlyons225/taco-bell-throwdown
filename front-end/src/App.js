import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// import all sections from pages dir here
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Champion from "./components/Champion";
import Throwdown from "./components/Throwdown";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Profile from "./components/Profile";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function Main() {
  return (
    <div>
      <Navbar />
      <Home />
      <Champion />
      <Throwdown />
      <Profile />
      {/* <ReplyWall /> */}
      {/* <ReplyForm /> */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="main">
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
