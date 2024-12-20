import React, { useEffect, useState } from "react";

import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';


export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [enrollment, setenrollment] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  // Toast functions
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  const enrollmentRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    //checking enrollment


    // Sending data to server
    fetch("http://localhost:8000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        enrollment: enrollment,
        password: password

      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error)
        } else {
          alert("Signed Up Successfully")
          notifyB(data.message)
          navigate("/home")
        }
        console.log(data)
      })
  }

  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
         
          <p className="loginPara">
            Sign up to see photos and videos <br /> from your friends
          </p>
          <div>
            <input type="enrollment" name="enrollment" id="enrollment" value={enrollment} placeholder="Enrollment" onChange={(e) => { setenrollment(e.target.value) }} />
          </div>
          <div>
            <input type="text" name="name" id="name" placeholder="Full Name" value={name} onChange={((e) => { setName(e.target.value) })} />
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
          <p
            className="loginPara"
            style={{ fontSize: "12px", margin: "3px 0px" }}
          >
            By signing up, you agree to out Terms, <br /> privacy policy and
            cookies policy.
          </p>
          <input type="submit" id="submit-btn" value="Sign Up" onClick={() => { postData() }} />
        </div>
        <div className="form2">
          Already have an account ?
          <Link to="/">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}