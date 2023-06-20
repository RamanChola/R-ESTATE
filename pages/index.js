import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "./components/Navbar";
import data from "../data";
import Footer from "./components/Footer";
import Featured from "./components/Featured";
import Body from "./components/Body";
export default function Home() {
  return (
    <>
      <Navbar />
      {/* <Featured data={data} /> */}
      <Body />
      <Footer />
    </>
  );
}
