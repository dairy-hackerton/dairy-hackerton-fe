import React, { useState, useEffect } from "react";
import "../styles/Calendar.css"; // 스타일 파일
import MemoPad from "./MemoPad";
import InputModal from "./InputModal";
import ReadModal from "./ReadModal";
import { getDiaryEntries } from "../utils/api";
import { getDiaryDetail } from "../utils/api";


const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 모달 상태
  const [selectedDate, setSelectedDate] = useState(null); // 클릭한 날짜 저장 
  const [isReadModalOpen, setIsReadModalOpen] = useState(false); // 모달 상태
  const [selectedDiary, setSelectedDiary] = useState(null); // 선택된 일기 데이터
  const [diaryEntries, setDiaryEntries] = useState([
    //TODO: 더미 데이터 삭제
    {
      "date" : 21,
      "summary" : "딥다이브 하고 피곤한 날 🌊 ",
      "mood" : "피곤"
    },
    {
      "date" : 25,
      "summary" : "💡 성공적인 카부캠 아이디어톤",
      "mood" : "기쁨"
    }
  ]); // 월별 일기 메타데이터 리스트 저장


  const moods = {
    "화남": "#FF6565",
    "불안": "#FE9C5B",
    "기쁨": "#EFEC44",
    "평온": "#9EDF84",
    "슬픔": "#5AA5EB",
    "행복": "#E15AB0",
    "피곤": "#9370DB",
  };  

  // MemoPad의 데이터 상태 (Calendar에서 관리)
  const [memoData, setMemoData] = useState({
    goal: "", // 오늘의 목표
    tone: "평범" // 선택된 어투
  });

  // MemoPad에서 데이터를 전달받는 함수
  const handleMemoDataChange = (newData) => {
    setMemoData((prev) => ({ ...prev, ...newData }));
  };

  // 현재 연도와 월 가져오기
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth()+1;

  // 컴포넌트가 처음 렌더링될 때 백엔드에서 특정 연도와 월의 데이터 가져오기
  useEffect(() => {
    // const fetchDiaryEntries = async () => {
    //   const data = await getDiaryEntries(year, month); // ✅ year, month 전달
    //   setDiaryEntries(data);
    // };
    // fetchDiaryEntries();
  }, [year, month]);

  // 오늘 날짜 가져오기
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth()+1;
  const todayDate = today.getDate(); // 오늘 날짜 숫자

  // 이전/다음 달 이동
  const goToPrevMonth = () => setCurrentDate(new Date(year, month-2, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month, 1));

  // 현재 월의 첫 번째 요일과 마지막 날짜 계산
  const firstDay = new Date(year, month-1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();

  // 달력 날짜 배열 생성
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null); // 앞쪽 빈칸
  for (let i = 1; i <= lastDate; i++) days.push(i);

  // 오늘 날짜 클릭 시 모달 열기 (하지만 일기가 있으면 비활성화)
  const handleTodayClick = (day) => {
    const diaryEntry = diaryEntries.find((entry) => entry.date === day);
    if (!diaryEntry && day === todayDate && year === todayYear && month === todayMonth) {
      setSelectedDate(`${year}-${month + 1}-${day}`);
      setIsWriteModalOpen(true);
    }
  };
  // 일기 버튼 클릭 시 해당 날짜의 상세 일기를 요청
  const handleReadDiary = async (day) => {
    const diaryEntry = diaryEntries.find((entry) => entry.date === day);
    if (!diaryEntry) return;
  
    try {
      //const detailData = await getDiaryDetail(year, month + 1, day);
      
      // TODO: 더미 데이터 삭제
      const detailData = {"diaryKo":"오늘 하루 시작하난 좋은 기분으로 햄껏 일어나쌌주! ⛅️ 아침엔 9시에 딱 벌떡 일어나서 밥이랑 김치에 미역국까지 맛나게 먹었어. 🍚🥢 오늘 하루 힘내자고 맘먹었주! 운동도 빡세게 하고 💪 공부도 착실하게 했주. 🤓 그레이랑 비키도 만나서 술 한잔하맨 좋았으쿠라. 🍻 친구들 덕분에 하루가 더 즐거웠주! 오늘 하루 참 잘 보낸 거 같주. 😊 내일도 좋은 하루 되게 만들어보게마! 🌟",
        "diaryEn":"I started my day with a great mood and got up with zest! ⛅️ I woke up exactly at 9 AM and had a delicious breakfast with rice, kimchi, and seaweed soup. 🍚🥢 I was determined to make the most of the day! I worked out hard 💪 and studied diligently too. 🤓 Meeting up with Gray and Vicky for a drink was really nice. 🍻 Thanks to my friends, the day was even more enjoyable! I feel like I spent the day well. 😊 I'll try to make tomorrow a great day too! 🌟",
        "diaryJa":"今日は気持ちよく一日を始められたよ！⛅️ 朝は9時にすっきりと起きて、ご飯とキムチ、それにわかめスープまで美味しく食べたよ。🍚🥢 今日一日頑張ろうって決めたんだ！運動も激しくして 💪 勉強もしっかりとやったよ。🤓 グレイとビッキーにも会って一杯飲んで楽しかったし。🍻 友達のおかげで一日がもっと楽しかったよ！今日は本当にいい一日を過ごせたみたい。😊 明日も良い一日にしよう！🌟",
        "diaryCh":"今天一天以愉快的心情开始，充满活力地起床了！⛅️ 早上九点准时起床，吃了饭、泡菜和美味的海带汤。🍚🥢 我决定要努力过好今天！不仅认真锻炼了💪，还认真学习了。🤓 跟灰和比基见面喝了一杯酒，也很开心。🍻 多亏了朋友们，今天一天更加愉快！觉得今天真是过得很好。😊 明天也要努力过得愉快！🌟",
        "diaryLa":"Hodie diem bonum sentiens excitavi! ⛅️ Mane hora nona exacta surrexi et comedi oryza cum kimchi et ius algarum ad libitum. 🍚🥢 Hodie diem fortiter agere decrevi! Exercitium strenue feci 💪 et studium diligenter perfeci. 🤓 Cum Grey et Vicky conveni et potum cepi, quod erat iucundum. 🍻 Amicorum gratia dies iucundior fuit! Mihi videtur hodie bene actum esse. 😊 Cras quoque bene agentem diem faciam! 🌟",
        "diary_summary":"좋은 하루 보냈어!"
      }
      
      if (detailData) {
        setSelectedDiary({
          date: diaryEntry.date,
          mood: diaryEntry.mood,
          summary: diaryEntry.summary,
          detail: detailData
        });
        setIsReadModalOpen(true);
      } else {
        alert("일기 데이터를 불러오는 데 실패했습니다.");
      }
    } catch (error) {
      alert("서버 오류로 인해 일기를 불러올 수 없습니다.");
    }
  };
  

  return (
    <div className="calendar-container">
      <MemoPad onDataChange={handleMemoDataChange} />
      <div className="calendar-section">
        <div className="calendar-header">
          <button onClick={goToPrevMonth}>{"<"}</button>
          <h2>{year}. {String(month).padStart(2, "0")}</h2>
          <button onClick={goToNextMonth}>{">"}</button>
        </div>

        <div className="calendar-grid">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, index) => (
            <div key={index} className="calendar-day">{day}</div>
          ))}

          {days.map((day, index) => {
            const isToday = day === todayDate && year === todayYear && month === todayMonth;
            
            // 해당 날짜의 일기 데이터를 가져오기
            const diaryEntry = diaryEntries.find((entry) => entry.date === day);

            return (
              <div
                key={index}
                className={`calendar-cell ${day ? "active" : ""} ${isToday ? "today" : ""}`}
                onClick={!diaryEntry && isToday ? () => handleTodayClick(day) : null} // ✅ 일기 있으면 클릭 방지
              >
                {/* 오늘 날짜 표시 (단, 일기 없을 때만) */}
                {isToday && !diaryEntry && <div className="today-circle"></div>}

                {/* 날짜 숫자 표시 */}
                {day && <span className="date-number">{day}</span>}

                {/* 특정 날짜에 저장된 일기가 있으면 무드 버튼 생성 */}
                {diaryEntry ? (
                  <button
                    className={`mood-button mood-${diaryEntry.mood}`}
                    onClick={() => handleReadDiary(day)}
                  >
                    {diaryEntry.summary}
                  </button>
                ) : (
                  isToday && <p className="diary-text">+ 오늘 일기 작성하기</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 일기 생성 모달 */}
      {isWriteModalOpen && (
        <InputModal 
          date={selectedDate} 
          memoData={memoData}
          onClose={() => setIsWriteModalOpen(false)}
        />
      )}

      {/* 일기 읽기 모달 */}
      {isReadModalOpen && (
        <ReadModal 
          diary={selectedDiary} 
          onClose={() => setIsReadModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
