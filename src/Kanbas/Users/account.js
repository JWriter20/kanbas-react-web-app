import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";


function Account() {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchAccount = async () => {
    const account = await client.account();
    console.log(account)
    setAccount(account);
  };
  const save = async () => {
    await client.updateUser(account);
  };

  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
  };

  const signout = async () => {
    await client.signout();
    navigate("/project/signin");
  };


  useEffect(() => {
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }

  }, []);
  return (
    <div className="w-50">
  <h1>Account</h1>
  {account && (
    <div>
      <div className="mb-3">
        <input
          className="form-control"
          value={account.password}
          onChange={(e) => setAccount({ ...account, password: e.target.value })}
          placeholder="Password"
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          value={account.firstName}
          onChange={(e) => setAccount({ ...account, firstName: e.target.value })}
          placeholder="First Name"
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          value={account.lastName}
          onChange={(e) => setAccount({ ...account, lastName: e.target.value })}
          placeholder="Last Name"
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          value={account.dob}
          onChange={(e) => setAccount({ ...account, dob: e.target.value })}
          placeholder="Date of Birth"
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          value={account.email}
          onChange={(e) => setAccount({ ...account, email: e.target.value })}
          placeholder="Email"
        />
      </div>
      <div className="mb-3">
        <select
          className="form-select"
          onChange={(e) => setAccount({ ...account, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
      </div>
      <button className="btn btn-primary mb-3" onClick={save}>
        Save
      </button>
      <button className="btn btn-danger mb-3" onClick={signout}>
        Signout
      </button>
      <Link to="/project/admin/users" className="btn btn-warning w-100">
        Users
      </Link>
    </div>
  )}
</div>
  );
}
export default Account;