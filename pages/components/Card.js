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
      "https://cdn.discordapp.com/attachments/1010629869035589667/1119757169009623070/image.png",
      "https://cdn.discordapp.com/attachments/1010629869035589667/1119758973604745327/image.png",
      "https://cdn.discordapp.com/attachments/1010629869035589667/1119757996780699728/image.png",
      "https://cdn.discordapp.com/attachments/1010629869035589667/1119758500411736155/image.png",
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
