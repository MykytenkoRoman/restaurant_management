import React from "react";
import StarRatings from "react-star-ratings";
export default function CustomStarRatings({
  rating,
  starDimension = "20px",
  starSpacing = "0px",
  ...rest
}) {
  return (
    <StarRatings
      rating={rating}
      starDimension={starDimension}
      starSpacing={starSpacing}
      starRatedColor="#ffc600"
      starHoverColor="#ffc600"
      svgIconViewBox="0 0 20 20"
      svgIconPath="M16.85,7.275l-3.967-0.577l-1.773-3.593c-0.208-0.423-0.639-0.69-1.11-0.69s-0.902,0.267-1.11,0.69L7.116,6.699L3.148,7.275c-0.466,0.068-0.854,0.394-1,0.842c-0.145,0.448-0.023,0.941,0.314,1.27l2.871,2.799l-0.677,3.951c-0.08,0.464,0.112,0.934,0.493,1.211c0.217,0.156,0.472,0.236,0.728,0.236c0.197,0,0.396-0.048,0.577-0.143l3.547-1.864l3.548,1.864c0.18,0.095,0.381,0.143,0.576,0.143c0.256,0,0.512-0.08,0.729-0.236c0.381-0.277,0.572-0.747,0.492-1.211l-0.678-3.951l2.871-2.799c0.338-0.329,0.459-0.821,0.314-1.27C17.705,7.669,17.316,7.343,16.85,7.275z"
      {...rest}
    />
  );
}
