import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";
import ReviewForm from "../review/ReviewForm";
import Review from "../review/Review";
import RatingFilter from "../common/RatingFilter";
import ReplyForm from "../reply/ReplyForm";
import Reply from "../reply/Reply";
import ConfirmModal from "../common/ConfirmModal";
import {
  fetchReviewsForRestaurant,
  fetchRestaurant,
  createReview,
  replyToReview,
  deleteReview,
  deleteReply,
} from "../../api";
import { Role } from "../../utils/constants";

export default function RestaurantDetail({ history }) {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [search, ] = useState("");
  const [rateFilter, setRateFilter] = useState(0);
  const [total, setTotal] = useState(0);
  const [perPage, ] = useState(5);
  const [page, setPage] = useState(1);
  const [pending, ] = useState(false);
  const [submitReviewError, setSubmitReviewError] = useState(null);
  const [replyReviewId, setReplyReviewId] = useState(0);
  const [submitReplyError, setSubmitReplyError] = useState(null);
  const [ConfirmModalInfo, setConfirmModalInfo] = useState({
    open: false,
    action: null,
    id: null,
  });
  const auth = JSON.parse(localStorage.getItem("auth"));
  const editable = auth.user.role === Role.Admin;
  async function fetchRestaurantData() {
    if (!restaurantId) {
      history.goBack();
    }
    try {
      const data = await fetchRestaurant(restaurantId);
      setRestaurant(data);
    } catch (e) {
      history.goBack();
    }
  }

  async function fetchReviewsData() {
    try {
      const data = await fetchReviewsForRestaurant(restaurantId, {
        page,
        perPage,
        rate: rateFilter,
        noreply: pending,
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
    fetchRestaurantData();
  }, []);

  useEffect(() => {
    fetchReviewsData();
  }, [page, perPage, search, rateFilter, restaurantId, pending]);

  const onSubmitReview = async (data) => {
    try {
      await createReview(restaurantId, data);
      fetchReviewsData();
      fetchRestaurantData();
    } catch (e) {
      setSubmitReviewError(e.message);
    }
  };

  const onExpandReply = (reviewId) => {
    setReplyReviewId(reviewId);
  };

  const onUpdateReview = (updated) => {
    fetchReviewsData();
    fetchRestaurantData();
  };
  const onReply = async (reviewId, replyData) => {
    try {
      const data = await replyToReview(reviewId, replyData);
      const newReviews = reviews.map((review) =>
        review.id === reviewId ? data : review
      );
      setReviews(newReviews);
      setReplyReviewId(0);
    } catch (e) {
      setSubmitReplyError(e.message);
    }
  };

  const onCancelReply = () => {
    setReplyReviewId(0);
  };

  const onClickDeleteReview = (reviewId) => {
    setConfirmModalInfo({
      open: true,
      text: "Are you sure to delete this review?",
      action: "delete_review",
      id: reviewId,
    });
  };

  const onClickDeleteReply = (reviewId) => {
    setConfirmModalInfo({
      open: true,
      text: "Are you sure to delete the reply to this review?",
      action: "delete_reply",
      id: reviewId,
    });
  };

  const onHideConfirmModal = () => {
    setConfirmModalInfo({
      open: false,
    });
  };

  const onDialogConfirm = async () => {
    try {
      if (ConfirmModalInfo.action === "delete_review") {
        await deleteReview(ConfirmModalInfo.id);
      } else if (ConfirmModalInfo.action === "delete_reply") {
        await deleteReply(ConfirmModalInfo.id);
      }
      fetchReviewsData();
      fetchRestaurantData();
    } catch (e) {
      console.log(e);
      fetchReviewsData();
    }

    setConfirmModalInfo({
      open: false,
    });
  };

  const renderReviews = () => {
    return (
      <div className="review-list">
        {reviews &&
          reviews.map((review) => (
            <div className="review-item pb-4 pt-2" key={review.id}>
              <Review
                review={review}
                editable={editable}
                onUpdated={onUpdateReview}
                onDelete={onClickDeleteReview}
              />
              {review.reply && (
                <Reply
                  review={review}
                  editable={editable}
                  onUpdated={onUpdateReview}
                  onDelete={onClickDeleteReply}
                />
              )}
              {(auth.user.role === Role.Admin ||
                auth.user.role === Role.Owner) && (
                <>
                  {replyReviewId !== review.id && !review.reply && (
                    <a
                      className="btn btn-sm font-weight-bold"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onExpandReply(review.id);
                      }}
                    >
                      Reply
                    </a>
                  )}

                  {replyReviewId === review.id && (
                    <ReplyForm
                      onSubmit={(data) => onReply(review.id, data)}
                      onCancel={onCancelReply}
                      error={submitReplyError}
                    />
                  )}
                </>
              )}
            </div>
          ))}
      </div>
    );
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        {restaurant && (
          <div className="card">
            <div className="card-body">
              <h1 className="mb-0 pb-2 border-bottom">{restaurant.name}</h1>
              <div className="mb-2">
                <StarRatings
                  rating={restaurant.rate || 0}
                  starDimension="20px"
                  starSpacing="0px"
                  starRatedColor="#da3743"
                />{" "}
                <span
                  className=" ml-2"
                  style={{ position: "relative", top: "3px" }}
                >
                  {Number((restaurant.rate || 0).toFixed(2))}
                </span>
                <span
                  className="ml-4"
                  style={{ position: "relative", top: "4px" }}
                >
                  <i className="far fa-comment-alt pr-2 align-middle"></i>
                  {restaurant.reviewCount} reviews
                </span>
                <span
                  className="ml-4"
                  style={{ position: "relative", top: "4px" }}
                >
                  <i className="fas fa-utensils pr-2 align-middle"></i>
                  {restaurant.location}
                </span>
              </div>
              <div className="mb-3">
                {restaurant.description.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>

              {restaurant &&
                auth.user.role !== Role.Owner &&
                !restaurant.reviewed && (
                  <div className="mt-5">
                    <h4 className="border-bottom pb-2">
                      Leave your review to this restaurant.
                    </h4>
                    <ReviewForm
                      onSubmit={onSubmitReview}
                      error={submitReviewError}
                      title=""
                    />
                  </div>
                )}
              {restaurant.highestReview && (
                <div className="card mt-5">
                  <div className="card-body">
                    {restaurant.highestReview && (
                      <div>
                        <h5 className="border-bottom pb-2">
                          Highest rated review
                        </h5>
                        <Review review={restaurant.highestReview} />
                      </div>
                    )}
                    {restaurant.lowestReview && (
                      <div>
                        <h5 className="mt-5 border-bottom pb-2">
                          Lowest rated review
                        </h5>
                        <Review review={restaurant.lowestReview} />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {loaded && (
                <div className="card mt-5">
                  <div className="card-body">
                    <h4 className="pb-2">Reviews</h4>

                    {renderReviews()}
                    <Pagination
                      itemClass="page-item"
                      linkClass="page-link"
                      innerClass="pagination float-left mt-3"
                      prevPageText="‹"
                      nextPageText="›"
                      activePage={page}
                      itemsCountPerPage={perPage}
                      totalItemsCount={total}
                      pageRangeDisplayed={5}
                      onChange={(p) => setPage(p)}
                    />
                    <div className="float-left">
                      <div className="my-3 ml-5">
                        <span className="mr-3">Filter by</span>{" "}
                        <RatingFilter
                          value={rateFilter}
                          onChange={setRateFilter}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {fetchError && <p className="text-danger mt-4">{fetchError}</p>}
            </div>
          </div>
        )}
      </div>
      <ConfirmModal
        show={ConfirmModalInfo.open}
        text={ConfirmModalInfo.text}
        onConfirm={onDialogConfirm}
        onHide={onHideConfirmModal}
      />
    </div>
  );
}
