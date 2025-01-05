import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 결과 페이지 이동을 위한 훅
import Question from "./Question";
import "./Test.css"; // 스타일링 파일

// 질문 데이터
const questions = [
    {
      id: 1,
      question: "휴일에 가장 하고 싶은 활동은?",
      options: ["조용히 책을 읽거나 혼자만의 시간을 즐긴다.", "친구들과 만나거나 밖에서 활동한다."],
      resultMapping: { "조용히 책을 읽거나 혼자만의 시간을 즐긴다.": "I", "친구들과 만나거나 밖에서 활동한다.": "E" }
    },
    {
      id: 2,
      question: "결정을 내릴 때 나는?",
      options: ["데이터를 분석하고 논리적으로 판단한다.", "사람의 감정과 분위기를 고려한다."],
      resultMapping: { "데이터를 분석하고 논리적으로 판단한다.": "T", "사람의 감정과 분위기를 고려한다.": "F" }
    },
    {
      id: 3,
      question: "계획을 세울 때 나는?",
      options: ["미리 철저히 준비하고 일정대로 움직인다.", "상황에 따라 유연하게 움직인다."],
      resultMapping: { "미리 철저히 준비하고 일정대로 움직인다.": "J", "상황에 따라 유연하게 움직인다.": "P" }
    },
    {
      id: 4,
      question: "새로운 환경에 적응할 때 나는?",
      options: ["신중하게 관찰하고 천천히 적응한다.", "빠르게 상황을 이해하고 적응한다."],
      resultMapping: { "신중하게 관찰하고 천천히 적응한다.": "S", "빠르게 상황을 이해하고 적응한다.": "N" }
    },
    {
      id: 5,
      question: "친구와 대화할 때 나는?",
      options: ["깊고 의미 있는 대화를 선호한다.", "가볍고 재미있는 대화를 즐긴다."],
      resultMapping: { "깊고 의미 있는 대화를 선호한다.": "I", "가볍고 재미있는 대화를 즐긴다.": "E" }
    },
    {
      id: 6,
      question: "문제가 생겼을 때 나는?",
      options: ["체계적으로 해결책을 찾는다.", "문제의 원인과 사람들의 감정을 함께 고려한다."],
      resultMapping: { "체계적으로 해결책을 찾는다.": "T", "문제의 원인과 사람들의 감정을 함께 고려한다.": "F" }
    },
    {
      id: 7,
      question: "어떤 계획을 세울 때 나는?",
      options: ["세부적인 내용을 꼼꼼히 계획한다.", "전체적인 그림만 구상하고 진행하며 조정한다."],
      resultMapping: { "세부적인 내용을 꼼꼼히 계획한다.": "J", "전체적인 그림만 구상하고 진행하며 조정한다.": "P" }
    },
    {
      id: 8,
      question: "새로운 아이디어를 생각할 때 나는?",
      options: ["현실적이고 실용적인 아이디어를 떠올린다.", "창의적이고 색다른 아이디어를 떠올린다."],
      resultMapping: { "현실적이고 실용적인 아이디어를 떠올린다.": "S", "창의적이고 색다른 아이디어를 떠올린다.": "N" }
    },
    {
      id: 9,
      question: "여행을 갈 때 나는?",
      options: ["철저히 계획하고 움직이는 것을 선호한다.", "그때그때 기분에 따라 행동하는 것을 좋아한다."],
      resultMapping: { "철저히 계획하고 움직이는 것을 선호한다.": "J", "그때그때 기분에 따라 행동하는 것을 좋아한다.": "P" }
    },
    {
      id: 10,
      question: "집안에서 시간을 보낼 때 나는?",
      options: ["혼자만의 시간을 가지며 여유를 즐긴다.", "가족이나 친구와 함께 시간을 보낸다."],
      resultMapping: { "혼자만의 시간을 가지며 여유를 즐긴다.": "I", "가족이나 친구와 함께 시간을 보낸다.": "E" }
    },
    {
      id: 11,
      question: "문제를 해결할 때 나는?",
      options: ["이성적이고 체계적으로 접근한다.", "감정과 직관을 활용해 접근한다."],
      resultMapping: { "이성적이고 체계적으로 접근한다.": "T", "감정과 직관을 활용해 접근한다.": "F" }
    },
    {
      id: 12,
      question: "창의적인 프로젝트를 할 때 나는?",
      options: ["실현 가능한 결과에 집중한다.", "독창적인 아이디어를 실현해보는 데 흥미를 느낀다."],
      resultMapping: { "실현 가능한 결과에 집중한다.": "S", "독창적인 아이디어를 실현해보는 데 흥미를 느낀다.": "N" }
    }
  ];
  
  function Test() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();
  
    // MBTI 결과 계산 함수
    const calculateMBTI = (answers) => {
      const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  
      answers.forEach((ans) => {
        const result = questions.find((q) => q.id === ans.questionId)?.resultMapping[ans.answer];
        if (result) {
          counts[result]++;
        }
      });
  
      return (
        (counts.E >= counts.I ? "E" : "I") +
        (counts.S >= counts.N ? "S" : "N") +
        (counts.T >= counts.F ? "T" : "F") +
        (counts.J >= counts.P ? "J" : "P")
      );
    };
  
    const handleAnswer = (answer) => {
      const newAnswer = { questionId: questions[currentQuestionIndex].id, answer };
  
      setAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers, newAnswer];
  
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          const mbtiResult = calculateMBTI(updatedAnswers);
          navigate("/result", { state: { mbti: mbtiResult } });
        }
  
        return updatedAnswers;
      });
    };
  
      // 진행률 계산
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="test">
      <div className="progress-container">
        {/* 진행률 바 */}
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
        <p className="progress-text">
          {currentQuestionIndex + 1} / {questions.length} 질문 완료
        </p>
      </div>
      <Question
        question={questions[currentQuestionIndex].question}
        options={questions[currentQuestionIndex].options}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

export default Test;