import React, { useEffect, useState } from "react";
import { Text, Image, Grid, Container, Spacer } from "@nextui-org/react";
import Styles from "./styles.module.css";
import "@fontsource/catamaran/800.css";
import "@fontsource/poppins";
import { FaMagic, FaShippingFast } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { BsChatLeftText, BsStars } from "react-icons/bs";
import { RiRefund2Line } from "react-icons/ri";
import { Navigate } from "react-router-dom";
import { Button } from "@mantine/core";

const LandingPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const token = localStorage.getItem("jwtToken");
  if (token) {
    return <Navigate to="/home/dashboard" />;
  }

  return (
    <div className={Styles.Homebody}>
      <Container lg>
        <Grid className={Styles.Container}>
          <Spacer y={2} />
          <Grid className={Styles.Preview}>
            <Grid className={Styles.Text_preview}>
              <Text h1 className={Styles.text_test} css={{ textGradient: "120deg, #7828C8 -20%, #0072F5 80%" }} weight="bold">
                CREATE & SHIP YOUR PHOTO WHENEVER YOU WANT
              </Text>
              <Spacer y={1} />
              <div className={Styles.Header_feature}>
                <Text h2 size={22} css={{ fontFamily: "poppins", fontWeight: 700, color: "#7828C8" }}>
                  Production in 32 countries
                </Text>
              </div>
              <Text className={Styles.Header_exp_text}>Turn your photo into wall art with the world's largest production on demand network.</Text>
              <Spacer y={1.5} />
              <a href="/wizard/upload">
                <Button radius="md" size="xl" color="violet" rightIcon={<FaMagic />}>
                  Shop Canvas
                </Button>
              </a>
            </Grid>
            <Grid className={Styles.Header_image}>
              <Image src="/images/intro_2.png" />
            </Grid>
          </Grid>
          <Spacer y={3} />
          <Grid className={Styles.Text_container}>
            <Text p className={Styles.Text_wedo}>
              We initially transformed ordinary photos into art and this remains its primary function. However, the app now employs cutting-edge AI
              technologies and talented designers to elevate this process further, transforming photos into stunning canvases that can be shipped
              directly to you.
            </Text>
          </Grid>
          <Spacer y={3} />
          <Grid className={Styles.Canvas_preview}>
            <Grid className={Styles.Container_canvas}>
              <Grid>
                <Text p css={{ fontSize: "2.188rem", fontFamily: "poppins", color: "#7828C8", width: "15vw" }}>
                  Personalized Canvas Décor
                </Text>
              </Grid>
              <Grid className={Styles.Canvas_container}>
                <Grid css={{ textAlign: "center" }}>
                  <div style={{ border: "2px solid #7828C8", width: "1.375rem", height: "1.875rem", color: "#000", display: "inline-block" }} />
                  <Text css={{ fontSize: "1.25rem", fontFamily: "poppins" }}>8 X 10</Text>
                </Grid>
                <Grid css={{ textAlign: "center" }}>
                  <div style={{ border: "2px solid #7828C8", width: "1.875rem", height: "2.375rem", color: "#000", display: "inline-block" }} />
                  <Text css={{ fontSize: "1.25rem", fontFamily: "poppins" }}>11 X 14</Text>
                </Grid>
                <Grid css={{ textAlign: "center" }}>
                  <div style={{ border: "2px solid #7828C8", width: "2.75rem", height: "3.438rem", color: "#000", display: "inline-block" }} />
                  <Text css={{ fontSize: "1.25rem", fontFamily: "poppins" }}>16 X 20</Text>
                </Grid>
                <Grid css={{ textAlign: "center" }}>
                  <div style={{ border: "2px solid #7828C8", width: "3.438rem", height: "4.125rem", color: "#000", display: "inline-block" }} />
                  <Text css={{ fontSize: "1.25rem", fontFamily: "poppins" }}>20 X 24</Text>
                </Grid>
                <Grid css={{ textAlign: "center" }}>
                  <div style={{ border: "2px solid #7828C8", width: "4.125rem", height: "6.25rem", color: "#000", display: "inline-block" }} />
                  <Text css={{ fontSize: "1.25rem", fontFamily: "poppins" }}>24 X 36</Text>
                </Grid>
                <Grid css={{ textAlign: "center" }}>
                  <Image src="/images/arrow.png" css={{ width: 45, height: 45, marginBottom: 10 }} />
                  <Text css={{ fontSize: "1.25rem", fontFamily: "poppins", color: "#7828C8", width: 50, lineHeight: 1.4 }}>More Sizes</Text>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Spacer y={3} />
          <Grid>
            <Text h2 css={{ fontSize: "2.5rem", fontFamily: "poppins", textGradient: "180deg, #7828C8 -40%, #0072F5 60%" }}>
              Explore Our Collections
            </Text>
          </Grid>
          <Spacer y={1} />
          <Spacer y="1" />
          <Grid className={Styles.Explore_canvas}>
            <Grid css={{ width: !isMobile ? "50%" : "90%" }}>
              <Text h2 css={{ fontSize: "2.5rem", fontFamily: "poppins", textGradient: "180deg, #7828C8 -40%, #0072F5 60%" }}>
                Beautiful Canvas
              </Text>
              <Spacer y="1" />
              <Grid>
                <Text p css={Styles.txt_css1}>
                  Turning your photo into a print canvas is a great way to transform a treasured memory or favorite snapshot into a stunning piece of
                  art. By printing your photo onto canvas, you can create a unique and personalized decoration for your home or office.
                </Text>
              </Grid>
            </Grid>
            <Image src="/images/export_1.png" width={600} height={600} />
          </Grid>
          <Spacer y="3" />
          <Grid className={Styles.Explore_canvas}>
            <Image src="/images/export_2.jpeg" width={600} height={600} />
            <Grid css={{ width: !isMobile ? "50%" : "90%" }}>
              <Text h2 css={{ fontSize: "2.5rem", fontFamily: "poppins", textGradient: "180deg, #7828C8 -40%, #0072F5 60%" }}>
                Stunning quality Canvas
              </Text>
              <Spacer y="1" />
              <Grid className={Styles.export_list}>
                <ul style={{ listStyleType: "disc" }}>
                  <li>
                    <Text p css={{ fontSize: "1.125rem", fontFamily: "poppins", color: "#595858" }}>
                      Turn your art into a beautiful canvas. The canvas texture intensifies the image's natural look and feel.
                    </Text>
                  </li>
                  <li>
                    <Text p css={{ fontSize: "1.125rem", fontFamily: "poppins", color: "#595858" }}>
                      Thin canvas has a 2-3 cm (0.8-1.2") thick frame.
                    </Text>
                  </li>
                  <li>
                    <Text p css={{ fontSize: "1.125rem", fontFamily: "poppins", color: "#595858" }}>
                      Thick canvas has a 4 cm (1.6") thick frame.
                    </Text>
                  </li>
                  <li>
                    <Text p css={{ fontSize: "1.125rem", fontFamily: "poppins", color: "#595858" }}>
                      Shipped in protective packaging and strong boxes to ensure no damage during transportation.
                    </Text>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Grid>
          <Spacer y="6" />
          <Grid.Container gap={4} className={Styles.List_features}>
            <Grid sm={4} css={{ flexDirection: "column" }}>
              <CiLocationOn size="3.75rem" color="#7828C8" />
              <Text h2 css={{ fontSize: "1.25rem", fontFamily: "poppins", color: "#7828C8" }}>
                Production in 32 countries
              </Text>
              <Text p css={{ fontSize: "1rem", fontFamily: "poppins", color: "#595858" }}>
                We have production facilities in 32 countries, which allows us to offer the best prices and the fastest delivery times.
              </Text>
            </Grid>
            <Grid sm={4} css={{ flexDirection: "column" }}>
              <RxDashboard size="3.75rem" color="#7828C8" />
              <Text h2 css={{ fontSize: "1.25rem", fontFamily: "poppins", color: "#7828C8" }}>
                Easy to use
              </Text>
              <Text p css={{ fontSize: "1rem", fontFamily: "poppins", color: "#595858" }}>
                simply upload your photo, choose your preferred filter to enhance it, select your desired canvas, and we'll handle the shipping for
                you.
              </Text>
            </Grid>
            <Grid sm={4} css={{ flexDirection: "column" }}>
              <FaShippingFast size="3.75rem" color="#7828C8" />
              <Text h2 css={{ fontSize: "1.25rem", fontFamily: "poppins", color: "#7828C8" }}>
                Fast Shipping Options
              </Text>
              <Text p css={{ fontSize: "1rem", fontFamily: "poppins", color: "#595858" }}>
                We have Fast Shipping Options for our valued customers who are looking for quick and efficient delivery of their online purchases.
              </Text>
            </Grid>
            <Grid sm={4} css={{ flexDirection: "column" }}>
              <BsStars size="3.75rem" color="#7828C8" />
              <Text h2 css={{ fontSize: "1.25rem", fontFamily: "poppins", color: "#7828C8" }}>
                Superior quality
              </Text>
              <Text p css={{ fontSize: "1rem", fontFamily: "poppins", color: "#595858" }}>
                Make a lasting impression on your customers with cutting-edge technology and sustainably sourced-materials from industry-leading
                brands.
              </Text>
            </Grid>
            <Grid sm={4} css={{ flexDirection: "column" }}>
              <RiRefund2Line size="3.75rem" color="#7828C8" />
              <Text h2 css={{ fontSize: "1.25rem", fontFamily: "poppins", color: "#7828C8" }}>
                Easy Returns & Exchanges
              </Text>
              <Text p css={{ fontSize: "1rem", fontFamily: "poppins", color: "#595858" }}>
                Our Easy Returns & Exchanges policy allows our customers to return or exchange their purchases within 30 days of receipt.
              </Text>
            </Grid>
            <Grid sm={4} css={{ flexDirection: "column" }}>
              <BsChatLeftText size="3.125rem" color="#7828C8" />
              <Text h2 css={{ fontSize: "1.25rem", fontFamily: "poppins", color: "#7828C8" }}>
                24/7 customer support
              </Text>
              <Text p css={{ fontSize: "1rem", fontFamily: "poppins", color: "#595858" }}>
                We work relentlessly to help you and get the most out of the platform. Reach our customer success team anywhere, anytime.
              </Text>
            </Grid>
          </Grid.Container>
          <Spacer y="6" />
          <Grid className={Styles.Explore_canvas}>
            <Grid css={{ width: !isMobile ? "50%" : "90%" }}>
              <Text h2 css={{ fontSize: "2.5rem", fontFamily: "poppins", textGradient: "180deg, #7828C8 -40%, #0072F5 60%" }}>
                So many sizes
              </Text>
              <Spacer y="1" />
              <Grid>
                <Text p css={{ fontSize: "1.125rem", fontFamily: "poppins", color: "#595858" }}>
                  Our canvas is available in over 30 distinct sizes, catering to both the North American market, in inches, and the rest of the world,
                  in centimeters. This allows you to sell your products globally, as they will be automatically converted between the two units based
                  on the shipping country. To provide a range of options for your customers, we suggest starting with 30x40cm/12x16in,
                  50x70cm/20x28in, and 70x100cm/28x40in, which offer small, medium, and large sizes respectively.
                </Text>
              </Grid>
            </Grid>
            <Image src="/images/export_3.jpeg" width={600} height={600} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LandingPage;
