import React from "react";
import "./Club.css"; // Separate CSS file for club section
import Navbar from "./Navbar";

const Club = () => {
  return (
    <div><Navbar   />
    <div className="club-section">
    

      <div className="box-1">
        <h3 className="club">Clubs:</h3>
      </div>

      <div className="club-card">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQTJi4LSnM9sj20fLP2FqGRPDtNK4xxbp9Ow&s"
          alt="club"
          className="club-image"
        />
      </div>

      <div className="club-card">
        <img
          src="https://ldce.ac.in/upload/logo/club/vox-populi-magazine.jpg"
          alt="club"
          className="club-image"
        />
      </div>
      <div className="club-card">
        <img
          src="https://ldce.ac.in/upload/logo/club/team-robocon-ldce.png"
          alt="club"
          className="club-image"
        />
      </div>
      <div className="club-card">
        <img
          src="https://ldce.ac.in/upload/logo/club/coders-club.jpg"
          alt="club"
          className="club-image"
        />
      </div>
      <div className="club-card">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvWpUPI732VFIR58lblmduYXVw-mpM8SrLvQ&s"
          alt="club"
          className="club-image"
        />
      </div>
      <div className="club-card">
        <img
          src="https://ldce.ac.in/upload/logo/club/ieee-ldce.gif"
          alt="club"
          className="club-image"
        />
      </div>
      <div className="club-card">
        <img
          src="https://ldce.ac.in/upload/logo/club/sae-india-collegiate-club-ldce.jpg"
          alt="club"
          className="club-image"
        />
      </div>
      <div className="club-card">
        <img
          src="https://media.licdn.com/dms/image/C5103AQGO1OEWQHfXoA/profile-displayphoto-shrink_200_200/0/1516959381183?e=2147483647&v=beta&t=y8H-BDGBlWN7uUlxLNfpLEc7LHTOXdHv_Fg0T3dnpeM"
          alt="club"
          className="club-image"
        />
      </div>
    </div>
    </div>
  );
};

export default Club;
