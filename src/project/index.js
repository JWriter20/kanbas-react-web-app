import Signin from "../Kanbas/Users/signin";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./nav";
import Account from "../Kanbas/Users/account"
import UserTable from "../Kanbas/Users/table";
import store from "./store";
import { Provider } from "react-redux";
import Signup from "../Kanbas/Users/signup";

function Project() {
    return <Provider store={store}>
        <div className="row container-fluid mt-2">
            <div className="col-3">
            <Nav />
            </div>
            <div className="col-9">
            <Routes>
                <Route path="/" element={<Navigate to="/project/home" />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/account" element={<Account />} />
                <Route path="/admin/users" element={<UserTable />} />
            </Routes>
            </div>
        </div>
    </Provider>
}
export default Project;