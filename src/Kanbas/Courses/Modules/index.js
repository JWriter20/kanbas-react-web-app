import ModuleList from "./ModuleList";
function Modules() {
  return (
    <div className="container">
        <div className="btn m-1 btn-secondary">Collapse All</div>
        <div className="btn m-1 btn-secondary">View Progress</div>
        <select className="btn m-1 btn-secondary">
          <option>Publish All</option>
          <option>Publish All modules and items</option>
          <option>Publish modules only</option>
          <option>UnPublish All</option>
        </select>

        <div className="btn m-1 btn-danger">+ Module</div>

        <hr />
      <ModuleList />
    </div>
  );
}
export default Modules;