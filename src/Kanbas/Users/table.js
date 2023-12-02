import { BsTrash3Fill, BsFillCheckCircleFill, BsPencil, BsPlusCircleFill }
  from "react-icons/bs";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as client from "./client";
import { ButtonGroup } from "react-bootstrap";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ username: "", password: "", role: "USER" });

  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  const selectUser = async (user) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div>
      <h1>User List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </td>
            <td>
              <input
                type="password"
                className="form-control"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </td>
            <td>
              <select
                className="form-select"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </td>
            <td>
            <ButtonGroup className="m-2">
                <BsPlusCircleFill onClick={createUser} className="text-primary m-1 fs-1 text" />
                <BsFillCheckCircleFill onClick={updateUser} className="me-2 m-1 text-success fs-1 text" />
              </ButtonGroup>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <Link to={`/project/account/${user._id}`}>{user.username}</Link>
              </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                <td className="text-nowrap">
                  <button className="btn btn-warning me-2">
                    <BsPencil onClick={() => selectUser(user)} />
                  </button>
                  <button className="btn btn-danger me-2">
                    <BsTrash3Fill onClick={() => deleteUser(user)} />
                  </button>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;