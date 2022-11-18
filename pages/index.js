import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from '@mui/material/Typography';
import data from "../data";

export default function Home() {
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
