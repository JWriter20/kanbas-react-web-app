import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function BreadCrumb() {
    const barsStyle = { color: "red", margin: "10px", marginBottom: "0px", marginRight: "15px", fontSize: "30px" };
    const menuPath = decodeURI(useLocation().pathname).split("/").slice(3);
    console.log(menuPath);

    return (
        <div className="row">
            <div className="col-md-1" width="10px">
                <Link
                    key={menuPath.join("/")}
                    to={`${useLocation().pathname}`}
                    className={`profile-nav-item list-group-item`}>
                    <FaBars style={barsStyle}/>
                </Link>
            </div>
            <div className="col-md-11">
            <nav className="breadcrumb-menu" style={{BsBreadcrumbDivider: '>', margin: "10px", marginLeft: "0px", marginBottom: "0px"}}>
                <ol className="breadcrumb">
                    {
                        menuPath
                            .map((path, index) => (
                                index == menuPath.length - 1 ?
                                <li className="breadcrumb-item h3 active">
                                    {path}
                                </li> :
                                <li className="breadcrumb-item h3">
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