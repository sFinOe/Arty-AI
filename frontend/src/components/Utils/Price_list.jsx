import React from "react";
import { Button, Text, Grid, Container, Spacer } from "@nextui-org/react";
import Styles from "./styles.module.css";
import { SwiperImage } from "components/Utils";

export function Price_list({ item }) {
  return (
    <Container lg>
      <Grid className={Styles.Pirce_layout_css1}>
        <Grid css={{ width: "50%" }}>
          <SwiperImage Photos={item.images} />
        </Grid>
        <Grid css={{ width: "60%" }}>
          <Text h1 size={35} css={{ fontFamily: "poppins", width: "700px", fontWeight: "500", lineHeight: "1.2", textAlign: "left" }}>
            {item.title}
          </Text>
          <Text size={18} css={{ fontFamily: "poppins", textAlign: "left", fontWeight: "500", color: "#228BE6" }}>
            {item.price}
          </Text>
          <Spacer y={1} />
          <Grid css={{ width: "90%" }}>
            <Text size={18} css={{ fontFamily: "poppins", textAlign: "left" }}>
              {item.description}
            </Text>
            <Spacer y={1} />
            <Text size={18} css={{ fontFamily: "poppins", textAlign: "left" }}>
              {item.description2}
            </Text>
            <Spacer y={1} />
            <Text size={18} css={{ fontFamily: "poppins", textAlign: "left" }}>
              {item.description3}
            </Text>
          </Grid>
          <Spacer y={3} />
          <Grid>
            <Text size={18} css={{ fontFamily: "poppins", textAlign: "left", fontWeight: "600" }}>
              Key Features:
            </Text>
          </Grid>
          <Spacer y={1} />
          <Grid css={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "left", width: "92%" }}>
            <Grid>
              <ul className={Styles.ul_custom}>
                <li className={Styles.li_custom}>
                  <Text size={17} css={{ fontFamily: "poppins", textAlign: "left" }}>
                    {item.features1}
                  </Text>
                </li>
                <li className={Styles.li_custom}>
                  <Text size={17} css={{ fontFamily: "poppins", textAlign: "left" }}>
                    {item.features2}
                  </Text>
                </li>
              </ul>
            </Grid>
            <Grid>
              <ul>
                <li className={Styles.li_custom}>
                  <Text size={17} css={{ fontFamily: "poppins", textAlign: "left" }}>
                    {item.features3}
                  </Text>
                </li>
                <li className={Styles.li_custom}>
                  <Text size={17} css={{ fontFamily: "poppins", textAlign: "left" }}>
                    {item.features4}
                  </Text>
                </li>
              </ul>
            </Grid>
          </Grid>
          <Spacer y={1} />
          <Button
            auto
            css={{
              width: "180px",
              height: "40px",
              backgroundColor: "#228BE6",
              color: "#fff",
              fontFamily: "poppins",
              fontWeight: "600",
              fontSize: "17px",
              borderRadius: "5px",
            }}
          >
            Start Designing
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
