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

const profile = () => {
  return (
    <>
      <Navbar />

      <section className="vh-150" style={{ backgroundColor: "#f4f5f7" }}>
        <MDBContainer className="py-5 h-50">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="8" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0" style={{padding:'10px '}}>
                  <MDBTypography tag="h1">Marie Horwitz</MDBTypography>
                  <MDBCardText>##property NO.</MDBCardText>
                  <MDBCol
                    md="4"
                    className="gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <MDBCardImage
                      src="https://cdn.myanimelist.net/images/characters/10/352557.jpg"
                      alt="Avatar"
                      className="my-5 "
                      style={{ width: "200px" ,marginLeft:'30px' }}
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
                            hbd j scsncjndmv jscdv sdvn.
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">
                            Total Listed items :
                          </MDBTypography>
                          <MDBCardText className="text-muted">
                            {dataSet.length}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <div className="d-flex justify-content-start">
                        <a href="#!">
                          <MDBIcon fab icon="facebook me-3" size="lg" />
                        </a>
                        <a href="#!">
                          <MDBIcon fab icon="twitter me-3" size="lg" />
                        </a>
                        <a href="#!">
                          <MDBIcon fab icon="instagram me-3" size="lg" />
                        </a>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <h1>Your Properties</h1>
      <hr />
      <Grid container style={{ display: "flex", justifyContent: "center" }}>
        {dataSet.map((data) => {
          return <Card props={{ data }} />;
        })}
      </Grid>
      <Footer />
    </>
  );
};

export default profile;
