import React from 'react'
import './Posts.css'
import { useNavigate, Link } from "react-router-dom"



const Posts = () => {
  return (
    <div className='post-box'>
      <p className='para'>What do you want to ask or share? </p>
        <Link to="/ask" className="ask">Ask</Link>
        <span className='seperator'></span>
        <Link to="/ans" className="ans">Ans</Link>
        <span className='seperator1'></span>
        <Link to="/post" className="post">Post</Link>
    </div>
  )
}

export default Posts