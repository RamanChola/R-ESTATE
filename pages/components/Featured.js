import * as React from "react";
function Featured(props) {
  const { data } = props;

  return (
    <div className="card banner-card">
      <img src={data[0].img} className="banner-img" alt="..." />
      <div className="banner-content">
        <h5 className="card-title banner-title">Palm Green</h5>
        <p className="card-text banner-text">Sector 7 Dwarka, New Delhi</p>
      </div>
    </div>
  );
}

export default Featured;
