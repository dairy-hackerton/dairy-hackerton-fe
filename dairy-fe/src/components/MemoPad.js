import React, { useState } from "react";
import "../styles/MemoPad.css"; // 스타일 파일
import { useNavigate } from "react-router-dom"; // 마이페이지 이동용

const MemoPad = () => {
  const [goal, setGoal] = useState("2/26 카부캠 해커톤 수상!"); // 할 일 / 목표
  const [tone, setTone] = useState("반말"); // 어투 설정
  const navigate = useNavigate(); // 마이페이지 이동

  return (
    <div className="memo-section">
      <h3>📒 MEMO</h3>

      {/* 1️⃣ 할 일 / 목표 섹션 */}
      <div className="todo">
        <h4>🎯 한달 목표</h4>
        <p>{goal}</p>
      </div>

      {/* 2️⃣ 어투 설정 섹션 */}
      <div className="tone">
        <h4>📝 어투 설정</h4>
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="반말">반말</option>
          <option value="존댓말">존댓말</option>
          <option value="문어체">문어체</option>
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
