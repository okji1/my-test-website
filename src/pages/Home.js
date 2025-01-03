import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // 스타일링을 위한 CSS 파일 (필요하면 생성)

function Home() {
  return (
    <div className="home">
      <h1>전생에 내가 고양이였다면?</h1>
      <p>맞는 고양이 알아보기</p>
      <Link to="/test">
        <button className="start-button">테스트 시작하기</button>
      </Link>
    </div>
  );
}

export default Home;
