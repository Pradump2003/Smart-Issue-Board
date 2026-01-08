import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./page/Login";
import Signup from "./page/Signup";
import ToastProvider from "./components/ToastProvider";
import IssueList from "./page/IssueList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/issue" element={<IssueList />} />
      </Routes>
      <ToastProvider />
    </BrowserRouter>
  );
}

export default App;
