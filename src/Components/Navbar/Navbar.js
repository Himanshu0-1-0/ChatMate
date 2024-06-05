import "./Navbar.css";
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navv">
        <div className="container-fluid">
            <div className="fulllogo">
                <img src="/Logo-Img.png" alt="Logo" className="ico"/>
                <img src="/Name.png" alt="ChatMate" className="Logo-img" />
            </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
          </div>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mx-5 " >
              <li className="nav-item itl">
                <ChatIcon/>
                <a className="nav-link" href="#">
                  Chats
                </a>
              </li>
              <li className="nav-item dropdown itl">
                <PersonIcon/>
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Profile
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile Page
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
      </nav>
    </>
  );
}
