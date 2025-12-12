
// import './App.css'
import { useState } from "react";
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Profile from "./components/Profile"
import Answer from "./components/Answer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./components/Post";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "./context/LoginContext";
import News from "./components/News";
import Club from "./components/Club";
import Extra from "./components/Extra";

function App() {
  const [userLogin, setUserLogin] = useState(false);

    

  return (
    <div className="App">
      <Router>
      <LoginContext.Provider value={{ setUserLogin }}>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/answer/:postId" element={<Answer/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/post/" element={<Post />}/>
          <Route path="/news" element={<News />}/>
          <Route path="/club" element={<Club />}/>
          <Route path="/departments" element={<Extra />}/>
        </Routes>
        </LoginContext.Provider>
      </Router>
    </div>      
  );
}

export default App;
