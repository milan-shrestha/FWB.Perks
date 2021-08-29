import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { ethers } from "ethers";
import AirtableEmbed from "./airtableembed";
import { Link } from 'react-router-dom';

const ConnectWallet = () => {

    async function initWallet() {
        if (!window.ethereum) {
            console.log("Install metamask pls");
          }
          const abi = [
              // Read-Only Functions
              "function balanceOf(address owner) view returns (uint256)",
              "function decimals() view returns (uint8)",
              "function symbol() view returns (string)",
          ];
          
          const [viewerAddress] = await window.ethereum.enable();
          let provider = new ethers.providers.Web3Provider(window.ethereum, "any")
          const FWBTokenAddress = "0x35bD01FC9d6D5D81CA9E055Db88Dc49aa2c699A8"
          
          const FWBContract = new ethers.Contract(FWBTokenAddress, abi, provider);
          const viewerBalanceWei = await FWBContract.balanceOf(viewerAddress);

          if (viewerBalanceWei > 0) {
              console.log("they've got it");

          }
          console.log(ethers.utils.formatEther(viewerBalanceWei)); // is it greater than 75??
    }
    
    
    
    return (
        <Container fluid>
            <Link to='/memberperks'>
                <Button variant="warning"
                    onClick={initWallet}>
                    Connect Wallet
                </Button>
            </Link>
        </Container>
    )
}
export default ConnectWallet