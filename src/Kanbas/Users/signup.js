import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";

function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await client.signup(credentials);
      navigate("/project/account");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6">
        <h1 className="mb-4">Signup</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        <button className="btn btn-primary" onClick={signup}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;