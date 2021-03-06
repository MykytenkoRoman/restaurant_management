import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantForm from "./RestaurantForm";
import * as API from "../../api";

export default function EditRestaurant({ history }) {
  const [restaurant, setRestaurant] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const { restaurantId } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const fetched = await API.fetchRestaurant(restaurantId);
        setRestaurant(fetched);
      } catch (e) {
        history.push("/restaurants");
      }
    }

    fetchData();
  }, [history, restaurantId]);

  const submitForm = async (formData) => {
    try {
      await API.updateRestaurant(restaurantId, formData);
      history.push("/restaurants");
    } catch (e) {
      setSubmitError(e.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
          <div className="card-header font-weight-bold">
            Edit restaurant
            </div>
            <div className="card-body">
              {restaurant && (
                <RestaurantForm
                  restaurant={restaurant}
                  submitButtonText="Update restaurant"
                  formError={submitError}
                  handleSubmit={submitForm}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
