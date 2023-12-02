import { Link } from "react-router-dom";
import "./index.css";
import { FaFileAlt } from "react-icons/fa";
import { React, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Modal, Button, Form } from 'react-bootstrap';

const course = {
  name: "New Course",      number: "New Number",
  startDate: "2023-09-10", endDate: "2023-12-15",
};

const ADD_COURSE = "ADD";
const EDIT_COURSE = "EDIT";

function Dashboard({ courses, updateCourse, addCourse, deleteCourse }
) {
  const [modalData, setModalData] = useState({active: false, title: "", modalType: ADD_COURSE, course: course});

  return (
    <div className="container">
      { modalData.active ? createModal(modalData, addCourse, updateCourse, setModalData ) : null}
      <h2>Dashboard</h2>
      <hr />
      <div className="container">
        <h3>Published Courses({courses.length})<div className="btn btn-primary float-end" onClick={
          () => setModalData({...modalData, active: true, title: "Add Course", modalType: ADD_COURSE, course: course})
        }>Add Course +</div></h3>
        <hr />
        <div className="row dashboard-row-margin">
            {makeRows(courses, deleteCourse, modalData, setModalData)}
        </div>
      </div>
    </div>
  );
}

function makeCard(course, deleteCourse, modalData, setModalData) {
  const showModal = () => {
    setModalData({...modalData, active: true, title: "Edit Course", modalType: EDIT_COURSE, course: course})
  }

  return <Link key={course._id} to={`/Kanbas/Courses/${course._id}`} className="list-group-item">
    <div className="col-12 col-md-6 col-xl-3">
            <div className="card shadow dashboard-card" style={{width: "270px"}}>
              <div className="card-body">
                  <p className="card-title">
                      {course.name}</p>
                  <p className="card-text">
                      {course.number}.{course._id}</p>
                  <p className="card-subtitle">
                      {course.startDate} | {course.endDate}</p>
                  <div className="btn px-1 py-0">
                  <FaFileAlt style={{color: "black", fontSize: "20px"}}/>
                  </div>
                  <div className="btn py-0 px-1 float-end" onClick={(event) => { 
                      event.preventDefault(); 
                      deleteCourse();
                    }}>
                    <FaTrash style={{color: "red", fontSize: "20px"}} />
                  </div>
                  <div className="btn py-0 px-1 float-end" onClick={(event) => { 
                      event.preventDefault(); 
                      showModal();
                    }}>
                    <FaEdit style={{color: "black", fontSize: "21px"}}/>
                  </div>
              </div>
        </div>
    </div>
  </Link>
}

function makeRows(courses, deleteCourse, modalData, setModalData) {
  let rows = [];

  for (let i = 0; i < courses.length; i += 4) {
    rows.push(
      <div className="list-group list-group-horizontal">
        {i < courses.length ? makeCard(courses[i], deleteCourse, modalData, setModalData) : ''}
        {i + 1 < courses.length ? makeCard(courses[i + 1], deleteCourse, modalData, setModalData): ''}
        {i + 2 < courses.length ? makeCard(courses[i + 2], deleteCourse, modalData, setModalData): ''}
        {i + 3 < courses.length ? makeCard(courses[i + 3], deleteCourse, modalData, setModalData): ''}
      </div>
    );

  }

  return <div>{rows}</div>
    
}

function createModal(modalData, addCourse, updateCourse, setModalData) {

  const handleSubmit = (event) => {
    event.preventDefault();
    switch (modalData.modalType) {
      case ADD_COURSE: addCourse(modalData.course); break;
      case EDIT_COURSE: updateCourse(modalData.course); break;
      default:
        break;
    }
    handleClose();
  };

  const handleClose = () => {
    setModalData({...modalData, active: false});
  };

  const setCourse = (course) => {
    setModalData({...modalData, course: course});

  };

  return (
    <>
      <Modal show={modalData.active} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="createCourseModal">
            <Form.Group controlId="courseName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control type="text" onChange={(e) => setCourse({ ...modalData.course, name: e.target.value }) } value={modalData.course.name} name="name" placeholder="Name your Course" />
            </Form.Group>

            <Form.Group controlId="courseNum">
              <Form.Label>Course Name</Form.Label>
              <Form.Control type="text" onChange={(e) => setCourse({ ...modalData.course, number: e.target.value }) } value={modalData.course.number} name="courseNumber" placeholder="Course number" />
            </Form.Group>

            <Form.Group controlId="formDimensions">
              <div className="row mt-1">
                  <div className="col-sm-6">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control value={modalData.course.startDate} onChange={(e) => setCourse({ ...modalData.course, startDate: e.target.value }) } name="startDate" type="date" placeholder="Course start-date" />
                  </div>
                  <div className="col-sm-6">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control value={modalData.course.endDate} onChange={(e) => setCourse({ ...modalData.course, endDate: e.target.value }) } name="endDate" type="date" placeholder="Course end-date" />
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