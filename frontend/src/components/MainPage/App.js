import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "./components/Tasks/Container";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Container />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
