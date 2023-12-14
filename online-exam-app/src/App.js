import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../src/components/loginSection/Login.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Header from "./components/headerSection/Header";
import Login from "./components/loginSection/Login";
import Footer from "./components/footerSection/Footer";
import AdminHome from "./components/adminDashboard/AdminHome.js";
import { useState } from "react";
import ExamMaster from "./components/adminSection/ExamMaster";
import Exam from "./components/examSection/Exam.js";

function App() {
  const [page, setPage] = useState("");
  return (
    <>
      <Header page={page} />
      <Routes>
        <Route path="/login" element={<Login setPage={setPage} />}></Route>
        <Route path="/adminDashboard" element={<AdminHome setPage={setPage} />}>
          <Route path="exam" element={<Exam />}></Route>
        </Route>

        {/*  */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
