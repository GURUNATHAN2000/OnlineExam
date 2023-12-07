import "../src/components/loginSection/Login.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Header from "./components/headerSection/Header";
import Login from "./components/loginSection/Login";
import Footer from "./components/footerSection/Footer";
import AdminHome from "./components/adminDashboard/AdminHome";
import { useState } from "react";



function App() {
  const [page, setPage] = useState("");
  return (
    <div>
<<<<<<< HEAD
       <Header/>
       
        <Login/> 
       
       <Footer/> 
=======
      <Header page={page} />
      <Login setPage={setPage} />
      {/* <AdminHome setPage={setPage} /> */}
      <Footer />
>>>>>>> e67ba11b6ae5f33e08d6d394578c94c0436cdec5
    </div>
  );
}

export default App;
