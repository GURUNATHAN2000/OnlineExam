import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./components/headerSection/Header";
import Footer from "./components/footerSection/Footer";
import Login from "./components/loginSection/Login";
import Register from "./components/registerSection/Register";
import Admin from "./components/adminSection/Admin";
import Exam from "./components/adminSection/examSection/Exam";
import ExamMaster from "./components/adminSection/examSection/ExamMaster";
import QuestionMaster from "./components/adminSection/questionSection/QuestionMaster";
import Topic from "./components/adminSection/topicSection/Topic";
import UserList from "./components/adminSection/listUserSection/UserList";
import NoMatch from "./components/NoMatch/NoMatch";
import TopicMaster from "./components/adminSection/topicSection/TopicMaster";
import Question from "./components/adminSection/questionSection/Question";
import ExamTopicMapping from "./components/adminSection/examSection/ExamTopicMapping";
import Home from "./components/homeSection/Home";
import UserHome from "./components/userSection/UserHome";
import UserMaster from "./components/adminSection/listUserSection/UserMaster";
import UserDashboard from "./components/userSection/UserDashboard";
import UserReport from "./components/userSection/UserReport";
import Loader from "./components/loader/Loader";
import { store } from "./components/store";
import { FailureAlert } from "./components/alert/FailureAlert";
import axios from "axios";

function App() {
  // const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState("");
  const [name, setName] = useState("");
  const [partyId, setPartyId] = useState("");

  useEffect(() => {
    page === "user" || page === "admin"
      ? axios
          .get(
            "https://" +
              window.location.hostname +
              ":8443/onlineexam/control/getUserName",
            { withCredentials: true }
          )
          .then((res) => {
            // setIsLoading(false);
            return res.data;
          })
          .then((data) => {
            console.log("data :: ", data);
            data.userNameLogin
              ? setName(data.userNameLogin)
              : console.log("data:1: ", data);
          })
          .catch((err) => {
            // setIsLoading(false);

            if (err.message === "Network Error") {
              FailureAlert(
                "SERVER NOT RESPONDING...!",
                "Please try after some time"
              );
            }
            console.log("ERROR FROM LOGIN FETCH :: ", err);
          })
      : console.log("page :: ", page);
  }, [page]);

  return (
    <Provider store={store}>
      {/* {isLoading ? <Loader /> : ""} */}
      <Header page={page} name={name} partyId={partyId} />

      <Routes>
        <Route path="/" element={<Home setPage={setPage} />} />

        <Route
          path="login"
          element={
            <Login
              setPage={setPage}
              setName={setName}
              setPartyId={setPartyId}
            />
          }
        />

        <Route path="/register" element={<Register setPage={setPage} />} />

        <Route path="/admin" element={<Admin setPage={setPage} />}>
          <Route path="exams" element={<Exam />}>
            <Route path="addExams" element={<ExamMaster />} />
          </Route>

          <Route path="editExams" elements={<ExamTopicMapping />}></Route>

          <Route path="topics" element={<Topic />}>
            <Route path="addTopics" element={<TopicMaster />} />
          </Route>

          <Route path="questions" element={<Question />}>
            <Route path="addQuestions" element={<QuestionMaster />} />
          </Route>

          <Route path="users" element={<UserList />}>
            <Route path="addUsers" element={<UserMaster setPage={setPage} />} />
          </Route>
        </Route>
        <Route path="/user" element={<UserHome setPage={setPage} />}>
          <Route
            path="userDashboard"
            element={<UserDashboard partyId={partyId} />}
          />
          <Route path="userReport" element={<UserReport />} />
        </Route>

        <Route path="*" element={<NoMatch />}></Route>
      </Routes>
      <Footer page={page} />
    </Provider>
  );
}

export default App;
