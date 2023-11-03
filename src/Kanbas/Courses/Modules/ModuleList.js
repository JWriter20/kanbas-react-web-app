import React, { useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../Database";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaGripVertical, FaCaretDown, FaCaretRight, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
} from "./modulesReducer";

function ModuleList() {
  const { courseId } = useParams();
  const modules = useSelector((state) => state.modulesReducer.modules);
  const module = useSelector((state) => state.modulesReducer.module);
  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(new Array(modules.length).fill(false));
  return (
    <ul className="list-group mr-2">
        <li className="list-group-item">
          <form className= 'card p-3 bg-light'>
            <b>Create a new module</b>
          <div className="form-group m-1">
            <input className="form-control" value={module.name}
                onChange={(e) => dispatch(setModule({
                  ...module, name: e.target.value }))}
              />
          </div>
          <div class="form-group m-1">
          <textarea className="form-control" value={module.description}
              onChange={(e) => dispatch(setModule({
                ...module, description: e.target.value }))}
            />
          </div>
          <button type="submit" className="btn btn-success m-1" onClick={() => { dispatch(addModule(module)) }}>Add</button>
          <button className="btn btn-primary m-1" onClick={() => { dispatch(updateModule(module)) }}>Update</button>
          </form>
        </li>
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
  const dispatch = useDispatch();
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
              <div className="btn py-0 px-1 float-end" onClick={() => dispatch(deleteModule(props.dataSource._id))}>
                <FaTrash className="right-icon text-danger mx-1"/>
              </div>
              <div className="btn py-0 px-1 float-end" onClick={() => { dispatch(setModule(props.dataSource))}}>
                <FaEdit className="right-icon mx-1"/>
              </div>
            </li>
          {
            props.dataSource.lessons?.map((lesson, index) => {
              return (<li className={`list-group-item py-3 b-green ${index == props.dataSource.lessons.length - 1 && 'rounded-bottom'}`} style={{ listStyleType: "none", backgroundColor: "lightgrey", textAlign: "left"}}>
              <FaGripVertical className="m-1 mr-2" style={{color: "grey"}} /> 
               <FaEllipsisV className="right-icon" style={{color: "black"}} />
               <FaCheckCircle className="right-icon text-success" />
                <div className="btn py-0 px-1 float-end">
                  <FaTrash className="right-icon text-danger mx-1"/>
                </div>
                <div className="btn py-0 px-1 float-end">
                  <FaEdit className="right-icon mx-1"/>
                </div>
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
           <div className="btn py-0 px-1 float-end" onClick={() => dispatch(deleteModule(props.dataSource._id))}>
              <FaTrash className="right-icon text-danger mx-1"/>
            </div>
            <div className="btn py-0 px-1 float-end" onClick={() => { dispatch(setModule(props.dataSource)); }}>
              <FaEdit className="right-icon mx-1"/>
            </div>
        </li>
    
  );
}
export default ModuleList;