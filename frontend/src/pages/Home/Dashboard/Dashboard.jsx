import React from "react";
import { Button, Text, Image, Grid, Spacer } from "@nextui-org/react";
import "./module.style.css";
import "@fontsource/poppins";
import { MdOpenInNew } from "react-icons/md";
import { BadgeCard } from "components/Cards/Mantine_card";
import { Likes_cards } from "components/Cards/Likes_cards";
import { Orders_card } from "components/Cards/Orders_card";
import { Container } from "@mantine/core";

function Dashboard() {
  const RecoData = [
    {
      image: "/images/721e5b85-0961-40x60.jpeg",
      title: "Premium Matte",
      country: "Poster",
      description: [
        "The 200 gsm/ 80 lb paper weight makes it durable and long-lasting.",
        "Each poster is shipped in robust packaging, ensuring it arrives safe and secure.",
        "It is printed and shipped on demand. No minimums are required.",
      ],
      size: "40x50 cm / 16x20″",
      query: "40x50",
    },
    {
      image: "/images/877c3f49-508d-60x90.jpeg",
      title: "Premium Matte",
      country: "Poster",
      description: [
        "The 200 gsm/ 80 lb paper weight makes it durable and long-lasting.",
        "Each poster is shipped in robust packaging, ensuring it arrives safe and secure.",
        "It is printed and shipped on demand. No minimums are required.",
      ],
      size: "60x90 cm / 24x36″",
      query: "60x90",
    },
    {
      image: "/images/7cb73fa8-db39-4811-29x42.jpeg",
      title: "Premium Matte",
      country: "Poster",
      description: [
        "The 200 gsm/ 80 lb paper weight makes it durable and long-lasting.",
        "Each poster is shipped in robust packaging, ensuring it arrives safe and secure.",
        "It is printed and shipped on demand. No minimums are required.",
      ],
      size: "A3 (29.7 x 42 cm)",
      query: "29x42",
    },
    {
      image: "/images/9205b1bc-7269-4387-30x30.jpeg",
      title: "Premium Matte",
      country: "Poster",
      description: [
        "The 200 gsm/ 80 lb paper weight makes it durable and long-lasting.",
        "Each poster is shipped in robust packaging, ensuring it arrives safe and secure.",
        "It is printed and shipped on demand. No minimums are required.",
      ],
      size: "30x30 cm / 12x12″",
      query: "30x30",
    },
    {
      image: "/images/1f5862b2-24ed-4b8c-25x25.jpeg",
      title: "Premium Matte",
      country: "Poster",
      description: [
        "The 200 gsm/ 80 lb paper weight makes it durable and long-lasting.",
        "Each poster is shipped in robust packaging, ensuring it arrives safe and secure.",
        "It is printed and shipped on demand. No minimums are required.",
      ],
      size: "25x25 cm / 10x10″",
      query: "25x25",
    },
    {
      image: "/images/677cce8b-40a1-44a7-9071-20x25.jpeg",
      title: "Premium Matte",
      country: "Poster",
      description: [
        "The 200 gsm/ 80 lb paper weight makes it durable and long-lasting.",
        "Each poster is shipped in robust packaging, ensuring it arrives safe and secure.",
        "It is printed and shipped on demand. No minimums are required.",
      ],
      size: "20x25 cm / 8x10″",
      query: "20x25",
    },
  ];

  return (
    <Grid className="dash_container">
      <Spacer y={2.5} />
      <Container size="lg" className="cn_css1">
        <Text className="text" h2 css={{ fontSize: "1.7rem", fontFamily: "poppins", fontWeight: "500" }}>
          Welcome zaki kasmi
        </Text>
        <Spacer y={0.5} />
        <div style={{ width: "100%", border: "1px solid #E7E9EB" }} />
        <Spacer y={1} />
        <Grid className="dash_card">
          <Grid className="Img_css1">
            <Image src="/images/export_1.png" style={{ width: 400, height: 400, objectFit: "fill", borderRadius: "8px" }} />
          </Grid>
          <Spacer x={2} />
          <Grid className="button_css1">
            <Text h2 css={{ fontSize: "26px", fontFamily: "poppins", fontWeight: "500" }}>
              Feel the product yourself
            </Text>
            <Text h2 css={{ fontSize: "16px", fontFamily: "poppins", fontWeight: "400" }}>
              Experience the power of local production
            </Text>
            <Spacer y={1.5} />
            <a href="/wizard/upload">
              <Button auto color="success" css={{ fontSize: "17px" }}>
                Place an order now
              </Button>
            </a>
          </Grid>
        </Grid>
        <Spacer y={2} />
        <Grid className="dash_card_container">
          <Grid className="dash_card_orders">
            <Grid css={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
              <Text h2 css={{ fontSize: "20px", fontFamily: "poppins", fontWeight: "500", padding: "10px 0px 0px 20px" }}>
                Orders
              </Text>
              <a href="/home/orders">
                <Grid css={{ padding: "10px 20px 0px 0px", cursor: "pointer" }}>
                  <MdOpenInNew size="23px" />
                </Grid>
              </a>
            </Grid>
            <Orders_card />
          </Grid>
          <Spacer x={1} />
          <Grid className="dash_card_orders">
            <Grid css={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
              <Text h2 css={{ fontSize: "20px", fontFamily: "poppins", fontWeight: "500", padding: "10px 0px 0px 20px" }}>
                Likes
              </Text>
              <a href="/home/favorites">
                <Grid css={{ padding: "10px 20px 0px 0px", cursor: "pointer" }}>
                  <MdOpenInNew size="23px" />
                </Grid>
              </a>
            </Grid>
            <Likes_cards />
          </Grid>
        </Grid>
        <Spacer y={2} />
        <Grid className="dash_card_orders">
          <Grid css={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
            <Text h2 css={{ fontSize: "20px", fontFamily: "poppins", fontWeight: "500", padding: "10px 0px 0px 20px" }}>
              Recommendations for you
            </Text>
          </Grid>
          <hr />
          <Grid.Container gap={2.5} justify="flex-start" css={{ padding: "40px 30px 40px 30px" }}>
            {RecoData.map((item, index) => (
              <Grid sm={4} key={index}>
                <BadgeCard image={item.image} title={item.title} description={item.description} size={item.size} query={item.query} />
              </Grid>
            ))}
          </Grid.Container>
        </Grid>
        <Spacer y={4} />
      </Container>
    </Grid>
  );
}

export default Dashboard;
