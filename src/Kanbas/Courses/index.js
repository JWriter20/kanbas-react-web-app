import React from "react";
import { useParams, Routes, Route, Navigate, useLocation } from "react-router-dom";
import JsonPre from "../../Labs/a3/JsonPre";
import db from "../Database";
import CourseNavigation from "./CourseNavigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import Grades from "./Grades";
import BreadCrumb from "./CourseNavigation/BreadCrumb";

function Courses() {
  const { courseId } = useParams();
  const {pathname} = useLocation();
  const [empty, kanbas, courses, id, screen] = pathname.split("/");
  const course = db.courses.find((course) => course._id === courseId);
  return (
    <div>
      <div className="row">
                <div className="row">
            <BreadCrumb />
          </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CourseNavigation />
        </div>
        <div className="col-10">
          <div>
              <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home/>} />
                <Route path="Modules" element={<Modules/>} />
                <Route path="Assignments" element={<Assignments/>} />
                <Route
                  path="Assignments/:assignmentId"
                  element={<AssignmentEditor/>}
                />
                <Route path="Grades" element={<Grades/>} />
              </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
