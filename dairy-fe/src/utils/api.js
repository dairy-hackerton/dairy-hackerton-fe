import axios from "axios";

// 백엔드 API 기본 URL 설정
const API_BASE_URL = "https://13.124.98.245:8080"; 

// 일기 데이터 전송 함수
export const createDiaryEntry = async (diaryData, date) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/diary/${date}`, diaryData);
    return response.data;
  } catch (error) {
    console.error("[ERROR]일기 생성에 실패하였습니다", error);
    throw error;
  }
};
// 특정 년월의 일기 메타데이터 리스트 가져오기
export const getDiaryEntries = async (year, month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/diary/${year}/${month}`); // GET 요청
    console.log("[DEBUG] 불러온 일기 데이터:", response.data); 
    return response.data.dateDiarySentence;
  } catch (error) {
    console.error("[ERROR] 일기 데이터를 불러오지 못했습니다:", error);
    return [];
  }
};
// 특정 날짜의 상세 일기 가져오기
export const getDiaryDetail = async (year, month, date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/diary/${year}/${month-1}/${date}`);
    console.log("[DEBUG] 상세 일기 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("[ERROR] 상세 일기를 불러오지 못했습니다:", error);
    return null;
  }
};
// 특정 날짜의 일기 삭제
export const deleteDiaryEntries = async (year, month, date) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/diary/${year}/${month}/${date}`);
    return response.data;
  } catch (error) {
    console.error("[ERROR]일기 삭제에 실패하였습니다", error);
    return null;
  }
};