import React from "react";
import { Text, Grid, Container, Spacer } from "@nextui-org/react";
import { Price_list } from "components/Utils";
import { FaqSimple } from "components/Utils";
import Appconfig from "config/Appconfig";

function Pracing() {
  const Price_list_data = [
    {
      id: 1,
      title: "Wrapped Canvas",
      price: "From USD 19.99",
      description:
        "The canvas gallery wraps in the fine print exhibit a pristine appearance due to their tightly drawn corners and sealed cardboard backing. The cotton canvas at the forefront boasts a naturally pure white matte finish.",
      description2:
        "The shape can be fully customized and is capable of holding a vertical, horizontal, or square canvas form. It is available in a variety of unique sizes, ranging from 7 inches by 5 inches to 36 inches by 36 inches.",
      description3:
        "This canvas gallery wrap comes with a sturdy support base and hanging hardware, making it easy to install. It's a sleek and contemporary option. You can opt for this affordable and high-quality indoor use canvas gallery wrap.",
      features1: "Available in up to 42 different sizes",
      features2: "100% cotton material for high image detail",
      features3: "Pre-installed hanging hardware",
      features4: "Taut and clean corners",
      images: [
        {
          id: 1,
          src: "/images/wraped_canvas_1.jpg",
        },
        {
          id: 2,
          src: "/images/Canvas-Gallery-Wraps-different-sizes.jpg",
        },
        {
          id: 3,
          src: "/images/Canvas_Print_4.png",
        },
        {
          id: 4,
          src: "/images/Canvas-Gallery-Wraps-detail.jpg",
        },
      ],
    },
    {
      id: 2,
      title: "Canvas Prints",
      price: "From USD 19.99",
      description:
        "The fine-print canvas gallery wraps sport a clean look with tightly pulled corners and a closed cardboard backing. The front canvas is 100% cotton and has a natural white matte finish.",
      description2:
        "The shape is fully customizable and can hold a vertical, horizontal, or square canvas form. It ranges in multiple unique sizes from 7″x5″ to 36″x36″.",
      description3:
        "Comes with a solid support base and hanging hardware for easy installation – a clean and modern choice. Choose canvas gallery wraps for quality indoor use at an affordable price.",
      features1: "Available in up to 42 different sizes",
      features2: "100% cotton material for high image detail",
      features3: "Pre-installed hanging hardware",
      features4: "Taut and clean corners",

      images: [
        {
          id: 1,
          src: "/images/Canvas-Gallery-Wraps-detail.jpg",
        },
        {
          id: 2,
          src: "/images/Canvas-Gallery-Wraps-different-sizes.jpg",
        },
        {
          id: 3,
          src: "/images/Canvas-Gallery-Wraps-Interior.jpg",
        },
        {
          id: 4,
          src: "/images/Canvas-Gallery-Wraps-with-Your-design.jpg",
        },
      ],
    },
    {
      id: 3,
      title: "Canvas Prints",
      price: "From USD 19.99",
      description:
        "The fine-print canvas gallery wraps sport a clean look with tightly pulled corners and a closed cardboard backing. The front canvas is 100% cotton and has a natural white matte finish.",
      description2:
        "The shape is fully customizable and can hold a vertical, horizontal, or square canvas form. It ranges in multiple unique sizes from 7″x5″ to 36″x36″.",
      description3:
        "Comes with a solid support base and hanging hardware for easy installation – a clean and modern choice. Choose canvas gallery wraps for quality indoor use at an affordable price.",
      features1: "Available in up to 42 different sizes",
      features2: "100% cotton material for high image detail",
      features3: "Pre-installed hanging hardware",
      features4: "Taut and clean corners",

      images: [
        {
          id: 1,
          src: "/images/Canvas-Gallery-Wraps-detail.jpg",
        },
        {
          id: 2,
          src: "/images/Canvas-Gallery-Wraps-different-sizes.jpg",
        },
        {
          id: 3,
          src: "/images/Canvas-Gallery-Wraps-Interior.jpg",
        },
        {
          id: 4,
          src: "/images/Canvas-Gallery-Wraps-with-Your-design.jpg",
        },
      ],
    },
  ];
  return (
    <Grid>
      <Grid css={{ backgroundColor: "#fff" }}>
        <Container lg>
          <Grid css={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <Spacer y={4} />
            <Text h1 size={45} css={{ fontFamily: "poppins", width: "40vw", fontWeight: "500", lineHeight: "1.2", textAlign: "center" }}>
              Explore Our Selection of Personalized Canvas Prints
            </Text>
            <Spacer y={2} />
            <Text size={18} css={{ fontFamily: "poppins", width: "50vw", textAlign: "center" }}>
              The {Appconfig.app_name} catalogue offers a diverse range of custom canvas blanks, featuring borderless designs that are professionally
              wrapped, framed, and stretched. You can choose from a wide selection of materials and sizes to suit the discerning tastes of artists and
              interior designers.
            </Text>
          </Grid>
          <Spacer y={4} />
          {Price_list_data.map((item, index) => (
            <Grid>
              <Price_list item={item} />
              <Spacer y={4} />
              {index !== Price_list_data.length - 1 ? <hr style={{ width: "95%" }} /> : null}
              {index !== Price_list_data.length - 1 ? <Spacer y={4} /> : <Spacer y={1} />}
            </Grid>
          ))}
        </Container>
      </Grid>
      <Grid css={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <Container sm>
          <Spacer y={4} />
          <Text h1 size={40} css={{ fontFamily: "poppins", fontWeight: "500", lineHeight: "1.2", textAlign: "center" }}>
            Frequently Asked Questions
          </Text>
          <Spacer y={2} />
          <FaqSimple />
        </Container>
      </Grid>
      <Spacer y={2} />
    </Grid>
  );
}

export default Pracing;
