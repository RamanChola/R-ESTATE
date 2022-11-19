import * as React from "react";
function Featured(props) {
  const { data } = props;

  return (
    <div className="card banner-card">
      <img src={data[0].img} className="banner-img" alt="..." />
      <div className="banner-content">
        <h5 className="card-title banner-title">{data[0].title}</h5>
        <p className="card-text banner-text">{data[0].content}</p>
      </div>
    </div>
  );
}

export default Featured;
