import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function BreadCrumb() {
    const barsStyle = { color: "red", margin: "10px", marginBottom: "0px", marginRight: "15px", fontSize: "30px" };
    const menuPath = useLocation().pathname.split("/").slice(3);
    console.log(menuPath);

    return (
        <div class="row">
        <div class="col-md-1" width="10px">
            <Link
                key={menuPath.join("/")}
                to={`${useLocation().pathname}`}
                className={`profile-nav-item list-group-item`}>
                <FaBars style={barsStyle}/>
            </Link>
        </div>
        <div class="col-md-11">
          <nav class="breadcrumb-menu" style={{BsBreadcrumbDivider: '>', margin: "15px", marginBottom: "0px"}}>
            <ol class="breadcrumb">
                {
                    menuPath
                        .map((path, index) => (
                            index == menuPath.length - 1 ?
                            <li class="breadcrumb-item active">
                                {path}
                            </li> :
                            <li class="breadcrumb-item">
                            <Link
                                style={{textDecoration: 'none', color: 'red'}}
                                key={path}
                                to={`/Kanbas/Courses/${menuPath.slice(0, index + 1).join("/")}`}>
                                {path}
                            </Link>
                        </li>
                     ))
                }
            </ol>
          </nav>
        </div>
        <hr />
      </div>
    );
  }

  export default BreadCrumb;