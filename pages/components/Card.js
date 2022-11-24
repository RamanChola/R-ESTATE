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

export default function ImgMediaCard({ data }) {
  const [image, setImage] = React.useState("");
  React.useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    //Pull the deployed contract instance
    const imageFetch = async (tokenId) => {
      let contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tokenURI = await contract.tokenURI(tokenId);
      let meta = await axios.get(tokenURI);
      meta = meta.data;
      setImage(meta);
    };
    let tokenId = data.tokenId;
    imageFetch(tokenId);
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
        <p style={{ margin: "3px", fontWeight: "bold" }}>{data.price}</p>
        <Link
          props={data.tokenId}
          style={{ marginLeft: "auto", color: "black", fontWeight: "bold" }}
          size="small"
          href="/folio/Know"
        >
          Know more
        </Link>
      </CardActions>
    </Card>
  );
}
