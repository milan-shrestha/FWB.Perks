import { useState, useEffect } from "react";
import { Button, Container, Jumbotron, Row, Col } from "react-bootstrap";
import { ethers } from "ethers";
import AirtableEmbed from "./airtableembed";
import { Link } from 'react-router-dom';

const ConnectWallet = () => {

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!window.ethereum) {
          return;
        }
        window.ethereum.on("accountsChanged", ([newAddress]) => {
            window.location.reload();
        })
      }, [])

    async function initWallet() {
        if (!window.ethereum) {
            console.log("Install metamask pls");
            setErrorMessage("Your browser doesn't have metamask")
            return;
          }
          const abi = [
              // Read-Only Functions
              "function balanceOf(address owner) view returns (uint256)",
              "function decimals() view returns (uint8)",
              "function symbol() view returns (string)",
          ];
          
          const [viewerAddress] = await window.ethereum.enable();
          console.log("viewer address is %s", viewerAddress);
          let provider = new ethers.providers.Web3Provider(window.ethereum, "any")
          const FWBTokenAddress = "0x35bD01FC9d6D5D81CA9E055Db88Dc49aa2c699A8"
          
          const FWBContract = new ethers.Contract(FWBTokenAddress, abi, provider);
          const viewerBalanceWei = await FWBContract.balanceOf(viewerAddress);

          if (viewerBalanceWei > 0) {
              window.location.href="airtableembed.html"
          } else {
              setErrorMessage("You need to hold $FWB tokens to get the benefits of tokenholders")
          }
          console.log(ethers.utils.formatEther(viewerBalanceWei)); // is it greater than 75??
    }
    
    
    
    return (
        <Container >
            <Jumbotron className='justify-content-center'>
                <Row>
                    <h1 className='display-1'>Connect to a wallet with $FWB to see exclusive perks</h1>
                </Row>
                <Row>
                    <h4 className='text-danger'>{errorMessage}</h4>
                </Row>
                <Row className='justify-content-center'>
                    <Col className='col-4 text-center'>
                        <Button variant="primary"
                            onClick={initWallet}>
                            Connect Wallet
                        </Button>
                    </Col>
                </Row>
            </Jumbotron>
        </Container>
    )
}
export default ConnectWallet

/**
 * <Link to='/memberperks'>
                <Button variant="warning"
                    onClick={initWallet}>
                    Connect Wallet
                </Button>
            </Link>
 */