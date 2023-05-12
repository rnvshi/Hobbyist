import LoginForm from "./components/login"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Profile from './pages/profile';
//import Login from './components/login';
//import Signup from './components/signup';
import Search from './pages/search';
import SignupPage from './pages/signuppage';
import LoginPage from "./pages/login";
import Feed from "./pages/feed";
// import { useQuery } from "apollo/client"
function App() {
  // const { data, loading, error } = useQuery(QueryMe)
  // const user = data?.me
  const user = true // Delete once replaced with real user
  return (

    <div className="App">
      <Router>

        <navBar />


        {user ?
          <Routes>




            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/feed" element={<Feed />} />


          </Routes> :

          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />


          </Routes>}

      </Router>


    </div>
  );
}

export default App;
