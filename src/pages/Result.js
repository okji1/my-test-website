import React from "react";
import { useLocation } from "react-router-dom";

function Result() {
  const location = useLocation();
  const { mbti } = location.state || { mbti: "Unknown" };

  return (
    <div>
      <h1>Your MBTI Result</h1>
      <h2>{mbti}</h2>
      <img
        src={`/images/${mbti}.png`} // MBTI 별 이미지 파일
        alt={`${mbti} 이미지`}
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
}

export default Result;