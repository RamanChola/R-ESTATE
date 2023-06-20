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
                  <MDBTypography tag="h1">Ashish Negi</MDBTypography>
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
                      src="data:image/jpeg;base64,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"
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
                            I am Web Development
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
      <div style={{ display: "flex", justifyContent: "center", margin:"40px 0" }}>
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
