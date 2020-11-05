import React, { useState, useEffect } from "react";
import * as API from "../../api";
import Pagination from "../common/Pagination";
import RatingFilter from "../common/RatingFilter";
import StarRatings from "../common/StarRatings";

export default function UserRestaurantList({ history }) {
  const [restaurants, setRestaurants] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [rateFilter, setRateFilter] = useState(0);

  async function fetchData() {
    try {
      const data = await API.fetchRestaurants({
        page,
        pageSize,
        query,
        rate: rateFilter,
      });
      setRestaurants(data.restaurants);
      setTotal(data.total);
      setPage(data.page);
      setLoaded(true);
    } catch (e) {
      setFetchError(e.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page, pageSize, query, rateFilter]);

  const onClickRestaurant = (restaurantId) => {
    history.push(`/restaurants/${restaurantId}`);
  };

  const pageCount = Math.floor(total / pageSize) + 1;

  const renderTable = () => {
    return (
      <div className="row restaurant-list">
        {restaurants &&
          restaurants.map((restaurant, idx) => (
            <div
              className="restaurant-item cursor-pointer col-12 border my-1 py-3"
              key={restaurant.id}
              onClick={() => onClickRestaurant(restaurant.id)}
            >
              <h5 className="my-0">{restaurant.name}</h5>
              <div className="">
                <StarRatings rating={restaurant.rate || 0} />{" "}
                <span
                  className="ml-4 small"
                  style={{ position: "relative", top: "3px" }}
                >
                  <i className="far fa-comment-alt pr-1 align-middle"></i>
                  {restaurant.reviewCount} reviews
                </span>
                <div>
                  <span
                    className=" small"
                    style={{ position: "relative", top: "3px" }}
                  >
                    <i className="fas fa-map-marker-alt pr-1 align-middle"></i>

                    {restaurant.location}
                  </span>
                </div>
              </div>
              <div className="small"></div>

              <div className="text-secondary mt-2">
                {restaurant.description.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div>
            <h1 className="pt-2">All Restaurants</h1>
            <div className="clearfix pt-3">
              <div className=" float-left form-group has-search mr-4">
                <span className="fa fa-search form-control-feedback"></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
              <RatingFilter
                value={rateFilter}
                onChange={(r) => {
                  setRateFilter(r);
                  setPage(1);
                }}
              />
            </div>
          </div>
          <div className="">
            <div className="">{renderTable()}</div>

            {!fetchError && loaded && restaurants.length === 0 && (
              <div className="">No restaurants found</div>
            )}
          </div>

          <div className="mt-4">
            <div className="float-right">
              <Pagination
                page={page}
                pageSize={pageSize}
                total={total}
                onChange={(p) => setPage(p)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
