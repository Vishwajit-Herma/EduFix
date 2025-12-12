import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "./Home.css";
import './Modal.css'; 
import Posts from "./Posts"
import News from './News';
import Club from './Club';
import Extra from './Extra';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function Home() {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");
  const [users, setUsers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [likedPosts, setLikedPosts] = useState(() => {
    const storedLikes = localStorage.getItem("likedPosts");
    return storedLikes ? JSON.parse(storedLikes) : {};
  });
  const [expandedPosts, setExpandedPosts] = useState({});
  const [filteredUsers, setFilteredUsers] = useState([]);
  const openModal = (image) => {
    setSelectedImage(image);  // Set the clicked image
    setModalOpen(true);       // Open modal
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage('');     // Clear selected image when modal is closed
  };
  useEffect(() => {
    localStorage.setItem("current_theme", theme);
    fetch("http://localhost:8000/getPost")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
        setFilteredUsers(result);
      })
      .catch((err) => console.log(err));
  }, [theme]);

  // Function to filter based on search
  const handleSearch = (searchTerm) => {
    const filtered = users.filter((user) => {
      const fullName = user.postedBy.fullName.toLowerCase();
      const title = user.title.toLowerCase();
      const description = user.text.toLowerCase();
      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        title.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredUsers(filtered);
  };

  const handleSuggestionClick = (suggestion) => {
    // When a suggestion is clicked, only show posts related to that suggestion
    setFilteredUsers([suggestion]);
  };

  const handleLike = async (postId) => {
    if (likedPosts[postId]) return; // Prevent double liking
  
    // Find the user whose post is being liked
    const userIndex = users.findIndex((user) => user._id === postId);
  
    if (userIndex === -1) return; // If post not found, exit
  
    // Optimistically update the like count
    const updatedUsers = [...users];
    updatedUsers[userIndex].likes += 1;
  
    setUsers(updatedUsers); // Update state to reflect the new like count
  
    try {
      const response = await fetch(`http://localhost:8000/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        // If the response fails, revert the like count
        updatedUsers[userIndex].likes -= 1;
        setUsers(updatedUsers);
        return;
      }
  
      const data = await response.json();
  
      // Ensure the like count matches the server's value
      const refreshedUsers = [...updatedUsers];
      refreshedUsers[userIndex].likes = data.likes;
  
      setUsers(refreshedUsers); // Final state update with correct data from the server
  
      // Update the localStorage and the likedPosts state
      const updatedLikedPosts = { ...likedPosts, [postId]: true };
      setLikedPosts(updatedLikedPosts);
      localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
  
    } catch (error) {
      console.log("Error liking post:", error);
  
      // If there's an error, revert the optimistic update
      updatedUsers[userIndex].likes -= 1;
      setUsers(updatedUsers);
    }
  };
  
  const toggleDescription = (postId) => {
    setExpandedPosts((prevExpandedPosts) => ({
      ...prevExpandedPosts,
      [postId]: !prevExpandedPosts[postId],
    }));
  };

  return (
    <div className={`homepage ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} onSearch={handleSearch} onSuggestionClick={handleSuggestionClick} />
      
      <div className="main-content">
      <Posts/>
      <div>
        {filteredUsers
          .slice()
          .reverse()
          .map((user) => (
            <div key={user._id} className="post-card">
              <div className="user-info">
                <img
                  src={`http://localhost:8000/` + user.postedBy.profilePhoto}
                  alt="Profile"
                  className="user-photo"
                />
                <h2>{user.postedBy.fullName}</h2>
                <p className="role">
                  {user.postedBy.role.charAt(0).toUpperCase() + user.postedBy.role.slice(1)}
                </p>
              </div>
              <div className="post-content">
                <h2 className="title">{user.title}</h2>
                <div className="description">
                  {expandedPosts[user._id] || user.text.length <= 100
                    ? user.text
                    : `${user.text.substring(0, 100)}...`}
                  {user.text.length > 100 && (
                    <button className="read-more-button" onClick={() => toggleDescription(user._id)}>
                      {expandedPosts[user._id] ? "Show Less" : "Read More"}
                    </button>
                  )}
                </div>
                <img src={`http://localhost:8000/` + user.image}  onClick={() => openModal(`http://localhost:8000/` + user.image)}   alt="Post" className="post-image thumbnail" />
                {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedImage} alt="Enlarged Post" className="modal-image" />
          </div>
        </div>
      )}
              </div>
              <div className="post-actions">
                <button
                  className={`like-button ${likedPosts[user._id] ? "liked" : ""}`}
                  onClick={() => handleLike(user._id)}
                  disabled={likedPosts[user._id]}
                >
                  {likedPosts[user._id] ? "Liked" : "Like"}
                </button>
                <span className="likes-count">Likes: {user.likes}</span>

                <Link className="answer-link" to={`/answer/${user._id}`}>
                  Answer
                </Link>
              </div>
            </div>
          ))}
          </div>
      </div>
    </div>
  );
}

export default Home;
