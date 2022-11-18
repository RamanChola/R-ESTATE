import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from '@mui/material/Typography';
import data from "../../data";

const Buy = () => {
  
  return (
    <>
      <Navbar />
      <h1>Properties For You</h1>
      <Grid container>
        {data.map((e) => {
          return <Card props={{ e }} />;
        })}
      </Grid>
    </>
  );
};

export default Buy;
