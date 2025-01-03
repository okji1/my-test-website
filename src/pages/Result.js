import React from "react";
import { useLocation } from "react-router-dom";

function Result() {
  const location = useLocation(); // Test.js에서 전달된 데이터를 가져옴
  const { answers } = location.state || { answers: [] };

  return (
    <div>
      <h1>Test Results</h1>
      <ul>
        {answers.map((ans, index) => (
          <li key={index}>
            Question {ans.questionId}: {ans.answer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Result;
