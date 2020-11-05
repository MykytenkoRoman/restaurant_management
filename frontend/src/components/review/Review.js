import React, { useState, useEffect } from "react";
import StarRatings from "../common/StarRatings";
import ReviewForm from "./ReviewForm";
import moment from "moment-timezone";
import * as API from "../../api";
export default function Review({
  editable = false,
  review,
  onUpdated,
  onDelete,
}) {
  const [editing, setEditing] = useState(false);
  const [updateReviewError, setUpdateReviewError] = useState(null);
  const auth = JSON.parse(localStorage.getItem("auth"));
  let userName = review.user.name;
  if (auth && auth.user.id === review.user.id) {
    userName = <b>me</b>;
  }

  const onCancelEditing = () => {
    setEditing(false);
  };

  const onUpdateReview = async (data) => {
    try {
      const updated = await API.updateReview(review.id, data);
      onUpdated(updated);
      setEditing(false);
    } catch (e) {
      setUpdateReviewError(e.message);
    }
  };

  return editing ? (
    <ReviewForm
      review={review}
      onSubmit={onUpdateReview}
      onCancel={onCancelEditing}
      error={updateReviewError}
      title="Edit your review"
    />
  ) : (
    <div className="pt-1">
      {editable && (
        <div className="float-right">
          <a
            className="btn text-secondary px-1"
            onClick={(e) => setEditing(!editing)}
          >
            <i className="fas fa-edit"></i>
          </a>
          <a
            className="btn text-secondary px-1"
            onClick={(e) => {
              onDelete(review.id);
              setEditing(false);
            }}
          >
            <i className="far fa-trash-alt"></i>
          </a>
        </div>
      )}
      <div className="">
        <StarRatings rating={review.rate} />{" "}
        <span
          className="small ml-3"
          style={{ position: "relative", top: "3px" }}
        >
          Visited on {moment(review.visitDate).format("MMMM D YYYY")}
        </span>
      </div>

      <div>
        <span
          className="small text-secondary "
          style={{ position: "relative", top: "3px" }}
        >
          {moment(review.createdAt).fromNow()}, by {userName}
        </span>
      </div>
      <div className="my-1">
        {(review.comment || "").split("\n").map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </div>
  );
}
