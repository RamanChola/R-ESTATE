import Navbar from "../components/Navbar";
import { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { NFTStorage, File } from "nft.storage";

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGI2NmUzNDU4Mzk2Rjk1ODNCODA5NjA0NzQ4NzczY2JGNjI4RjZGMjQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2OTI0NzkyMzcwNCwibmFtZSI6InItZXN0YXRlIn0.LNBMJEG7-3TcMHsEibZOoPGfjX5ESF8D2QBzEiAzmZw";
const client = new NFTStorage({ token: apiKey });
import { contractAddress, contractABI } from "../../utils/constants";

export default function SellNFT() {
  const router = useRouter();
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "0.01",
  });
  const [message, updateMessage] = useState("");

  async function onChange(e) {
    /* upload image to IPFS */
    // const file = e.target.files[0];
    // console.log(file);
    // alert(file);
    // setFileUrl(file);
  }
  async function uploadToIPFS(e) {
    e.preventDefault();
    const filePath = "https://cdn.discordapp.com/attachments/1010629869035589667/1119758973604745327/image.png";

    const response = await fetch(filePath);
    const blob = await response.blob();

    const file = new File([blob], "restatelatestImage.png");

    const { name, description, price } = formParams;
    if (!name || !description) {
      console.log("no name or description");
      return;
    }
    /* first, upload metadata to IPFS */

    try {
      updateMessage("Please wait.. uploading (upto 5 mins)");
      const metadata = await client.store({
        name,
        description,
        image: file,
      });
      console.log("here");
      console.log(metadata);
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        //massage the params to be sent to the create NFT request
        const price = ethers.utils.parseUnits(
          formParams.price.toString(),
          "ether"
        );
        let listingPrice = await contract.getListPrice();
        listingPrice = listingPrice.toString();

        //actually create the NFT
        console.log(listingPrice);
        let transaction = await contract.createToken(
          metadata.url,
          price,
          description,
          name,
          {
            value: listingPrice,
          }
        );
        await transaction.wait();

        alert("Successfully listed your NFT!");
        updateMessage("");
        updateFormParams({ name: "", description: "", price: "" });
      } catch (e) {
        console.log("Upload error: " + e);
      }
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  return (
    <div className="">
      <Navbar></Navbar>
      <div className="flex flex-col place-items-center mt-10" id="nftForm">
        <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
          <h3 className="text-center font-bold text-purple-500 mb-8">
            Upload the result
          </h3>
          <div className="mb-4">
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Test Id
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Axie#4563"
              onChange={(e) =>
                updateFormParams({ ...formParams, name: e.target.value })
              }
              value={formParams.name}
            ></input>
          </div>
          <div className="mb-6">
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Test Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              cols="40"
              rows="5"
              id="description"
              type="text"
              placeholder="Axie Infinity"
              value={formParams.description}
              onChange={(e) =>
                updateFormParams({ ...formParams, description: e.target.value })
              }
            ></textarea>
          </div>
          <div>
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="image"
            ></label>
            {/* <input type={"file"} onChange={onChange}></input> */}
          </div>
          <br></br>
          <div className="text-green text-center">{message}</div>
          <button
            onClick={uploadToIPFS}
            className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg"
          >
            List Result
          </button>
        </form>
      </div>
    </div>
  );
}
