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
    <ul className="list-group mr-2">
      {modules.map((module, index) => {
        if (module.course === courseId) {
          return <SingleModule props={{dataSource: module, index: index, clicked: clicked, setClicked: setClicked}}/>
        }
      })}
    </ul>
  );
}

export function handleCarotClick(props) {
  console.log(props.dataSource);
  props.clicked[props.index] = !props.clicked[props.index];
  props.setClicked([...props.clicked]);
}
 function SingleModule(props) {
  props = props.props;
  if (props.clicked[props.index]) {
    return (
      <div className="my-3">
            <li className="list-group-item rounded-top py-3 b-green" style={{listStyleType: "none", backgroundColor: "lightgrey", textAlign: "left"}}>
              <FaGripVertical className="m-1 mr-2" style={{color: "grey"}} /> 
              <div className="btn button" onClick={() => handleCarotClick(props)}><FaCaretDown />{props.dataSource.name}</div>
              <FaEllipsisV className="right-icon" style={{color: "black"}} />
              <FaPlus className="right-icon mx-3"/>
              <FaCheckCircle className="right-icon text-success" />
            </li>
          {
            props.dataSource.lessons?.map((lesson, index) => {
              return (<li className={`list-group-item py-3 b-green ${index == props.dataSource.lessons.length - 1 && 'rounded-bottom'}`} style={{ listStyleType: "none", backgroundColor: "lightgrey", textAlign: "left"}}>
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
    <li className="list-group-item rounded my-3 py-3 b-green" style={{listStyleType: "none", backgroundColor: "lightgrey", textAlign: "left"}}>
          <FaGripVertical className="m-1 mr-2" style={{color: "grey"}} /> 
          <div className="btn button" onClick={() => handleCarotClick(props)}><FaCaretRight />{props.dataSource.name}</div>
           <FaEllipsisV className="right-icon" style={{color: "black"}} />
           <FaPlus className="right-icon mx-3"/>
           <FaCheckCircle className=" right-icon text-success" />
        </li>
    
  );
}
export default ModuleList;