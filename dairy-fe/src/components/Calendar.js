import React, { useState } from "react";
import "../styles/Calendar.css"; // 스타일 파일

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notes, setNotes] = useState({}); // 날짜별 메모 저장

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

  // 날짜 클릭 시 메모 입력 기능
  const handleDateClick = (day) => {
    const note = prompt("메모 입력:");
    if (note) {
      setNotes({ ...notes, [day]: note });
    }
  };

  return (
    <div className="calendar-container">
      {/* 월 변경 버튼 */}
      <div className="calendar-header">
        <button onClick={goToPrevMonth}>{"<"}</button>
        <h2>{year}. {String(month + 1).padStart(2, "0")}</h2>
        <button onClick={goToNextMonth}>{">"}</button>
      </div>

      {/* 요일 표시 */}
      <div className="calendar-grid">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, index) => (
          <div key={index} className="calendar-day">{day}</div>
        ))}

        {/* 날짜 표시 */}
        {days.map((day, index) => {
          const isToday = day === todayDate && year === todayYear && month === todayMonth;

          return (
            <div
              key={index}
              className={`calendar-cell ${day ? "active" : ""}`}
              onClick={() => day && handleDateClick(day)}
            >
              {/* 오늘 날짜라면 동그라미 컴포넌트 추가 */}
              {isToday && <div className="today-circle"></div>}
              <span className="date-number">{day}</span>
              {notes[day] && <div className="note">{notes[day]}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
