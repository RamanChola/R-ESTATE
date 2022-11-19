import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import dataSet from "../../data";
import Footer from "../components/Footer";

const Buy = () => {
  return (
    <>
      <Navbar />
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
      <Footer/>
    </>
  );
};

export default Buy;
