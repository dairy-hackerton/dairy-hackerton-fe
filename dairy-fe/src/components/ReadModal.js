import React, { useEffect, useRef, useState } from "react";
import "../styles/ReadModal.css"; 
import deleteIcon from "../assets/trash.png"; // 이미지 import

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

const ReadModal = ({ diary, onClose, onDelete }) => {
  const diaryBoxRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("한국어");
  const [showConfirmModal, setShowConfirmModal] = useState(false); // 삭제 확인 모달 상태

  useEffect(() => {
    const checkScrollable = () => {
      if (diaryBoxRef.current) {
        const isContentOverflowing =
          diaryBoxRef.current.scrollHeight > diaryBoxRef.current.clientHeight;
        setIsScrollable(isContentOverflowing);
      }
    };
    checkScrollable();
  }, [diary, selectedLanguage]);

  if (!diary) return null;

  return (
    <div className="read-modal-overlay">
      <div className="read-modal-content">
        <h3>📖 {diary.date}일의 기록</h3>
        
        <p className="diary-content"><strong>이날의 분위기:</strong> {moods[diary.mood] || "❓"}</p>
        <div ref={diaryBoxRef} className={`diary-box ${isScrollable ? "scrollable" : ""}`}>
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


        <div className="action-buttons">
          {/* ✅ 삭제 버튼 클릭 시 확인 모달 띄우기 */}
          <button className="icon-button delete-button" onClick={() => setShowConfirmModal(true)}>
            <img src={deleteIcon} alt="삭제" className="icon-image" />
          </button>

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
        </div>    

        <div className="modal-buttons">
          <button onClick={onClose}>닫기</button>
        </div>
      </div>

      {/* ✅ 삭제 확인 모달 */}
      {showConfirmModal && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal-content">
            <p>삭제하시기 전에 다시 한번 생각해보세요.</p>
            <p>소중한 기록이 사라질 수도 있어요!</p>
            <div className="confirm-modal-buttons">
              {/* ✅ 삭제 버튼 클릭 시 onDelete 실행 후 모달 닫기 */}
              <button onClick={() => { onDelete(diary.id); setShowConfirmModal(false); }}>삭제</button>
              <button onClick={() => setShowConfirmModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadModal;
