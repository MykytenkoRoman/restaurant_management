import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

function UserForm({
  user,
  formError,
  submitButtonText = "Create User",
  handleSubmit,
  history,
}) {
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [role, setRole] = useState(user ? user.role : "customer");
  const [submitted, setSubmitted] = useState(false);
  const validateForm = () => {
    let newErrors = {};
    if (name.length === 0) {
      newErrors["name"] = "Name is required";
    }
    if (email.length === 0) {
      newErrors["email"] = "Email is required";
    }

    if (!user && password.length === 0) {
      newErrors["password"] = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!validateForm()) {
      return;
    }
    const formData = {
      name,
      email,
      role,
    };
    if (password.length > 0) {
      formData["password"] = password;
    }

    handleSubmit(formData);
  };
  useEffect(() => {
    if (submitted) {
      validateForm();
    }
  }, [name, email, password, submitted]);

  const cancel = (e) => {
    e.preventDefault();
    history.push("/users");
  };

  return (
    <form onSubmit={submitForm}>
      <div className="form-group row">
        <label className="col-md-4 col-form-label text-md-right">Name</label>

        <div className="col-md-6">
          <input
            id="name"
            type="text"
            className={"form-control" + (errors["name"] ? " is-invalid" : "")}
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors["name"] && (
            <span className="invalid-feedback" role="alert">
              <strong>{errors["name"]}</strong>
            </span>
          )}
        </div>
      </div>

      <div className="form-group row">
        <label className="col-md-4 col-form-label text-md-right">
          Email Address
        </label>

        <div className="col-md-6">
          <input
            id="email"
            type="email"
            className={"form-control" + (errors["email"] ? " is-invalid" : "")}
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {errors["email"] && (
            <span className="invalid-feedback" role="alert">
              <strong>{errors["email"]}</strong>
            </span>
          )}
        </div>
      </div>

      <div className="form-group row">
        <label className="col-md-4 col-form-label text-md-right">
          Password
        </label>

        <div className="col-md-6">
          <input
            id="password"
            type="password"
            className={"form-control" + (errors["password"] ? " is-invalid" : "")}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errors["password"] && (
            <span className="invalid-feedback" role="alert">
              <strong>{errors["password"]}</strong>
            </span>
          )}
        </div>
      </div>

      <div className="form-group row">
        <label className="col-md-4 col-form-label text-md-right">
          User Type
        </label>

        <div className="col-md-6">
          <select
            className="form-control"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value="customer">Customer</option>
            <option value="owner">Restaurant Owner</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="form-group row mb-0">
        <div className="col-md-6 offset-md-4">
          {formError && (
            <div className="pb-3 text-danger">
              <strong>{formError}</strong>
            </div>
          )}
          <button type="submit" className="btn btn-primary">
            {submitButtonText}
          </button>
          <button className="ml-2 btn btn-secondary" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default withRouter(UserForm);
