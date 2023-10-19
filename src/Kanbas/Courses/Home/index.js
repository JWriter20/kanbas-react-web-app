import ModuleList from "../Modules/ModuleList";
import React from "react";
import "./style.css";
import BreadCrumb from "../CourseNavigation/BreadCrumb";


function Home() {
  return (
    <div>
      <BreadCrumb menuPath={["Home"]}/>
      <ModuleList />
      <h2>Status</h2>
    </div>
  );
}
export default Home;