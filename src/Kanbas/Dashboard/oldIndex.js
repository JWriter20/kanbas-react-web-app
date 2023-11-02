import { Link } from "react-router-dom";
import db from "../Database";
import "./index.css";
import { FaFileAlt } from "react-icons/fa";
import { React, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Modal, Button, Form } from 'react-bootstrap';



function Dashboard() {
  const exampleCourse = {
    name: "New Course",      number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
  };

  const [state, setState] = useState({courses: db.courses, modal: {active: false, title: "", submitFunc: () => null}, course: exampleCourse});

  const addNewCourse = () => {
    setState((prevState) => {
      const updatedCourses = {
        ...prevState,
        courses: [
          ...prevState.courses,
          {
            ...prevState.course,
            _id: new Date().getTime().toString(),
          },
        ],
      };
      return updatedCourses;
    });
  };

  console.log(state);

  return (
    <div className="container">
      { state.modal ? createModal(state, setState) : null}
      <h2>Dashboard</h2>
      <hr />
      <div className="container">
        <h3>Published Courses({state.courses.length})<div className="btn btn-primary float-end" onClick={() => setState({...state, modal: {...state.modal, active: true, title: "Add Course", submitFunc: addNewCourse}})}>Add Course +</div></h3>
        <hr />
        <div className="row dashboard-row-margin">
            {makeRows(state, setState)}
        </div>
      </div>
    </div>
  );
}

function makeCard(state, setState, newCourse) {
  const deleteCourse = (courseId) => {
    setState({...state, courses: state.courses.filter((course) => course._id !== courseId)});
  };

  const updateCourse = (courseId) => {
    const newState = {...state, courses: state.courses.map((course) => course._id === courseId ? state.course : course)};
    setState(newState);
  };

  return <Link key={newCourse._id} to={`/Kanbas/Courses/${newCourse._id}`} className="list-group-item">
    <div className="col-12 col-md-6 col-xl-3">
            <div className="card shadow dashboard-card" style={{width: "270px"}}>
              <div className="card-body">
                  <p className="card-title">
                      {newCourse.name}</p>
                  <p className="card-text">
                      {newCourse.number}.{newCourse._id}</p>
                  <p className="card-subtitle">
                      {newCourse.startDate} | {newCourse.endDate}</p>
                  <div className="btn px-1 py-0">
                  <FaFileAlt style={{color: "black", fontSize: "20px"}}/>
                  </div>
                  <div className="btn py-0 px-1 float-end" onClick={(event) => { 
                    event.preventDefault(); 
                    deleteCourse(newCourse._id);
                  }}>
                    <FaTrash style={{color: "red", fontSize: "20px"}} />
                  </div>
                  <div className="btn py-0 px-1 float-end" onClick={(event) => { 
                    event.preventDefault(); 
                    setState({...state, course: newCourse, modal: {active: true, title: "Edit Course", submitFunc: () => updateCourse(newCourse._id)}})
                  }}>
                    <FaEdit style={{color: "black", fontSize: "21px"}}/>
                  </div>
              </div>
        </div>
    </div>
  </Link>
}

function makeRows(state, setState) {
  let rows = [];
  const courses = state.courses;

  for (let i = 0; i < courses.length; i += 4) {
    rows.push(
      <div className="list-group list-group-horizontal">
        {i < courses.length ? makeCard(state, setState, courses[i]) : ''}
        {i + 1 < courses.length ? makeCard(state, setState, courses[i + 1]): ''}
        {i + 2 < courses.length ? makeCard(state, setState, courses[i + 2]): ''}
        {i + 3 < courses.length ? makeCard(state, setState, courses[i + 3]): ''}
      </div>
    );

  }

  return <div>{rows}</div>
    
}

function createModal(state, setState) {
  const newCourse = state.course;

  const setCourse = (course) => {
    setState({ ...state, course: course });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    state.modal.submitFunc();
    handleClose();
  };

  const handleClose = () => {
    setState({ ...state, modal: { ...state.modal, active: false } });
  };

  return (
    <>
      <Modal show={state.modal.active} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{state.modal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="createCourseModal">
            <Form.Group controlId="courseName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control type="text" onChange={(e) => setCourse({ ...newCourse, name: e.target.value }) } value={newCourse.name} name="name" placeholder="Name your Course" />
            </Form.Group>

            <Form.Group controlId="courseNum">
              <Form.Label>Course Name</Form.Label>
              <Form.Control type="text" onChange={(e) => setCourse({ ...newCourse, number: e.target.value }) } value={newCourse.number} name="courseNumber" placeholder="Course number" />
            </Form.Group>

            <Form.Group controlId="formDimensions">
              <div className="row mt-1">
                  <div className="col-sm-6">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control value={newCourse.startDate} onChange={(e) => setCourse({ ...newCourse, startDate: e.target.value }) } name="startDate" type="date" placeholder="Course start-date" />
                  </div>
                  <div className="col-sm-6">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control value={newCourse.endDate} onChange={(e) => setCourse({ ...newCourse, endDate: e.target.value }) } name="endDate" type="date" placeholder="Course end-date" />
                  </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleClose}>
            Close
          </Button>
          <Button
            form="createCourseModal"
            type="submit"
            variant="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default Dashboard;