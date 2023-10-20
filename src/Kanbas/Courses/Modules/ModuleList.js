import React, { useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../Database";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaGripVertical, FaCaretDown, FaCaretRight, FaPlus } from "react-icons/fa";

function ModuleList() {
  const { courseId } = useParams();
  const modules = db.modules;
  const [clicked, setClicked] = useState(new Array(modules.length).fill(false));
  return (
    <ul class="list-group mr-2">
      {console.log(modules)}
      {modules.filter((module) => module.course === courseId).map((module, index) => {
        return <SingleModule props={{index:index, clicked: clicked, setClicked: setClicked}}/>
      })}
    </ul>
  );
}

function handleCarotClick(props) {
  props.clicked[props.index] = !props.clicked[props.index];
  props.setClicked([...props.clicked]);
}

function SingleModule(props) {
  props = props.props;
  const modules = db.modules;
  if (props.clicked[props.index]) {
    return (
      <div>
            <li className="list-group-item rounded-top py-3 b-green" style={{backgroundColor: "lightgrey", textAlign: "left"}}>
              <FaGripVertical className="m-1 mr-2" style={{color: "grey"}} /> 
              <div className="btn button" onClick={() => handleCarotClick(props)}><FaCaretDown />{modules[props.index].name}</div>
              <FaEllipsisV className="right-icon" style={{color: "black"}} />
              <FaPlus className="right-icon mx-3"/>
              <FaCheckCircle className="right-icon text-success" />
            </li>
          {
            modules[props.index].lessons.map((lesson, index) => {
              return (<li className={`list-group-item py-3 b-green ${index == modules[props.index].lessons.length - 1 && 'rounded-bottom'}`} style={{backgroundColor: "lightgrey", textAlign: "left"}}>
              <FaGripVertical className="m-1 mr-2" style={{color: "grey"}} /> 
               <FaEllipsisV className="right-icon" style={{color: "black"}} />
               <FaCheckCircle className="right-icon text-success" />
               <a className="indent">{lesson.name}</a>
              </li>)
            })
          }

      </div>
    );
  }

  return (
    <li className="list-group-item rounded my-3 py-3 b-green" style={{backgroundColor: "lightgrey", textAlign: "left"}}>
          <FaGripVertical className="m-1 mr-2" style={{color: "grey"}} /> 
          <div className="btn button" onClick={() => handleCarotClick(props)}><FaCaretRight />{modules[props.index].name}</div>
           <FaEllipsisV className="right-icon" style={{color: "black"}} />
           <FaPlus className="right-icon mx-3"/>
           <FaCheckCircle className=" right-icon text-success" />
        </li>
    
  );
}
export default ModuleList;