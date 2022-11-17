import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from '@mui/material/Typography';

const Buy = () => {
  let data = [
    {
      title: "Lizard",
      content:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      price: "$ 100",
    },

    {
      title: "Lizard",
      content: "Mangolpuri, New Delhi",
      price: "$ 100",
    },

    {
      title: "Lizard",
      content:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      price: "$ 100",
    },

    {
      title: "Lizard",
      content:
        "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      price: "$ 100",
    },
  ];
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
