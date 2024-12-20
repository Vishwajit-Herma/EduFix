import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    role: '',
    fullName: '',
    profilePhoto: '',
    email: '',
    branch: '',
    bio: '',
    enrollmentNumber: '',
    year: '',
  });

  const fetchProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/profile/${localStorage.getItem('userId')}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt"),// Send the JWT token with the request
          'Content-Type': 'multipart/form-data'  
        },
      });
      if (response.ok) {
        const profile = await response.json();
        setProfileData({
          ...profileData,
          role: profile.role,
          fullName: profile.fullName,
          profilePhoto: profile.profilePhoto,
          email: profile.email,
          branch: profile.branch,
          bio: profile.bio,
          enrollmentNumber: profile.enrollmentNumber,
          year: profile.year,
        });
      } else {
        console.error('Failed to fetch profile data');
      }
    } catch (err) {
      console.error('Error fetching profile data:', err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

 const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('profilePhoto', document.querySelector('input[type="file"]').files[0]);
  formData.append('role', profileData.role);
  formData.append('fullName', profileData.fullName);
  formData.append('email', profileData.email);
  formData.append('branch', profileData.branch);
  formData.append('bio', profileData.bio);

  if (profileData.role === 'student') {
    formData.append('enrollmentNumber', profileData.enrollmentNumber);
    formData.append('year', profileData.year);
  }

  try {
    const response = await fetch('http://localhost:8000/profile', {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      console.log('Profile updated:', data);
      navigate('/home')
    } else {
      console.error('Failed to update profile');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
  return (
    <div className="container">
      <div className="form-container">
        <h2 className="edit">Edit Profile</h2>
        <form className="form1" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="profile-photo">
            {profileData.profilePhoto && (
              <img src={profileData.profilePhoto} alt="Profile" />
            )}
            <input
              type="file"
              name="profilePhoto"
              accept= ".jpg,.jprg,.png,.pdf"
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  profilePhoto: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
          </div>

          <label>Role:</label>
          <select
            name="role"
            className="select"
            value={profileData.role}
            onChange={handleInputChange}
          >
            <option value="role">Select</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>

          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            className="input1"
            value={profileData.fullName}
            onChange={handleInputChange}
            required
          />

          {profileData.role === 'student' && (
            <>
              <label>Enrollment Number:</label>
              <input
                type="text"
                name="enrollmentNumber"
                className="input1"
                value={profileData.enrollmentNumber}
                onChange={handleInputChange}
              />

              <label>Year:</label>
              <input
                type="text"
                name="year"
                className="input1"
                value={profileData.year}
                onChange={handleInputChange}
              />
            </>
          )}

          <label>Branch:</label>
          <input
            type="text"
            name="branch"
            className="input1"
            value={profileData.branch}
            onChange={handleInputChange}
            required
          />

          <label>{profileData.role === 'student' ? 'College Email' : 'Faculty Email'}:</label>
          <input
            type="email"
            name="email"
            className="input1"
            value={profileData.email}
            onChange={handleInputChange}
            required
          />

          <label>Bio:</label>
          <textarea
            name="bio"
            className="input1"
            value={profileData.bio}
            onChange={handleInputChange}
          />

          <button type="submit" className="button1">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
