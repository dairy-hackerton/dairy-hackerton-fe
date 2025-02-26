import React, { useState } from "react";
import "../styles/InputModal.css"; // ✅ 모달 스타일 추가
import { createDiaryEntry } from "../utils/api";

const InputModal = ({date, onClose }) => {
  // ✅ 상태값 추가
  const [condition, setMood] = useState(""); // 분위기 선택
  const [wakeTime, setWakeUpTime] = useState(""); // 기상 시간
  const [mealInput, setMealInput] = useState(""); // 입력창 값
  const [food, setMeals] = useState([]); // 입력된 식사 리스트
  const [activityInput, setActivityInput] = useState(""); // 오늘 한 일 입력창
  const [userDo, setActivities] = useState([]); // 오늘 한 일 리스트
  const [peopleInput, setPeopleInput] = useState(""); // 만난 사람 입력창
  const [meetPeople, setPeopleMet] = useState([]); // 만난 사람 리스트
  const [extSentence, setExtraNotes] = useState(""); // ✅ 추가 입력 (긴 글)
  const [isComposing, setIsComposing] = useState(false); // ✅ 한글 입력 상태

  const moods = [
    { label: "😡 화남", value: "화남", color: "#FF6565" },
    { label: "😰 불안", value: "불안", color: "#FE9C5B" },
    { label: "😆 기쁨", value: "기쁨", color: "#EFEC44" },
    { label: "😌 평온", value: "평온", color: "#9EDF84" },
    { label: "🥱 슬픔", value: "슬픔", color: "#5AA5EB" },
    { label: "🥰 행복", value: "행복", color: "#E15AB0" },
    { label: "😴 피곤", value: "피곤", color: "#9370DB" },
  ];  

  // ✅ IME 입력 시작 (한글 조합 중)
  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  // ✅ 태그 입력 핸들러 (공통 함수)
  const handleTagKeyDown = (event, inputValue, setInputValue, tags, setTags) => {
    if (event.key === "Enter" && !isComposing && inputValue.trim()) {
      setTags([...tags, inputValue.trim()]); // 입력된 값 추가
      setInputValue(""); // 입력창 초기화
      event.preventDefault(); // 기본 엔터 동작 방지
    }
  };

  // ✅ 입력된 태그 삭제 기능 (공통 함수)
  const removeTag = (tagToRemove, tags, setTags) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 저장버튼 눌른 경우
  const handleSave = async () => {
    const diaryData = {
      condition,
      wakeTime,
      food,
      userDo,
      meetPeople,
      extSentence
    };
    try {
      const response = await createDiaryEntry(diaryData, date); // ✅ API 호출
      console.log("📖 저장된 일기 데이터:", response);
      alert("일기가 성공적으로 저장되었습니다!");
      onClose();
    } catch (error) {
      alert("일기 저장 중 오류가 발생했습니다.");
    }
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>dAIry와 함께 오늘을 기록해요 </h3>
        {/* 1️⃣ 오늘 하루의 분위기 (동그라미 버튼) */}
        <div className="input-group">
          <label>오늘 하루의 분위기를 선택해주세요</label>
          <div className="mood-selection">
            {moods.map((m, index) => (
              <button
                key={index}
                className={`mood-circle ${condition === m.value ? "selected" : ""}`}
                style={{ backgroundColor: m.color }}
                onClick={() => setMood(m.value)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2️⃣ 기상 시간 */}
        <div className="input-group">
          <label>오늘 몇시에 일어나셨나요?</label>
          <input 
            type="time" 
            value={wakeTime} 
            onChange={(e) => setWakeUpTime(e.target.value)} 
          />
        </div>

        {/* 3️⃣ 가장 기억에 남는 식사 (태그 입력) */}
        <div className="input-group">
          <label>오늘 가장 기억에 남는 식사는 무엇인가요?</label>
          <input 
            type="text" 
            placeholder="입력 후 엔터를 눌러 추가하세요" 
            value={mealInput} 
            onChange={(e) => setMealInput(e.target.value)}
            onKeyDown={(e) => handleTagKeyDown(e, mealInput, setMealInput, food, setMeals)}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />
          <div className="tags-container">
            {food.map((meal, index) => (
              <span key={index} className="tag">
                {meal}
                <button onClick={() => removeTag(meal, food, setMeals)}>✖</button>
              </span>
            ))}
          </div>
        </div>

        {/* 4️⃣ 오늘 한 일 (태그 입력) */}
        <div className="input-group">
          <label>오늘 무엇을 하셨나요?</label>
          <input 
            type="text" 
            placeholder="입력 후 엔터를 눌러 추가하세요" 
            value={activityInput} 
            onChange={(e) => setActivityInput(e.target.value)}
            onKeyDown={(e) => handleTagKeyDown(e, activityInput, setActivityInput, userDo, setActivities)}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />
          <div className="tags-container">
            {userDo.map((activity, index) => (
              <span key={index} className="tag">
                {activity}
                <button onClick={() => removeTag(activity, userDo, setActivities)}>✖</button>
              </span>
            ))}
          </div>
        </div>

        {/* 5️⃣ 오늘 누구를 만나셨나요? (태그 입력) */}
        <div className="input-group">
          <label>오늘 누구를 만나셨나요?</label>
          <input 
            type="text" 
            placeholder="입력 후 엔터를 눌러 추가하세요" 
            value={peopleInput} 
            onChange={(e) => setPeopleInput(e.target.value)}
            onKeyDown={(e) => handleTagKeyDown(e, peopleInput, setPeopleInput, meetPeople, setPeopleMet)}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />
          <div className="tags-container">
            {meetPeople.map((person, index) => (
              <span key={index} className="tag">
                {person}
                <button onClick={() => removeTag(person, meetPeople, setPeopleMet)}>✖</button>
              </span>
            ))}
          </div>
        </div>
        
        {/* 6️⃣ 더 쓰고 싶은 내용 입력 (긴 텍스트) */}
        <div className="input-group">
          <label>더 쓸 내용이 있다면 작성해주세요</label>
          <textarea 
            className="large-textarea" // ✅ 새로운 클래스 적용
            value={extSentence} 
            onChange={(e) => setExtraNotes(e.target.value)}
            placeholder="자유롭게 입력하세요..."
          />
        </div>

        {/* 버튼 영역 */}
        <div className="modal-buttons">
          <button onClick={onClose}>닫기</button>
          <button onClick={handleSave}>일기 생성하기</button>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
