import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

function RestaurantForm({
  restaurant,
  formError,
  submitButtonText = "Create Restaurant",
  handleSubmit,
  history,
}) {
  const [name, setName] = useState(restaurant ? restaurant.name : "");
  const [description, setDescription] = useState(
    restaurant ? restaurant.description : ""
  );
  const [location, setLocation] = useState(restaurant ? restaurant.location || "" : "");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (name.length === 0) {
      newErrors["name"] = "Name is required";
    }

    if (description.length === 0) {
      newErrors["description"] = "Description is required";
    }

    if (location.length === 0) {
      newErrors["location"] = "location is required";
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
      description,
      location,
    };

    handleSubmit(formData);
  };

  useEffect(() => {
    if (submitted) {
      validateForm();
    }
  }, [name, description, location, submitted]);

  const cancel = (e) => {
    e.preventDefault();
    history.push("/restaurants");
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
        <label className="col-md-4 col-form-label text-md-right">Location</label>

        <div className="col-md-6">
          <input
            id="location"
            type="text"
            className={
              "form-control" + (errors["location"] ? " is-invalid" : "")
            }
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {errors["location"] && (
            <span className="invalid-feedback" role="alert">
              <strong>{errors["location"]}</strong>
            </span>
          )}
        </div>
      </div>

      <div className="form-group row">
        <label className="col-md-4 col-form-label text-md-right">
          Description
        </label>

        <div className="col-md-6">
          <textarea
            id="description"
            type="text"
            className={
              "form-control" + (errors["description"] ? " is-invalid" : "")
            }
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />



          {errors["description"] && (
            <span className="invalid-feedback" role="alert">
              <strong>{errors["description"]}</strong>
            </span>
          )}
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

export default withRouter(RestaurantForm);
