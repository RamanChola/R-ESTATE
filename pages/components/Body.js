import React from "react";
import Card from "./Card";
import Grid from "@mui/material/Unstable_Grid2";
import dataSet from "../../data";

const Body = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Top Deals </h1>
        <hr />
      </div>

      <Grid container style={{ display: "flex", justifyContent: "center" }}>
        {dataSet.map((data) => {
          return <Card props={{ data }} />;
        })}
      </Grid>
    </>
  );
};

export default Body;
