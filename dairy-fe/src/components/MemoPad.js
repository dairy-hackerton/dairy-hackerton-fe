import React, { useState } from "react";
import "../styles/MemoPad.css"; // 스타일 파일
import { useNavigate } from "react-router-dom"; // 마이페이지 이동용

const MemoPad = ({ onDataChange }) => {
  const [goal, setGoal] = useState("2/26-28 카부캠 해커톤 수상!"); // 할 일 / 목표
  const [tone, setTone] = useState("데일리"); // 어투 설정
  const navigate = useNavigate(); // 마이페이지 이동

  // ✅ 목표 변경 시 Calendar에 전달
  const handleGoalChange = (event) => {
    const newGoal = event.target.value;
    setGoal(newGoal);
    onDataChange({ goal: newGoal });
  };

  // ✅ 어투 변경 시 Calendar에 전달
  const handleToneChange = (event) => {
    const newTone = event.target.value;
    setTone(newTone);
    onDataChange({ tone: newTone });
  };

  return (
    <div className="memo-section">
      <h3>📒 MEMO</h3>

      {/* 1️⃣ 할 일 / 목표 섹션 */}
      <div className="todo">
        <h4>🎯 한달 목표</h4>
        <p>- {goal}</p>
        <p>- 주 100시간 코딩!</p>
      </div>

      {/* 2️⃣ 어투 설정 섹션 */}
      <div className="tone">
        <h4>📝 어투 설정</h4>
        <select value={tone} onChange={handleToneChange}>
          <option value="데일리">데일리</option>
          <option value="MZ 세대">MZ 세대</option>
          <option value="사극">사극</option>
          <option value="직장인">직장인</option>
          <option value="공주">공주</option>
          <option value="사춘기 중학생">사춘기 중학생</option>
          <option value="제주도 사투리">제주도 사투리</option>
        </select>
        <p>현재 어투: <strong>{tone}</strong></p>
      </div>

      <div className="my-page">
        <button onClick={() => navigate("/mypage")}>마이페이지로 이동</button>
      </div>
    </div>
  );
};

export default MemoPad;
