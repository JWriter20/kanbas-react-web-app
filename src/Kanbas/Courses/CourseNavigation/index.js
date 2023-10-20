import { Link, useParams, useLocation } from "react-router-dom";
import "./index.css";


function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom Meetings", "Assignments", "Grades", "Quizzes", "People", "Panopto Video", "Discussions", "Announcements", "Pages", "Files", "Rubrics"];
  const { courseId } = useParams();
  const { pathname } = useLocation();
  return (
    <div className="list-group profile-home-nav" style={{ width: 150 }}>
      {links.map((link, index) => (
        <Link
          key={index}
          to={`/Kanbas/Courses/${courseId}/${link}`}
          className={`profile-nav-item ${decodeURI(pathname).includes(link) && "active"}`}>
          {link}
        </Link>
      ))}
    </div>
  );
}


export default CourseNavigation;