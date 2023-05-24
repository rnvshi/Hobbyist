import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import './App.css';
import { setContext } from "@apollo/client/link/context"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CreatePost from "./pages/createPost"
import Profile from './pages/profile';
import Navigation from "./components/navBar"
import Search from './pages/search';
import SignupPage from './pages/signuppage';
import LoginPage from "./pages/login";
import Feed from "./pages/feed";
import Footer from "./components/footer";
import Gallery from "./pages/gallery"
import AlbumCreate from "./pages/albumcreate";
import Post from './pages/post';


import Auth from "./utils/auth"

import { UserProvider } from "./utils/userContext";
import React from "react";

const httpLink = createHttpLink({
  uri: "/graphql"
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})







function App() {

  const user = Auth.loggedIn(); 
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <div className="App" id="page-container">
          <Router>
            {user ?
              <>
                <Navigation />
                <Routes>
                  <Route path="/profile/me" element={<Profile />} />
                  <Route path="/profile/:userId" element={<Profile />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/createPost" element={<CreatePost />} />
                  <Route path="/album/:albumId" element={<Gallery />} />
                  <Route path="/albumcreate" element={<AlbumCreate />} />
                  <Route path="/post/:postId" element={<Post />} />
                  <Route path="/*" element={<Feed />} />
                </Routes>
                <Footer id="footer" />
              </> :
              <Routes>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/*" element={<LoginPage />} />
              </Routes>}
          </Router>
        </div>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
