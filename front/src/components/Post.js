import React, { useState, useEffect } from 'react'
import './post.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useActionData } from 'react-router-dom'
import {Alert} from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';





const Post = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [file, setFile] = useState()
  const [image, setImage] = useState()
  const [editorHtml, setEditorHtml] = useState('');
  const [isPosted, setIsPosted] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [textError, setTextError] = useState('');
 



  const handleTitleChange = (e) => {
    const input = e.target.value;
    if (input.length <= 80) { // Limit title to 100 characters
      setTitle(input);
      setTitleError(''); // Clear error if within the character limit
    } else {
      setTitleError('Title cannot exceed 80 characters'); // Set error if character limit is exceeded
    }
  };

  const handleTextChange = (e) => {
    const input = e.target.value;
    if (input.length <= 1000) { // Limit text to 500 characters
      setText(input);
      setTextError(''); // Clear error if within the character limit
    } else {
      setTextError('Text cannot exceed 1000 characters'); // Set error if character limit is exceeded
    }
  };


  const handleUpload = (e) => {
    e.preventDefault();
    if (title.length > 80) {
      setTitleError('Title cannot exceed 80 characters');
      return;
    }

    if (text.length > 500) {
      setTextError('Text cannot exceed 1000 characters');
      return;
    }

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("text", text);
    formdata.append('file', file);

    // Get JWT token from localStorage or another storage
   

    axios.post('http://localhost:8000/upload', formdata, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt") ,// Send the JWT token with the request
        'Content-Type': 'multipart/form-data'  // Required for file upload
      }
    })
    .then(res => {
      console.log(res);
      setIsPosted(true);
      navigate('/home');
      alert('Posted Successfully!');
    })
    .catch(err => console.log(err));
  };

  
  return (
    <div className='create-post'>
        <h1 className='text'>Create a post</h1>
        <form className='post-form' >
        <div className='post-box1'>
          <input
            className='text1'
            id='text2'
            type='text'
            placeholder='Title (max 80 characters)'
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <p className='error-message'>{titleError}</p>}
        </div>
            <div className='file'>
              <input type='file' className='file-input' accept= ".jpg,.jprg,.png,.pdf" onChange={e => setFile(e.target.files[0])}/>
            
            </div>
            <textarea
          className='quill'
          placeholder='Write something... (max 1000 characters)'
          value={text}
          onChange={handleTextChange}
        />
        {textError && <p className='error-message'>{textError}</p>}
            <button type='submit' className='submit'  onClick={handleUpload}
 >Post</button>
        </form>
    
    </div>
  );
}

export default Post





