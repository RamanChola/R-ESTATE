import React from "react";
import Card from "./Card";
import Grid from "@mui/material/Unstable_Grid2";
import dataSet from "../../data";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../../utils/constants";
import axios from "axios";

const Body = () => {
  const [data, updateData] = React.useState();
  const [dataFetched, updateFetched] = React.useState(false);
  const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const RestateContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    return RestateContract;
  };

  const getAllPropertys = async () => {
    if (!window.ethereum) return alert("Please install a wallet");
    const RestateContract = getEthereumContract();
    const availablePropertys = await RestateContract.getAllPropertys();
    console.log(availablePropertys + "available");
    const structuredPropertys = availablePropertys.map((property) => ({
      owner: property.owner,
      seller: property.seller,
      currentlyListed: property.currentlyListed,
      tokenId: property.tokenId,
      name: property.name,
      description: property.description,
      price: parseInt(property.price._hex) / 10 ** 18,
    }));

    console.log(structuredPropertys);
    updateFetched(true);
    updateData(structuredPropertys);
  };
  if (!dataFetched) getAllPropertys();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop:"30px"
        }}
      >
        <h1>Records </h1>
        <hr />
      </div>

      <Grid container style={{ display: "flex", justifyContent: "center" }}>
        {data &&
          data.map((value, index) => {
            return <Card data={value} key={index} />;
          })}
      </Grid>
    </>
  );
};

export default Body;
