import styled from "styled-components";
import { ethers } from "ethers";
import { useState } from "react";

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

const WalletConnect = ({setIsLogged}) => {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("");

    const connectWallet = async () => {
        if (!window.ethereum) return alert("Please install a wallet");
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
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
        const account = provider.getSigner();
        const Address = await account.getAddress();
        setAddress(Address);
        const Balance = ethers.utils.formatEther(await account.getBalance());
        setBalance(Balance);
        setIsLogged(true);
    };

    return (
            <div className="flex items-center justify-items-center bg-black p-1.5 rounded-xl text-sm scale-75 text-white border-2 cursor-pointer border-white hover:text-black hover:bg-white hover:border-black" onClick={connectWallet}>
                {balance == '' ? <></> : <Balance>{balance.slice(0, 4)} Matic</Balance>}
                {address == '' ? <Address>Connect Wallet</Address> : <Address>{address.slice(0, 6)}...{address.slice(39)}</Address>}
            </div>
    );
};

// const ConnectWalletWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   background-color: #ffffff;
//   padding: 2px;
//   height: 50%;
//   color: black;
//   border-radius: 10px;
//   margin-right: 5px;
//   font-family: 'Roboto';
//   font-weight: bold;
//   font-size: small;
//   cursor: pointer;
// `;

const Address = styled.h2`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px 0 5px;
    border-radius: 10px;
`

const Balance = styled.h2`
    background-color: grey;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    border-radius: 10px;
    padding: 2px;
`

export default WalletConnect;