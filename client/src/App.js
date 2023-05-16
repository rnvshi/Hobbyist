import LoginForm from "./components/login"
import Auth from "./utils/auth"
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import './App.css';
import { setContext } from "@apollo/client/link/context"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./pages/post"
import Profile from './pages/profile';
//import Login from './components/login';
//import Signup from './components/signup';
import Navigation from "./components/navBar"
import Search from './pages/search';
import SignupPage from './pages/signuppage';
import LoginPage from "./pages/login";
import Feed from "./pages/feed";
import FriendProfile from "./pages/friendprofile";
import Footer from "./components/footer";
import Albumview from "./pages/albumview"
import AlbumCreate from "./pages/albumcreate";
// import { useQuery } from "apollo/client"

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
  // const { data, loading, error } = useQuery(QueryMe)
  // const user = data?.me
  const user = Auth.loggedIn(); // Delete once replaced with real user
  return (
    <ApolloProvider client={client}>
      <div className="App" id="page-container">
        <Router>


          {user ?
            <>
              <Navigation />
              <Routes>



                <Route path="/profile/me" element={<Profile />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/friendprofile" element={<FriendProfile />} /> {/* // need ---> /:id */}
                <Route path="/post" element={<Post />} />
                <Route path="/albumview" element={<Albumview />} />
                <Route path="albumcreate" element={<AlbumCreate />} />

              </Routes>
              <Footer id="footer" />
            </> :


            <Routes>
              <Route path="/" element={<SignupPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />


            </Routes>}

        </Router>




      </div>
    </ApolloProvider>
  );
}

export default App;
