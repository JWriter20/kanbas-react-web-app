import ModuleList from "../Modules/ModuleList";
import {FaCheckCircle} from "react-icons/fa";


function Home() {
  return (
    <div className="row">
        <div className="col-9">
          <div class="btn m-1 btn-secondary">Collapse All</div>
          <div class="btn m-1 btn-secondary">View Progress</div>
          <select class="btn m-1 btn-secondary">
            <option>Publish All</option>
            <option>Publish All modules and items</option>
            <option>Publish modules only</option>
            <option>UnPublish All</option>
          </select>

          <div class="btn m-1 btn-danger">+ Module</div>

          <hr />
            <ModuleList />
        </div>
        <div className="col-3">

          <div class="btn-group-vertical my-3">
            <span style={{display:"flex"}}>
              <div class="btn rounded mx-1 btn-secondary">Unpublish</div>
              <div class="btn rounded btn-success" style={{display:"flex"}}><FaCheckCircle class="nav-icon m-1" style={{color: "white"}} />Published</div>
            </span>
            <div class="btn btn-secondary m-1 rounded max-width">Import Exisiting Content</div>
            <div class="btn btn-secondary m-1 rounded max-width">Import From Commons</div>
            <div class="btn btn-secondary m-1 rounded max-width">Choose Home Page</div>
            <div class="btn btn-secondary m-1 rounded max-width">View Course Stream</div>
            <div class="btn btn-secondary m-1 rounded max-width">New Announcement</div>
            <div class="btn btn-secondary m-1 rounded max-width">New Analytics</div>
            <div class="btn btn-secondary m-1 rounded max-width">View Course Notifications</div>

          </div>
        </div>
    </div>
  );
}
export default Home;