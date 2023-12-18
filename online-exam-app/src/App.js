import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/headerSection/Header";
import Footer from "./components/footerSection/Footer";
import Login from "./components/loginSection/Login";
import Register from "./components/registerSection/Register";
import Admin from "./components/adminSection/Admin";
import Exam from "./components/adminSection/examSection/Exam";
import ExamMaster from "./components/adminSection/examSection/ExamMaster";
import QuestionMaster from "./components/adminSection/questionSection/QuestionMaster";
import Topic from "./components/adminSection/topicSection/Topic";
import User from "./components/userSection/User";
import NoMatch from "./components/NoMatch/NoMatch";
import TopicMaster from "./components/adminSection/topicSection/TopicMaster";
import Question from "./components/adminSection/questionSection/Question";

function App() {
  const [page, setPage] = useState("");
  return (
    <>
      <Header page={page} />
      <Routes>
        <Route path="/login" element={<Login setPage={setPage} />} />
        <Route path="/register" element={<Register setPage={setPage} />} />
        <Route path="/admin" element={<Admin setPage={setPage} />}>

          <Route path="exams" element={<Exam />}>
            <Route path="addExams" element={<ExamMaster />} />
          </Route>

          <Route path="topics" element={<Topic />}>
            <Route path="addTopics" element={<TopicMaster />} />
          </Route>

          <Route path="questions" element={<Question />}>
            <Route path="addQuestions" element={<QuestionMaster />} />
          </Route>
          
        </Route>
        <Route path="user" element={<User setPage={setPage} />}></Route>
        <Route path="*" element={<NoMatch />}></Route>
      </Routes>
      <Footer page={page} />
    </>
  );
}

export default App;
