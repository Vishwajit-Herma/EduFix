import React, { useState, useContext } from "react";
import "./Login.css";

import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { LoginContext } from "../context/LoginContext";

export default function Login() {
  const { setUserLogin } = useContext(LoginContext)
  const navigate = useNavigate();
  const [enrollment, setenrollment] = useState("")
  const [password, setPassword] = useState("")

  // Toast functions
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)



  const postData = () => {

    // Sending data to server
    fetch("http://localhost:8000/", {
      method: "post",
      headers: {
        
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        enrollment: enrollment,
        password: password

      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error)
        } else {
          alert("Signed In Successfully")
          console.log(data)
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          localStorage.setItem('userId', data.user._id);
          setUserLogin(true)
          navigate("/home")
        }
        console.log(data)
      })
  }

  return (
    <div className="signIn">
      <div>
        <div className="loginForm">
        <p className="loginPara">
            Sign In <br /> 
          </p>
          <div>
            <input type="enrollment" name="enrollment" id="enrollment" value={enrollment} placeholder="Enrollment" onChange={(e) => { setenrollment(e.target.value) }} />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>
          <input type="submit" id="login-btn" onClick={() => { postData() }} value="Sign In" />
          <div className="loginForm2">
          Don't have an account ?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
          </Link>
        </div>
        </div>

      </div>
    </div>
  );
}