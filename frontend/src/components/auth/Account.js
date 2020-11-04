import React, { useState, useEffect, useContext } from "react";
import { updateProfile } from "../../services";
import AppContext from "../AppContext";

const Account = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const appContext = useContext(AppContext);
  const [name, setName] = useState(auth.user.name);
  const [email, setEmail] = useState(auth.user.email);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (submitted) {
      validateInput();
    }
  }, [name, email, password]);

  const validateInput = () => {
    let newErrors = {};

    if (name.trim().length === 0) {
      newErrors["name"] = "Name is required";
    }

    if (email.trim().length === 0) {
      newErrors["email"] = "Email is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (validateInput()) {
      try {
        let data = { name, email };
        if (password && password.length > 0) {
          data["password"] = password;
        }
        const newProfile = await updateProfile(data);
        auth.user = newProfile;
        localStorage.setItem("auth", JSON.stringify(auth));
        setMessage("Your profile has been updated successfully.");
        setSubmitError(null);
        appContext.setAuth(auth);
      } catch (e) {
        console.log(e.message);
        setSubmitError(e.message);
        setMessage(null);
      }
    }
  };

  const roleText = (role) => {
    if (role === "admin") {
      return "Admin";
    } else if (role === "regular") {
      return "Regular";
    } else if (role === "owner") {
      return "Owner";
    }
  };

  return (
    <div className="container">
      {message && <div className="alert alert-success">{message}</div>}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              {" "}
              <h1>My account</h1>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
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
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-4 col-form-label text-md-right">
                    User Type
                  </label>

                  <div className="col-md-6">
                    <label className="col-form-label text-md-right">
                      {roleText(auth.user.role)}
                    </label>
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
                      Update
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
};
export default Account;
