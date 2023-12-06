import logo from "../images/vastpro_logo.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
          <div className="col-4 navbar-brand">
            <img src={logo} alt="online-exam.png" className="custom-logo"/>
          </div>
          <div className="col-4 text-center ">
            <h1>Online Exam Login!</h1>
          </div>
          <div className="col-4"></div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
