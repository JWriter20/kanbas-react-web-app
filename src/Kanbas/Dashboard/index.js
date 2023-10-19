import { Link } from "react-router-dom";
import db from "../Database";
import "./index.css";
import { FaFileAlt } from "react-icons/fa";
function Dashboard() {
  const courses = db.courses;
  return (
    <div className="container">
      <h2>Dashboard</h2>
      <hr />
      <div className="container">
        <h3>Published Courses({courses.length})</h3>
        <hr />
        <div class="row dashboard-row-margin">
            {makeRows()}
        </div>
      </div>
    </div>
  );
}

function makeCard(course) {
  const FILE_ICON = <FaFileAlt />;
  return <Link key={course._id} to={`/Kanbas/Courses/${course._id}`} className="list-group-item">
    <div class="col-12 col-md-6 col-xl-3">
            <div class="card shadow dashboard-card" style={{width: "270px"}}>
              <div class="card-body">
                  <p class="card-title">
                      {course.name}</p>
                  <p class="card-text">
                      {course.name}</p>
                  <p class="card-subtitle">
                      {course.name}</p>
                  <i class="nav-icon fa" style={{color: "black", fontSize: "20px"}}>{FILE_ICON}</i>
              </div>
        </div>
    </div>
  </Link>
}

function makeRows() {
  const courses = db.courses;
  let rows = [];

  for (let i = 0; i < courses.length; i += 4) {
    rows.push(
      <div class="list-group list-group-horizontal">
        {i < courses.length ? makeCard(courses[i]) : ''}
        {i + 1 < courses.length ? makeCard(courses[i + 1]): ''}
        {i + 2 < courses.length ? makeCard(courses[i + 2]): ''}
        {i + 3 < courses.length ? makeCard(courses[i + 3]): ''}
      </div>
    );
    console.log(rows);

  }

  return <div>{rows}</div>
    
}

export default Dashboard;