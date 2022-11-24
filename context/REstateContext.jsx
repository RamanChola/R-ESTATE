import { useEffect, useState } from "react";
import { ethers } from "ethers";
import React from "react";

import { contractABI, contactAddress } from "../utils/constants";

export const REstateContext = React.createContext();

const { ethereum } = window;

const networks = {
  polygon: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Polygon Mumbai Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
};

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const RestateContract = new ethers.Contract(
    contactAddress,
    contractABI,
    signer
  );

  return RestateContract;
};

export const RestateProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [propertys, setPropertys] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllPropertys = async () => {
    try {
      if (!ethereum) return alert("Please install a wallet");
      const RestateContract = getEthereumContract();

      const availablePropertys = await RestateContract.getAllPropertys();

      const structuredPropertys = availablePropertys.map((property) => ({
        owner: property.owner,
        seller: property.seller,
        currentlyListed: property.currentlyListed,
        tokenId: property.tokenId,
        name: property.name,
        price: parseInt(property.price._hex) / 10 ** 18,
      }));

      console.log(structuredPropertys);
      setPropertys(structuredPropertys);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install a wallet");
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllPropertys();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object.");
    }
  };

  const checkIfPropertysExist = async () => {
    try {
      const RestateContract = getEthereumContract();
      const transactionCount = await RestateContract.getTransactionCount();

      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install a wallet");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

      if (provider.network !== "matic") {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks["polygon"],
            },
          ],
        });
      }
      setCurrentAccount(accounts[0]);
      
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object.");
    }
  };

  const buyProperty = async () => {
    try {
      if (!ethereum) return alert("Please install a wallet");

      const { addressTo, amount, keyword, message } = formData;

      const RestateContract = getEthereumContract();

      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await RestateContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);

      await transactionHash.wait();

      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await RestateContract.getTransactionCount();

      setTransactionCount(transactionCount.toNumber());

      window.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfPropertysExist();
  }, []);

  return (
    <REstateContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        handleChange,
        buyProperty,
        propertys,
        isLoading,
      }}
    >
      {children}
    </REstateContext.Provider>
  );
};
