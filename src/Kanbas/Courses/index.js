import React from "react";
import { useParams, Routes, Route, Navigate } from "react-router-dom";
import CourseNavigation from "./CourseNavigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import Grades from "./Grades";
import BreadCrumb from "./CourseNavigation/BreadCrumb";
import { useState, useEffect } from "react";
import axios from "axios";

function Courses() {
  const { courseId } = useParams();
  const API_BASE = process.env.REACT_APP_API_BASE;
  const URL = `${API_BASE}/courses`;
  const [course, setCourse] = useState({});
  const findCourseById = async (courseId) => {
    console.log( `HERE: ${URL}/${courseId}`);
    const response = await axios.get(
      `${URL}/${courseId}`
    );
    setCourse(response.data);
  };

  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);


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
