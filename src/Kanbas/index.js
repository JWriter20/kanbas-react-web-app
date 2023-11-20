import { Route, Routes, Navigate } from "react-router";
import { React, useState, useEffect } from "react";
import KanbasNavigation from "./KanbasNavigation";
import Courses from "./Courses";
import Account from "./Account";
import Dashboard from "./Dashboard";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";

function Kanbas() {
  const [courses, setCourses] = useState([]);
  const API_BASE = process.env.REACT_APP_API_BASE;
  const [course, setCourse] = useState({});
  const URL = `${API_BASE}/courses`;
  const updateCourse = async (course) => {
    const response = await axios.put(
      `${URL}/${course._id}`,
      course
    );
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        }
        return c;
      })
    );
    setCourse({ name: "" });
  };

  const deleteCourse = async (course) => {
    const response = await axios.delete(
      `${URL}/${course._id}`
    );
    setCourses(courses.filter(
      (c) => c._id !== course._id));
  };

  const addCourse = async (newCourse) => {
    const response = await axios.post(URL, newCourse);
    setCourses([
      response.data,
      ...courses,
    ]);
    setCourse(newCourse);
  };

  const findAllCourses = async () => {
    const response = await axios.get(URL);
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);

  return (
    <Provider store={store}>
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
              setCourses={setCourses}
              updateCourse={updateCourse}
              addCourse={addCourse}
              deleteCourse={deleteCourse}/>} />
            <Route path="Courses/:courseId/*" element={<Courses courses={courses} />} />
            <Route path="Calendar" element={<h1>Calendar</h1>} />
          </Routes>
        </div>
      </div>
    </div>  
    </Provider>
  );
}
export default Kanbas;