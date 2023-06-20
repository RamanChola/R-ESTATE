import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import dataSet from "../../data";
import Card from "../components/Card";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../../utils/constants.js";

const profile = () => {
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

  const getMyPropertys = async () => {
    if (!window.ethereum) return alert("Please install a wallet");
    const RestateContract = getEthereumContract();
    const availablePropertys = await RestateContract.getMyPropertys();
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
  if (!dataFetched) getMyPropertys();
  return (
    <>
      <Navbar />

      <section className="vh-150" style={{ backgroundColor: "#f4f5f7" }}>
        <MDBContainer className="py-5 h-50">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="8" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0" style={{ padding: "10px " }}>
                  <MDBTypography tag="h1">Aman</MDBTypography>
                  <MDBCardText>Profile</MDBCardText>
                  <MDBCol
                    md="4"
                    className="gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <MDBCardImage
                      src="data:image/png;base64,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"
                      alt="Avatar"
                      className="my-5 "
                      style={{ width: "200px", marginLeft: "30px" }}
                      fluid
                    />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">
                        DELHI <MDBIcon fas icon="map-marker-alt" />
                      </MDBTypography>

                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">
                            user@123.com
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">CONTACT ME</MDBTypography>
                          <MDBCardText className="text-muted">
                            123 456 789
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">ABOUT ME</MDBTypography>
                          <MDBCardText className="text-muted">
                            Lorem Ipsum
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">
                            Total Listed Records :
                          </MDBTypography>
                          <MDBCardText className="text-muted">
                            {dataSet.length}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "40px 0" }}
      >
        <h1>Your Records</h1>
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

export default profile;
