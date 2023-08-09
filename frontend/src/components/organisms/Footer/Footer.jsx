import React from "react";
import { Container, Text, Link, Grid, Spacer, Image } from "@nextui-org/react";
import "@fontsource/catamaran/800.css";
import "@fontsource/poppins";
import "./module.style.css";
import { BsFillSuitHeartFill, BsLinkedin } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { SiPlanetscale } from "react-icons/si";

const ButtomNavigation = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    return null;
  }

  return (
    <Container lg>
      <Spacer y={3} />
      <hr />
      <Spacer y={1} />

      <Grid className="Footer_container">
        <Grid css={{ width: "30%", display: "flex", justifyContent: "center" }}>
          <Link color="primary" href="https://github.com/sfinoe" target="_blank">
            <AiFillGithub size="24px" style={{ marginRight: "20px" }} color="#11181C" />
          </Link>
          <Link color="primary" href="https://www.linkedin.com/in/sfinoe/" target="_blank">
            <BsLinkedin size="24px" style={{ marginRight: "20px" }} color="#11181C" />
          </Link>
          <Link color="primary" href="https://disposkill.com/about_me" target="_blank">
            <SiPlanetscale size="24px" color="#11181C" />
          </Link>
        </Grid>
        <Grid css={{ alignItems: "center", display: "flex", flexDirection: "column", width: "30%" }}>
          <Text h2 css={{ fontSize: "12px", fontFamily: "poppins", color: "#7F878D" }}>
            Created by <a>Zakaria Kasmi</a> & <a>Rida En Nassry</a>
          </Text>
          <Text h2 css={{ fontSize: "15px", fontFamily: "poppins", color: "#7F878D" }}>
            Made with <BsFillSuitHeartFill color="red" /> in My Home
          </Text>
        </Grid>
        <Grid css={{ width: "30%", display: "flex", justifyContent: "center" }}>
          <a style={{ marginRight: "20px" }} href="/about" target="_blank">
            About
          </a>
          <a href="/privacy_policy" target="_blank">
            Privacy Policy
          </a>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ButtomNavigation;
