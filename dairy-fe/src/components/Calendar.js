import React, { useState } from "react";
import "../styles/Calendar.css"; // 스타일 파일
import MemoPad from "./MemoPad";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // 현재 연도와 월 가져오기
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 오늘 날짜 가져오기
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate(); // 오늘 날짜 숫자

  // 이전/다음 달 이동
  const goToPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // 현재 월의 첫 번째 요일과 마지막 날짜 계산
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 달력 날짜 배열 생성
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null); // 앞쪽 빈칸
  for (let i = 1; i <= lastDate; i++) days.push(i);


  return (
    <div className="calendar-container">
      {/* 왼쪽 메모장 */}
      <MemoPad />
      {/* 달력 섹션 */}
      <div className="calendar-section">
        <div className="calendar-header">
          <button onClick={goToPrevMonth}>{"<"}</button>
          <h2>{year}. {String(month + 1).padStart(2, "0")}</h2>
          <button onClick={goToNextMonth}>{">"}</button>
        </div>

        <div className="calendar-grid">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, index) => (
            <div key={index} className="calendar-day">{day}</div>
          ))}

          {days.map((day, index) => {
            const isToday = day === todayDate && year === today.getFullYear() && month === today.getMonth();

            return (
              <div
                key={index}
                className={`calendar-cell ${day ? "active" : ""} ${isToday ? "today" : ""}`}
              >
                {isToday && <div className="today-circle"></div>}
                {day && <span className="date-number">{day}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
