import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Profile from './pages/profile';
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

            <Route path="/" element={<Home />} />


            <Route path="/profile" element={<Profile />} />


          </Routes> :

          <Routes>

            <Route path="/" element={<h1>signup</h1>} />

          </Routes>}

      </Router>



    </div>
  );
}

export default App;
