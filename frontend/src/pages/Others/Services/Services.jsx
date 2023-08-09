import React from "react";
import { Text, Image, Grid, Container, Spacer } from "@nextui-org/react";
import "@fontsource/poppins";
import Appconfig from "config/Appconfig";

function Services() {
  return (
    <Container lg>
      <Spacer y={2} />
      <Grid
        css={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#fff",
          alignItems: "center",
          padding: "30px 0px 30px 0px",
          borderRadius: "10px",
        }}
      >
        <Grid css={{ padding: "90px 0px 90px 90px" }}>
          <Text
            h1
            size={72}
            css={{ textGradient: "120deg, #7828C8 -20%, #0072F5 80%", fontFamily: "poppins", width: "600px", fontWeight: "500", lineHeight: "1.2" }}
          >
            A word about our services
          </Text>
          <Spacer y={1} />
          <Text size={18} css={{ fontFamily: "poppins", width: "600px" }}>
            We use the latest AI-driven technologies to transform your photos into beautiful painted art. Our canvas sheets are made of plain-woven
            fabric, primarily cotton but also occasionally linen, and we offer a selection of wooden frames to choose from if you'd like. Your
            finished piece will be shipped directly to your home.
          </Text>
        </Grid>
        <Grid>
          <Image src="/images/canvas_preview.jpg" css={{ width: "600px", height: "500px" }} />
        </Grid>
      </Grid>
      <Spacer y={2} />
      <Grid
        css={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#fff",
          alignItems: "center",
          padding: "0px 0px 0px 0px",
          borderRadius: "10px",
        }}
      >
        <Grid css={{ marginLeft: "60px" }}>
          <Image src="/images/wodeen_frame.jpg" css={{ width: "500px", height: "500px" }} />
        </Grid>
        <Grid>
          <Text
            h1
            size={55}
            css={{ textGradient: "120deg, #7828C8 -20%, #0072F5 80%", fontFamily: "poppins", width: "600px", fontWeight: "500", lineHeight: "1.2" }}
          >
            Materials we use everyday
          </Text>
          <Spacer y={1} />
          <Text size={17} css={{ fontFamily: "poppins", width: "580px" }}>
            We use the best materials for our paper sheets and wooden frames to create a high-quality, hand-crafted wooden canvas. Our canvases come
            in different colors, ranging from dark wood to white wood, all designed to provide our customers with the best quality and service.
          </Text>
        </Grid>
      </Grid>
      <Spacer y={2} />
      <Grid
        css={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#262739",
          alignItems: "center",
          padding: "50px 50px 50px 50px",
          borderRadius: "10px",
        }}
      >
        <Grid>
          <Image src="/images/map.png" width={600} height={600} />
        </Grid>
        <Grid css={{ padding: "90px 0px 90px 90px" }}>
          <Text h1 size={55} css={{ color: "#fff", fontFamily: "poppins", width: "600px", fontWeight: "500", lineHeight: "1.2" }}>
            Where we are located
          </Text>
          <Spacer y={1} />
          <Text size={16} css={{ color: "#fff", fontFamily: "poppins", width: "580px" }}>
            Gelato enables global sales through local production, offering a streamlined, borderless, and programmable process for custom product
            creation. Our personnel operate from numerous international offices and are responsible for processing millions of print orders annually,
            catering to a diverse clientele that includes creators, startups, and large enterprises.
          </Text>
        </Grid>
      </Grid>
      <Spacer y={2} />
      <Grid
        css={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#fff",
          alignItems: "center",
          padding: "50px 50px 50px 50px",
          borderRadius: "10px",
        }}
      >
        <Grid css={{ padding: "90px 0px 90px 90px" }}>
          <Text h1 size={55} css={{ fontFamily: "poppins", width: "600px", fontWeight: "500", lineHeight: "1.2" }}>
            Our team
          </Text>
          <Spacer y={1} />
          <Text size={16} css={{ fontFamily: "poppins", width: "580px" }}>
            Our team at {Appconfig.app_name} is committed to providing comprehensive assistance and support to address any issues you may encounter.
            Whether you require guidance or advice, we are always available to help you with whatever you need. Simply get in touch with us, and we
            will be delighted to provide you with the necessary guidance and support to resolve any issues and ensure your success. Let us be your
            partner on your journey to achieving your goals.
          </Text>
        </Grid>
        <Grid>
          <Image src="/images/team.png" width={600} height={600} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Services;
