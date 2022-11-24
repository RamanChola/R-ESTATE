import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { contractAddress, contractABI } from "../../utils/constants";
import { ethers } from "ethers";
import axios from "axios";
import Know from "../folio/Know";

export default function ImgMediaCard({ data }) {
  const [image, setImage] = React.useState("");
  React.useEffect(() => {
    //Pull the deployed contract instance
    // const imageFetch = async (tokenId) => {
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   const signer = provider.getSigner();
    //   let contract = new ethers.Contract(contractAddress, contractABI, signer);
    //   const tokenURI = await contract.tokenURI(tokenId);
    //   fetch(tokenURI).then((res) => {
    //     res.json().then((res) => {
    //       setImage(res.image);
    //     });
    //   });
    // };
    // let tokenId = data.tokenId;
    // imageFetch(tokenId);
    const arr = [
      "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
      "https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
      "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-7.jpg",
      "https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg",
    ];
    let rand = Math.random() * arr.length;
    rand = Math.floor(rand);
    setImage(arr[rand]);
  }, []);

  return (
    <Card style={{ margin: 20 }} sx={{ maxWidth: 320, minWidth: 320 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={image}
      />
      <CardContent style={{ minHeight: "150px" }}>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <p style={{ margin: "3px", fontWeight: "bold" }}>{data.price} ETH</p>
        <Link
          style={{ marginLeft: "auto", color: "black", fontWeight: "bold" }}
          size="small"
          href="/folio/Know"
        >
          Know More
        </Link>
      </CardActions>
    </Card>
  );
}
