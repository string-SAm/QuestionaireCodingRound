import "./styles.css";
import { useState } from "react";

const questions = [
  {
    ques: "What is Capital of India?",
    ans: "Delhi",
    options: ["Mumbai", "Delhi", "Kolkata", "Banglore"],
  },
  {
    ques: "What is 2+2?",
    ans: "4",
    options: ["1", "2", "3", "4"],
  },
  {
    ques: "What is Capital of Uttar Pradesh?",
    ans: "Lucknow",
    options: ["Lucknow", "Delhi", "Kolkata", "Banglore"],
  },
  {
    ques: "What is Capital of USA?",
    ans: "Washington D.C.",
    options: ["Mumbai", "Delhi", "America", "Washington D.C."],
  },
  {
    ques: "What is Capital of Haryana?",
    ans: "Chandigarh",
    options: ["Mumbai", "Delhi", "Chandigarh", "Banglore"],
  },
];

export default function App() {
  const [curQuesIndex, setCurIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [res, setRes] = useState([]);
  const [showRes, setShowRes] = useState(false);

  const curQuestion = questions[curQuesIndex];

  const handleOptionClick = (option) => {
    const isCorrect = option === curQuestion.ans;

    // Update state to reflect the selected option
    setSelectedOption(option);
    setRes((prevRes) => [...prevRes, isCorrect]);
    setShowRes(true);

    // Wait for 1 second before moving to the next question
    setTimeout(() => {
      setSelectedOption(null); // Reset selected option
      setShowRes(false); // Hide result
      setCurIndex((prevIndex) => prevIndex + 1); // Move to the next question
    }, 1000);
  };

  return (
    <div className="quizContainer">
      {curQuesIndex < questions.length ? (
        <div className="questionContainer">
          <h2>{curQuestion.ques}</h2>
          <div>
            {curQuestion.options.map((option) => {
              return (
                <button
                  key={option}
                  className={`option-button ${
                    showRes
                      ? option === curQuestion.ans
                        ? "correct" // Green for correct answer
                        : selectedOption === option
                        ? "wrong" // Red for wrong answer
                        : ""
                      : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                  disabled={showRes} // Disable buttons after selection
                >
                  {option}
                </button>
              );
            })}
          </div>
          {showRes && (
            <div>
              {selectedOption === curQuestion.ans ? "Correct!" : "Wrong!"}
            </div>
          )}
        </div>
      ) : (
        <div className="resultsContainer">
          <h2>Quiz Finished!</h2>
          <p>
            You got {res.filter((result) => result).length} out of{" "}
            {questions.length} correct!
          </p>
        </div>
      )}
    </div>
  );
}
