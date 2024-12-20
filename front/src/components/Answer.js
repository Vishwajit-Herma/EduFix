import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Answer.css";
import { useParams } from "react-router-dom";

function Answer() {
  const [answers, setAnswers] = useState([]); // To store answers for the selected post
  const [selectedPostId, setSelectedPostId] = useState(null); // To track which post's answers are being viewed
  const [answerText, setAnswerText] = useState("");
  const [answerImage, setAnswerImage] = useState(null);
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");
  const { postId } = useParams(); // Get the postId from URL parameters

  useEffect(() => {
    if (postId) {
      setSelectedPostId(postId); // Set the selected post ID
      fetchAnswers(postId);
    }
  }, [postId]);

  const handleAnswerChange = (e) => {
    setAnswerText(e.target.value);
  };

  const handleFileChange = (e) => {
    setAnswerImage(e.target.files[0]);
  };

  const fetchAnswers = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/getanswers/${postId}`
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Fetched answers:", result); // Log fetched answers
        setAnswers(result); // Set answers state
      } else {
        console.error("Error fetching answers");
      }
    } catch (err) {
      console.error("Error fetching answers:", err);
    }
  };

  const handleAnswerSubmit = async () => {
    const formData = new FormData();
    formData.append("answerText", answerText);
    formData.append("answerImage", answerImage);
    formData.append("postId", selectedPostId);

    const response = await fetch(`http://localhost:8000/answer`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      setAnswerText(""); // Clear the input field
      setAnswerImage(null); // Clear the image input
      setAnswers((prevAnswers) => [...prevAnswers, result.answer]); // Add new answer to existing list
    } else {
      console.error("Error submitting answer");
    }
  };

  return (
    <div className="containerr">
      {/* Answer Section (above posts) */}
      {selectedPostId && (
        <div className="answer-section">
          <h2>Answers</h2>
          <div className="add-answer-form">
            <textarea
              value={answerText}
              onChange={handleAnswerChange}
              placeholder="Enter your answer..."
              className="answer-textarea"
              rows="4"
            ></textarea>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="choose"
            />
            <button onClick={handleAnswerSubmit} className="submit-btn">
              Submit Answer
            </button>
          </div>

          {/* Existing answers */}
          {answers.length > 0 ? (
            answers
              .slice()
              .reverse()
              .map((answer) => (
                <div key={answer._id} className="answer-card">
                  <div className="answer-user">
                    <img
                      src={
                        `http://localhost:8000/` + answer.postedBy.profilePhoto
                      } // Ensure correct image source
                      alt="Profile"
                      className="user-photo"
                    />
                    <p className="name-answer">{answer.postedBy.fullName}</p>
                    <p className="role2">{answer.postedBy.role}</p>
                  </div>
                  <p>{answer.answerText}</p>
                  {answer.answerImage && (
                    <img
                      src={`http://localhost:8000/files/` + answer.answerImage}
                      alt="Answer"
                      className="answer-image"
                    />
                  )}
                </div>
              ))
          ) : (
            <p>No answers yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Answer;
