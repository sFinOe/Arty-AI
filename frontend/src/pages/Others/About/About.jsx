import React from "react";
import { Container } from "@mantine/core";
import { Grid, Spacer, Text } from "@nextui-org/react";
import Styles from "./style.module.css";
import Appconfig from "config/Appconfig";

function About() {
  return (
    <Grid>
      <Container size="xl">
        <Spacer y={5} />
        <Grid className={Styles.Card_layout}>
          <Grid>
            <h2>About Us!</h2>
            <h3>
              Welcome To <span id="W_Name1">{Appconfig.app_name}.com.au</span>
            </h3>
            <p>
              <span id="W_Name2">{Appconfig.app_name}.com.au</span> is a Professional <span id="W_Type1">eCommerce</span> Platform. Here we will
              provide you only interesting content, which you will like very much. We're dedicated to providing you the best of{" "}
              <span id="W_Type2">eCommerce</span>, with a focus on dependability and <span id="W_Spec">painting canvas store</span>. We're working to
              turn our passion for <span id="W_Type3">eCommerce</span> into a booming{" "}
              <a href="https://www.blogearns.com/2021/05/free-about-us-page-generator.html" rel="do-follow" data-darkreader-inline-color="">
                online website
              </a>
              . We hope you enjoy our <span id="W_Type4">eCommerce</span> as much as we enjoy offering them to you.
            </p>
            <p>I will keep posting more important posts on my Website for all of you. Please give your support and love.</p>
            <p>
              Thanks For Visiting Our Site
              <br />
              <br />
              <span>Have a nice day!</span>
            </p>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

export default About;
