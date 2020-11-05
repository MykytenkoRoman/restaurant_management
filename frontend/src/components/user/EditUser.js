import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserForm from "./UserForm";
import * as API from "../../api";

export default function EditUser({ history }) {
  const [user, setUser] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetched = await API.fetchUser(userId);
        setUser(fetched);
      } catch (e) {
        history.push("/users");
      }
    }

    fetchData();
  }, [history, userId]);

  const submitForm = async (formData) => {
    if (!user) {
      return;
    }
    try {
      await API.updateUser(userId, formData);
      history.push("/users");
    } catch (e) {
      setSubmitError(e.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header font-weight-bold">Edit user</div>
            <div className="card-body">
              {user && (
                <UserForm
                  user={user}
                  submitButtonText="Update user"
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
