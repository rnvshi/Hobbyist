import LoginForm from "./components/login"
import './App.css';
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
// import { useQuery } from "apollo/client"
function App() {
  // const { data, loading, error } = useQuery(QueryMe)
  // const user = data?.me
  const user = true // Delete once replaced with real user
  return (

    <div className="App">
      <Router>


        {user ?
          <>
            <Navigation />
            <Routes>




              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/friendprofile" element={<FriendProfile />} /> {/* // need ---> /:id */}
              <Route path="/post" element={<Post />} />
              <Route path="/albumview" element={<Albumview />} />

            </Routes>
            <Footer />
          </> :


          <Routes>
            <Route path="/" element={<SignupPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />


          </Routes>}

      </Router>




    </div>
  );
}

export default App;
