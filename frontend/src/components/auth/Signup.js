import React, { useState, useEffect } from "react";
import { signup } from "../../api";

export default function Signup({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitError, setSubmitError] = useState(null);
  const [errors, setErrors] = useState({});
  const [role, setRole] = useState("customer");
  const [submitted, setSubmitted] = useState(null);

  const validateForm = () => {
    let newErrors = {};

    if (name.length === 0) {
      newErrors["name"] = "Name is required";
    }

    if (email.length === 0) {
      newErrors["email"] = "Email is required";
    }
    if (password.length === 0) {
      newErrors["password"] = "Password is required";
    } else {
      if (password !== confirmPassword) {
        newErrors["confirm"] = "Confirm password doesn't match";
      }
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
    setSubmitError(null);
    try {
      await signup({ name, email, password, role });
      history.push("/");
    } catch (e) {
      setSubmitError(e.message);
    }
  };

  useEffect(() => {
    if (submitted) {
      validateForm();
    }
  }, [name, email, password, confirmPassword]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Sign Up</div>

            <div className="card-body">
              <form onSubmit={submitForm}>
                <div className="form-group row">
                  <label className="col-md-4 col-form-label text-md-right">
                    Name
                  </label>

                  <div className="col-md-6">
                    <input
                      id="name"
                      type="text"
                      className={
                        "form-control" + (errors["name"] ? " is-invalid" : "")
                      }
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
                      className={
                        "form-control" + (errors["email"] ? " is-invalid" : "")
                      }
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
                      className={
                        "form-control" + (errors["password"] ? " is-invalid" : "")
                      }
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
                    Confirm Password
                  </label>

                  <div className="col-md-6">
                    <input
                      id="password-confirm"
                      type="password"
                      className={
                        "form-control" +
                        (errors["confirm"] ? " is-invalid" : "")
                      }
                      name="password_confirmation"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors["confirm"] && (
                      <span className="invalid-feedback" role="alert">
                        <strong>{errors["confirm"]}</strong>
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-4 col-form-label text-md-right">
                    User Type
                  </label>

                  <div className="col-md-6">
                    <div
                      className="float-left mr-4"
                      style={{ position: "relative", top: "10px" }}
                    >
                      <input
                        className="mr-2"
                        type="radio"
                        onClick={() => setRole("customer")}
                        checked={role === "customer"}
                      />
                      <label className="form-check-label" for="exampleRadios1">
                        Customer
                      </label>
                    </div>

                    <div
                      className="float-left"
                      style={{ position: "relative", top: "10px" }}
                    >
                      <input
                        className="mr-2"
                        type="radio"
                        onClick={() => setRole("owner")}
                        checked={role === "owner"}
                      />
                      <label className="form-check-label">
                        Restaurant owner
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group row mb-0">
                  <div className="col-md-6 offset-md-4">
                    {submitError && (
                      <div className="pb-3 text-danger">
                        <strong>{submitError}</strong>
                      </div>
                    )}
                    <button type="submit" className="btn btn-primary">
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
