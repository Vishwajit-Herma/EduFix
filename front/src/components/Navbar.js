import './Navbar.css';
import React, { useEffect, useState } from 'react';
import logo_light from '../assests/logo-black.png';
import search_icon_dark from '../assests/search-b.png';
import logo from '../assests/logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onSearch, suggestions = [], onSuggestionClick }) => {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass search term to Home component
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(`${suggestion.postedBy.fullName} - ${suggestion.title}`); // Fill search input
    onSuggestionClick(suggestion); // Trigger parent function to filter posts based on suggestion
  };

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const response = await fetch(`http://localhost:8000/profile/${localStorage.getItem('userId')}`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfilePhoto(data.profilePhoto);
        } else {
          console.error('Failed to fetch profile photo');
        }
      } catch (err) {
        console.error('Error fetching profile photo:', err);
      }
    };

    fetchProfilePhoto();
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className='navbar'>
      <img src={logo} alt='' className='logo' />

      <ul>
        <li className='li'>Home</li>
        <li className='li'>Academics</li>
        <li className='li'>Events</li>
        <li className='li'>About</li>
      </ul>

      <div className='search'>
        <input
          type='text'
          className='t11'
          placeholder='Search'
          value={searchTerm}
          onChange={handleSearch}
        />
        <img src={search_icon_dark} alt='' />
        {suggestions.length > 0 && (
          <ul className='suggestions'>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.postedBy.fullName} - {suggestion.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <img
        onClick={handleProfileClick}
        src={profilePhoto}
        alt="Profile"
        className='toggle'
      />
    </div>
  );
};

export default Navbar;

