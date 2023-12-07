import logo from "../images/vastpro_logo.png";
import "./Header.css";

const Header = (props) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark custom-navbar fixed-top">
      <div className="container">
        <div className="navbar-brand">
          <img src={logo} alt="online-exam.png" className="custom-logo" />
        </div>
        {props.page === "login" ? (
          <p className="text-lg-center fs-3 fw-bold">Online Exam Login!</p>
        ) : props.page === "admin" ? (
          <>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navmenu">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navmenu">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <a href="#learn" class="nav-link">
                    Create Exam
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#Questions" class="nav-link">
                    Update Exam
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#Instructors" class="nav-link">
                    Retire Exam
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Header;
