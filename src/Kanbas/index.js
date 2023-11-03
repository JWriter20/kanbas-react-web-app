import { Route, Routes, Navigate } from "react-router";
import { React, useState } from "react";
import KanbasNavigation from "./KanbasNavigation";
import Courses from "./Courses";
import Account from "./Account";
import Dashboard from "./Dashboard";
import db from "./Database";
import BreadCrumb from "./Courses/CourseNavigation/BreadCrumb";

function Kanbas() {
  const [courses, setCourses] = useState(db.courses);
  return (
    <div className="row">
      <div className="col-1">
        <KanbasNavigation />
      </div>
      <div className="col-11">
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Account" element={<Account />} />
            <Route path="Dashboard" element={<Dashboard
              courses={courses}
              setCourses={setCourses}/>} />
            <Route path="Courses/:courseId/*" element={<Courses courses={courses} />} />
            <Route path="Calendar" element={<h1>Calendar</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default Kanbas;