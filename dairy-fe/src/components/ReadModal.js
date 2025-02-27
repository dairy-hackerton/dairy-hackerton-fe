import React, { useEffect, useRef, useState } from "react";
import "../styles/ReadModal.css"; 

const moods = {
  "화남": "😡",
  "불안": "😰",
  "기쁨": "😆",
  "평온": "😌",
  "슬픔": "😢",
  "행복": "🥰",
  "피곤": "😴",
};

const languageOptions = {
  "한국어": "diaryKo",
  "영어": "diaryEn",
  "일본어": "diaryJa",
  "중국어": "diaryCh",
  "라틴어": "diaryLa"
};

const ReadModal = ({ diary, onClose }) => {
  const diaryBoxRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("한국어");

  // 스크롤이 필요한지 확인하는 함수
  useEffect(() => {
    const checkScrollable = () => {
      if (diaryBoxRef.current) {
        const isContentOverflowing =
          diaryBoxRef.current.scrollHeight > diaryBoxRef.current.clientHeight;
        setIsScrollable(isContentOverflowing);
      }
    };
    checkScrollable();
  }, [diary.detail]); 

  if (!diary) return null;

  return (
    <div className="read-modal-overlay">
      <div className="read-modal-content">
        <h3>📖 {diary.date}일의 기록</h3>
        
        <p className="diary-content"><strong>이날의 분위기:</strong> {moods[diary.mood] || "❓"}</p>
        <div
          ref={diaryBoxRef}
          className={`diary-box ${isScrollable ? "scrollable" : ""}`}
        >
          <div className="diary-content">
            {diary.detail.diaryKo}
          </div>
          {/* ✅ 번역본 추가 (기본적으로 한국어만 출력, 다른 언어 선택 시 추가 출력) */}
          {selectedLanguage !== "한국어" && diary.detail[languageOptions[selectedLanguage]] && (
            <>
              <hr className="translation-divider"/>
              <p className="diary-content"><strong>{selectedLanguage} 번역본 💬</strong></p>
              <p className="diary-content">{diary.detail[languageOptions[selectedLanguage]]}</p>
            </>
          )}
        </div>

        {/* 언어 선택 드롭다운 */}
        <div className="language-selector">
          <label className="diary-content"><strong>번역 보기: </strong></label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {Object.keys(languageOptions).map((lang, index) => (
              <option key={index} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="modal-buttons">
            <button onClick={onClose}>닫기</button>
          </div>
      </div>
    </div>
  );
};

export default ReadModal;
