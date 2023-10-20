import React, {useState} from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../Database";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaGripVertical, FaCaretDown, FaCaretRight, FaPlus } from "react-icons/fa";

function Assignments() {
  const { courseId } = useParams();
  const assignments = db.assignments;
  const [clicked, setClicked] = useState(false);
  const courseAssignments = assignments.filter(
    (assignment) => assignment.course === courseId);
  return (
    <div className="container">
          <div class="row">
            <div class="col-md-5">
              <div class="form-group">
                <input type="text" class="form-control mt-2" id="textInput" placeholder="Search for Assignment" />
              </div>
            </div>
            <div class="col-md-7">
              <div class="btn-group" style={{float: "right"}}>
                <button class="btn btn-secondary rounded ">+Group</button>
                <button class="btn btn-danger mx-1 rounded">+Assignment</button>
                <button class="btn btn-secondary rounded"><FaEllipsisV style={{color: "black"}} /></button>
              </div>
            </div>
          </div>

          <hr />
      <div className="list-group">
        {
            clicked ?
              (
                <div className="my-3">
                      <li className="list-group-item rounded-top py-3 b-green" style={{listStyleType: "none", backgroundColor: "lightgrey", textAlign: "left"}}>
                        <FaGripVertical className="m-1 mr-2" style={{color: "grey"}} /> 
                        <div className="btn button" onClick={() => setClicked(!clicked)}><FaCaretDown />Assignments</div>
                        <FaEllipsisV className="right-icon" style={{color: "black"}} />
                        <FaPlus className="right-icon mx-3"/>
                        <FaCheckCircle className="right-icon text-success" />
                      </li>
                    {
                      assignments.map((assignment, index) => {
                        return (<li className={`list-group-item  py-3 b-green ${index == assignments.length - 1 && 'rounded-bottom'}`} style={{ listStyleType: "none", backgroundColor: "lightgrey", textAlign: "left"}}>
                          <span>
                            <FaGripVertical className="m-1 mr-2" style={{color: "grey"}} /> 
                            <FaEllipsisV className="right-icon" style={{color: "black"}} />
                            <FaCheckCircle className="right-icon text-success" />
                            <Link
                                style={{backgroundColor: "lightgrey"}}
                                key={assignment._id}
                                to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                                className="list-group-item">
                                {assignment.title}
                              </Link>
                          </span>
                        </li>)
                      })
                    }
          
                </div>
              ) : (
              <li className="list-group-item rounded my-3 py-3 b-green" style={{listStyleType: "none", backgroundColor: "lightgrey", textAlign: "left"}}>
                    <FaGripVertical className="m-1 mr-2" style={{color: "grey"}} /> 
                    <div className="btn button" onClick={() => setClicked(!clicked)}><FaCaretRight />Assignments</div>
                     <FaEllipsisV className="right-icon" style={{color: "black"}} />
                     <FaPlus className="right-icon mx-3"/>
                     <FaCheckCircle className=" right-icon text-success" />
                  </li>      
            )}
      </div>
    </div>
  );
}

export default Assignments;