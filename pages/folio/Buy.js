import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import dataSet from "../../data";
import Footer from "../components/Footer";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../../utils/constants.js";

const Buy = () => {
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
      price: parseInt(property.price._hex) / 10 ** 18,
    }));

    console.log(structuredPropertys);
    updateFetched(true);
    updateData(structuredPropertys);
  };
  if (!dataFetched) getAllPropertys();
//   async function getAllNFTs() {
//     const ethers = require("ethers");
//     //After adding your Hardhat network to your metamask, this code will get providers and signers
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     //Pull the deployed contract instance
//     let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
//     //create an NFT Token
//     let transaction = await contract.getAllNFTs()

//     //Fetch all the details of every NFT from the contract and display
//     const items = await Promise.all(transaction.map(async i => {
//         const tokenURI = await contract.tokenURI(i.tokenId);
//         let meta = await axios.get(tokenURI);
//         meta = meta.data;

//         let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
//         let item = {
//             price,
//             tokenId: i.tokenId.toNumber(),
//             seller: i.seller,
//             owner: i.owner,
//             image: meta.image,
//             name: meta.name,
//             description: meta.description,
//         }
//         return item;
//     }))

//     updateFetched(true);
//     updateData(items);
// }

// if(!dataFetched)
//     getAllNFTs();
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
        {data &&
          data.map((value, index) => {
            return <Card data={value} key={index} />;
          })}
      </Grid>
      <Footer />
    </>
  );
};

export default Buy;
