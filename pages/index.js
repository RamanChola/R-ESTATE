import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from '@mui/material/Typography';

export default function Home() {
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
      <h1>Top Projects</h1>
      <hr/>
      <Grid container>
        {data.map((e) => {
          return <Card props={{ e }} />;
        })}
      </Grid>
    </>
  );
}
