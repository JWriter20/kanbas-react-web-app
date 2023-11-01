import { Link } from "react-router-dom";
import db from "../Database";
import "./index.css";
import { FaFileAlt } from "react-icons/fa";
import { React, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
function Dashboard() {
  const [courses, setCourses] = useState(db.courses);
  const course = {
    name: "New Course",      number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
  };
  const addNewCourse = () => {
    setCourses([...courses,
              { ...course,
                _id: new Date().getTime() }]);
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <hr />
      <div className="container">
        <h3>Published Courses({courses.length})<div className="btn btn-primary float-end" onClick={addNewCourse}>Add Course +</div></h3>
        <hr />
        <div class="row dashboard-row-margin">
            {makeRows()}
        </div>
      </div>
    </div>
  );
}

function makeCard(course) {
  return <Link key={course._id} to={`/Kanbas/Courses/${course._id}`} className="list-group-item">
    <div class="col-12 col-md-6 col-xl-3">
            <div class="card shadow dashboard-card" style={{width: "270px"}}>
              <div class="card-body">
                  <p class="card-title">
                      {course.name}</p>
                  <p class="card-text">
                      {course.number}.{course._id}</p>
                  <p class="card-subtitle">
                      {course.startDate} | {course.endDate}</p>
                  <div className="btn px-1 py-0">
                  <FaFileAlt style={{color: "black", fontSize: "20px"}}/>
                  </div>
                  <div className="btn py-0 px-1 float-end">
                    <FaTrash style={{color: "red", fontSize: "20px"}}/>
                  </div>
                  <div className="btn py-0 px-1 float-end">
                    <FaEdit style={{color: "black", fontSize: "21px"}}/>
                  </div>
              </div>
        </div>
    </div>
  </Link>
}

function makeRows() {
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