import "../src/components/loginSection/Login.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/headerSection/Header";
import Login from "./components/loginSection/Login";
import Footer from "./components/footerSection/Footer";

function App() {
  return (
    <div>
      <Header />
      <Login />
      <Footer />
    </div>
  );
}

export default App;
