import "../src/components/loginSection/Login.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Header from "./components/headerSection/Header";
import Login from "./components/loginSection/Login";
import Footer from "./components/footerSection/Footer";
import AdminHome from "./components/adminDashboard/AdminHome";
import { useState } from "react";
import ExamMaster from "./components/adminSection/ExamMaster";

function App() {
  const [page, setPage] = useState("");
  return (
    <div>
      <Header page={page} />
      <Login setPage={setPage} />
      {/* <AdminHome setPage={setPage} /> */}
      <Footer />
    </div>
  );
}

export default App;
