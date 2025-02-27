import React, { useState, useEffect } from "react";
import "../styles/LoadingModal.css"; // ✅ 스타일 추가
import mime1 from "../assets/mime1.png";
import mime2 from "../assets/mime2.png";
import mime3 from "../assets/mime3.png";
import mime4 from "../assets/mime4.png";
import mime5 from "../assets/mime5.png"; // ✅ 여러 이미지 import

const images = [mime1, mime2, mime3, mime4, mime5];

const LoadingModal = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // 페이드아웃 시작
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setFade(true); // 페이드인 시작
      }, 1000); // 
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-modal">
      <div className="modal-overlay">
        <div className="modal-content">
          <p>우리 인공지능(이)가 열심히 일하고 있어요..</p>
          <p>조금만 기다려주세요 😊</p>
          <h3>막간을 이용한 개발자 유우머</h3>
          <img
            src={images[currentImage]}
            alt="로딩 중"
            className={`loading-image ${fade ? "fade-in" : "fade-out"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
