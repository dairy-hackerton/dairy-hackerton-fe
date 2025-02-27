
import "../styles/Home.css"; 
import Calendar from "../components/Calendar";


function Home() {  
  return (
  <div>
    <div class="title-container">
      <div className="title-wrapper">
        <h1 class="title">📝 dAIry</h1>
        <p className="summary">AI로 간편하게 기록하는 당신의 하루</p>
      </div>  
    </div>
    <Calendar />
  </div>
  );
}

export default Home;
