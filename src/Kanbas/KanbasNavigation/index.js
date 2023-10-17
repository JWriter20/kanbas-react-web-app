import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import "./index.css";
import { FaUserCircle, FaTachometerAlt, FaBook, FaRegCalendar,
    FaInbox, FaClock, FaNetworkWired, FaRegCopyright, FaQuestion } from "react-icons/fa";
function KanbasNavigation() {
  const links = ["", "Account", "Dashboard", "Courses", "Calendar", "Inbox", "History", "Studio", "Commons", "Help"];
  const icons = [<img src="../../NULogo.png" alt="" width="100%"/>, <FaUserCircle />, <FaTachometerAlt />, <FaBook />, 
  <FaRegCalendar />, <FaInbox />, <FaClock />, <FaNetworkWired />, <FaRegCopyright />, <FaQuestion />]
  const { pathname } = useLocation();
  return (
    <nav id="sidebar" class="sidebar">
        <div class="position-sticky">
            <ul class="nav flex-column">
                {icons.map((icon, index) => (
                    <li className={`nav-item ${pathname.includes(links[index]) && links[index] !== "" && "active"}`}>
                    <Link
                    key={index}
                    to={`/Kanbas/${links[index]}`}
                    className={`nav-link`}>
                    <IconContext.Provider value={{ color: links[index] === 'Account' && !pathname.includes(links[index]) ? 'white' : 'red' }}>
                        <div className="nav-icon">{icon}</div>     
                    </IconContext.Provider>
                    {links[index]}
                    </Link>
                    </li>
                ))};
            </ul>
        </div>
    </nav>
  );
}
export default KanbasNavigation;


