import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./page/Login";
import Signup from "./page/Signup";
import DisplayIssue from "./page/DisplayIssue";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/issue" element={<DisplayIssue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
