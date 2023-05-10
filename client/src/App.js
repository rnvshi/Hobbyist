import LoginForm from "./components/login"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Profile from './pages/profile';
import Login from './components/login';
import Signup from './components/signup';
import SignupPage from './pages/signuppage';
// import { useQuery } from "apollo/client"
function App() {
  // const { data, loading, error } = useQuery(QueryMe)
  // const user = data?.me
  const user = false // Delete once replaced with real user
  return (

    <div className="App">
      <Router>

        <navBar />


        {user ?
          <Routes>




            <Route path="/profile" element={<Profile />} />


          </Routes> :

          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<Login />} />


          </Routes>}

      </Router>

    
    </div>
  );
}

export default App;
