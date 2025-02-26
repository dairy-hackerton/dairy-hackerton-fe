import axios from "axios";

// ✅ 백엔드 API 기본 URL 설정
const API_BASE_URL = "https://localhost:8080"; 

// ✅ 일기 데이터 전송 함수
export const createDiaryEntry = async (diaryData, date) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/diary/${date}`, diaryData);
    return response.data;
  } catch (error) {
    console.error("[ERROR]일기 생성에 실패하였습니다", error);
    throw error;
  }
};

// ✅ (추가 가능) 저장된 일기 불러오기
// export const getDiaryEntries = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/diary`);
//     return response.data;
//   } catch (error) {
//     console.error("일기 목록 불러오기 실패:", error);
//     throw error;
//   }
// };
