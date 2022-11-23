import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBCardTitle,
  MDBRipple,
} from "mdb-react-ui-kit";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Know = () => {
  return (
    <>
      <Navbar />
      <section style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard>
                <MDBCardImage
                  src="https://mdbootstrap.com/img/new/standard/nature/184.webp"
                  position="top"
                  alt="..."
                />
                <MDBCardBody>
                  <MDBCardTitle>Card title</MDBCardTitle>
                  <MDBCardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                  <MDBListGroup flush className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fas icon="envelope-square" />
                      <MDBCardText>user@mail.com</MDBCardText>
                    </MDBListGroupItem>

                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fas icon="phone-alt" />
                      <MDBCardText>8448822057</MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fas icon="map-marker-alt" />
                      <MDBCardText>New Delhi,IND</MDBCardText>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBContainer fluid className="my-5">
                    <MDBRow className="justify-content-center">
                      <MDBCol md="8" lg="15" xl="30">
                        <MDBCard style={{ borderRadius: "15px" }}>
                          <MDBCardBody className="pb-0">
                            <div className="d-flex justify-content-between">
                              <div>
                                <p>
                                  <h3>
                                    <a href="#!" className="text-dark">
                                      Antilia
                                    </a>
                                  </h3>
                                </p>
                                <p className="small text-muted">Top Dealer</p>
                              </div>
                              <div>
                                <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                                  <MDBIcon fas icon="star" />
                                  <MDBIcon fas icon="star" />
                                  <MDBIcon fas icon="star" />
                                  <MDBIcon fas icon="star" />
                                </div>
                                <p className="small text-muted">Rated 4.0/5</p>
                              </div>
                            </div>
                          </MDBCardBody>
                          <hr class="my-0" />
                          <MDBCardBody className="pb-0">
                            <div className="d-flex justify-content-between">
                              <p>
                                <h3>5 ETH</h3>
                              </p>
                              <p className="text-dark">## TOKEN NO.</p>
                            </div>
                            <p className="small text-muted">SALE !!!</p>
                          </MDBCardBody>
                          <hr class="my-0" />
                          <MDBCardBody className="pb-0">
                            <div className="d-flex justify-content-between align-items-center pb-2 mb-4">
                              <a href="/" className="text-dark fw-bold">
                                Cancel
                              </a>
                              <MDBBtn color="primary">Buy now</MDBBtn>
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <Footer />
    </>
  );
};

export default Know;
