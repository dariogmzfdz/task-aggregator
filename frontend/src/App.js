import "./App.css";
import Header from "./components/Header/Header";
import LofiPlayer from "./components/LofiPlayer/LofiPlayer";
import MainPage from "./components/MainPage/MainPage";
import Menu from "./components/Menu/Menu";
import SideTasks from "./components/SideTasks/SideTasks";

function App() {
  return (
    <div className="App">
      <Header />
      <Menu />
      <SideTasks />
      <MainPage />
      <LofiPlayer />
    </div>
  );
}

export default App;
