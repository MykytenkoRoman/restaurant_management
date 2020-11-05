import React from "react";
import StarRatings from "react-star-ratings";
import Dropdown from "react-bootstrap/Dropdown";

export default function RatingFilter({ value, onChange }) {
  return (
    <Dropdown className="rating-dropdown">
      <Dropdown.Toggle variant="" id="dropdown-basic">
        {value == 0 ? (
          "All Ratings"
        ) : (
          <StarRatings
            rating={value}
            starDimension="15px"
            starSpacing="0px"
            starRatedColor="#da3743"
            className="aaaaaaaaaaaaaaa"
            style={{background: "#ff0000"}}
          />
        )}
      </Dropdown.Toggle> 

      <Dropdown.Menu>
        <Dropdown.Item className="pb-2" onClick={() => onChange(0)}>All Ratings</Dropdown.Item>
        {[5, 4, 3, 2, 1].map((r) => (
          <Dropdown.Item key={r} className="pb-2" onClick={() => onChange(r)}>
            <StarRatings
              rating={r}
              starDimension="15px"
              starSpacing="0px"
              starRatedColor="#da3743"
            />
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
