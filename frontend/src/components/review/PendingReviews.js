import React, { useState, useEffect } from "react";
import Pagination from "../common/Pagination";
import StarRatings from "../common/StarRatings";
import { Link } from "react-router-dom";
import ReplyForm from "../reply/ReplyForm";
import moment from "moment-timezone";
import * as API from "../../api";

export default function PendingReviews({ history }) {
  const [reviews, setReviews] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [search] = useState("");
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [replyReviewId, setReplyReviewId] = useState(0);
  const [submitReplyError, setSubmitReplyError] = useState(null);

  async function fetchReviewsData() {
    try {
      const data = await API.fetchPendingReviews({
        page,
        pageSize,
        search,
      });

      setReviews(data.reviews);
      setTotal(data.total);
      setPage(data.page);
      setLoaded(true);
    } catch (e) {
      setFetchError(e.message);
    }
  }

  useEffect(() => {
    fetchReviewsData();
  }, [page, pageSize, search]);

  const onExpandReply = (reviewId) => {
    setReplyReviewId(reviewId);
  };

  const onReply = async (reviewId, replyData) => {
    try {
      setReplyReviewId(reviewId);
      setSubmitReplyError(null);
      const data = await API.replyToReview(reviewId, replyData);
      const newReviews = reviews.map((review) =>
        review.id === reviewId ? data : review
      );
      setReviews(newReviews);
      fetchReviewsData();
    } catch (e) {
      setSubmitReplyError(e.message);
    }
  };

  const startIndex = Math.min(pageSize * (page - 1) + 1, total);
  const endIndex = Math.min(startIndex + pageSize - 1, total);

  const renderTable = () => {
    return (
      <table className="table table-hover mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Restaurant</th>
            <th>Reviewed by</th>
            <th>Reviewed at</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {reviews &&
            reviews.map((review, idx) => (
              <tr key={review.id}>
                <th>{startIndex + idx}</th>
                <td className="font-weight-bolder">
                  <Link
                    className="text-dark link"
                    to={`/restaurants/${review.restaurant.id}`}
                  >
                    {review.restaurant.name}
                  </Link>
                </td>
                <td>{review.user.name}</td>
                <td>{moment(review.createdAt).format("MMM D, YYYY")}</td>
                <td>
                  <StarRatings rating={review.rate} /> <p>{review.comment}</p>
                  <ReplyForm
                    title={""}
                    onSubmit={(data) => onReply(review.id, data)}
                    error={
                      review.id === replyReviewId ? submitReplyError : null
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h1 className="pt-3">Pending review</h1>
          <div className="">{renderTable()}</div>

          {!fetchError && loaded && reviews.length === 0 && (
            <div className="text-center">No Pending reviews</div>
          )}
        </div>
        <div className="border-top w-100 pt-3">
          <div className="float-right"></div>

          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            onChange={(p) => setPage(p)}
          />
          <div className="float-right mx-4 mt-2">
            Showing ({startIndex} - {endIndex}) / {total}
          </div>
          <div className="float-right mr-2 mt-1">
            Show per page &nbsp;
            <select
              className="form-control-sm"
              value={pageSize}
              onChange={(event) => {
                setPageSize(parseInt(event.target.value));
                setPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
