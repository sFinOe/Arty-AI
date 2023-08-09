import React, { useState, useEffect } from "react";
import { Grid, Spacer, Text, Image } from "@nextui-org/react";
import Styles from "./styles.module.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { PostArtWall } from "api/wizard_api";
import Slider from "react-slick";
import Skeleton from "@mui/material/Skeleton";
import { GrMapLocation } from "react-icons/gr";
import { Descriptions } from "@arco-design/web-react";
import { GetPrices } from "api/order";
import { Container } from "@mantine/core";
import pricesConfig from "config/prices";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function Wizard_products({ wizardProps }) {
  wizardProps.setContinueStatus(true);
  const [SelectedSize, setSelectedSize] = useState(4);
  const [PreviewImgs, setPreviewImgs] = useState([]);

  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetPrices();
        const { body } = res;
        console.log("body: ", body);
        setProducts(body);

        const index = Sizes.findIndex((item) => item.Size.includes(window.location.search.split("=")[1]));
        const selectedSize = index !== -1 ? index : SelectedSize;

        const data = {
          ImgUrl: wizardProps.SelectedImg,
          Width: Sizes[selectedSize]?.Width,
          Height: Sizes[selectedSize]?.Height,
        };

        const preDetailsData = {
          size: Sizes[selectedSize]?.Size,
          price: Sizes[selectedSize]?.Price,
          shipping: pricesConfig.expressShipping,
          itemReferenceId: Sizes[selectedSize]?.itemReferenceId,
          productUid: Sizes[selectedSize]?.productUid,
        };

        wizardProps.setPreDetailsData(preDetailsData);
        wizardProps.setContinueStatus(false);
        const postArtWallRes = await PostArtWall(data);
        const previewImgs = [wizardProps.SelectedImg, ...postArtWallRes.body];
        setPreviewImgs(previewImgs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const Sizes = [
    {
      Height: "50px",
      Width: "70px",
      Size: "13x18 cm / 5x7″",
      name: "product_13x18",
      Price: products?.product_13x18 || pricesConfig.product_13x18,
      itemReferenceId: "Item_13x18",
      productUid: "flat_130x180-mm-5r_200-gsm-80lb-uncoated_4-0_hor",
    },
    {
      Height: "60px",
      Width: "80px",
      Size: "15x20 cm / 6x8″",
      name: "product_15x20",
      Price: products?.product_15x20 || pricesConfig.product_15x20,
      itemReferenceId: "Item_15x20",
      productUid: "flat_150x200-mm-6x8-inch_200-gsm-80lb-uncoated_4-0_hor",
    },
    {
      Height: "100px",
      Width: "120px",
      Size: "20x25 cm / 8x10″",
      name: "product_20x25",
      Price: products?.product_20x25 || pricesConfig.product_20x25,
      itemReferenceId: "Item_20x25",
      productUid: "flat_200x250-mm-8x10-inch_200-gsm-80lb-uncoated_4-0_hor",
    },
    {
      Height: "90px",
      Width: "140px",
      Size: "A4 21x29.7 cm / 8x12″",
      name: "product_21x29",
      Price: products?.product_21x29 || pricesConfig.product_21x29,
      itemReferenceId: "Item_21x29",
      productUid: "flat_a4-8x12-inch_200-gsm-80lb-uncoated_4-0_hor",
    },
    {
      Height: "100px",
      Width: "100px",
      Size: "25x25 cm / 10x10″",
      name: "product_25x25",
      Price: products?.product_25x25 || pricesConfig.product_25x25,
      itemReferenceId: "Item_25x25",
      productUid: "flat_250x250-mm-10x10-inch_200-gsm-80lb-uncoated_4-0_hor",
    },
    {
      Height: "100px",
      Width: "120x",
      Size: "27x35 cm / 11x14″",
      name: "product_27x35",
      Price: products?.product_27x35 || pricesConfig.product_27x35,
      itemReferenceId: "Item_27x35",
      productUid: "flat_270x350-mm-11x14-inch_200-gsm-80lb-uncoated_4-0_hor",
    },
    {
      Height: "150px",
      Width: "150px",
      Size: "30x30 cm / 12x12″",
      name: "product_30x30",
      Price: products?.product_30x30 || pricesConfig.product_30x30,
      itemReferenceId: "Item_30x30",
      productUid: "flat_300x300-mm-12x12-inch_200-gsm-80lb-uncoated_4-0_hor",
    },
    {
      Height: "160px",
      Width: "200px",
      Size: "40x50 cm / 16x20″",
      name: "product_40x50",
      Price: products?.product_40x50 || pricesConfig.product_40x50,
      itemReferenceId: "Item_40x50",
      productUid: "flat_400x500-mm-16x20-inch_200-gsm-80lb-uncoated_4-0_hor",
    },

    {
      Height: "140px",
      Width: "180px",
      Size: "60x90 cm / 24x36″",
      name: "product_60x90",
      Price: products?.product_60x90 || pricesConfig.product_60x90,
      itemReferenceId: "Item_60x90",
      productUid: "flat_600x900-mm-24x36-inch_200-gsm-80lb-uncoated_4-0_hor",
    },
    {
      Height: "190.7px",
      Width: "220px",
      Size: "A3 (29.7x42 cm)",
      name: "product_29x42",
      Price: products?.product_29x42 || pricesConfig.product_29x42,
      itemReferenceId: "Item_29x42",
      productUid: "flat_a3_200-gsm-80lb-uncoated_4-0_hor",
    },
    {
      Height: "160px",
      Width: "250.4px",
      Size: "A2 (42x59.4 cm)",
      name: "product_42x59",
      Price: products?.product_42x59 || pricesConfig.product_42x59,
      itemReferenceId: "Item_42x59",
      productUid: "flat_a2_200-gsm-80lb-uncoated_4-0_hor",
    },
    {
      Height: "200.4px",
      Width: "300.1px",
      Size: "A1 (59.4x84.1 cm)",
      name: "product_59x84",
      Price: products?.product_59x84 || pricesConfig.product_59x84,
      itemReferenceId: "Item_59x84",
      productUid: "flat_a1_200-gsm-80lb-uncoated_4-0_hor",
    },
  ];

  const HandleSelecteSize = (item, index) => {
    setSelectedSize(index);
    setPreviewImgs([]);
    wizardProps.setPreDetailsData({
      size: item.Size,
      price: item.Price,
      shipping: pricesConfig.expressShipping,
      itemReferenceId: item.itemReferenceId,
      productUid: item.productUid,
    });
    const data = {
      ImgUrl: wizardProps.SelectedImg,
      Width: item.Width,
      Height: item.Height,
    };
    PostArtWall(data)
      .then((res) => {
        setPreviewImgs([wizardProps.SelectedImg, ...res.body]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const data = [
    {
      label: "Price",
      value: `$${Sizes[SelectedSize]?.Price}`,
    },
    {
      label: "Standard Shipping",
      value: "Free (5-7 days)",
    },
    {
      label: "Express Shipping",
      value: `$${pricesConfig.expressShipping} (2-3 days)`,
    },
  ];

  return (
    <Grid>
      <Container size="xl">
        <Spacer y={2} />
        <Grid>
          <Text css={{ fontSize: "1.6rem", fontFamily: "poppins", fontWeight: "500" }}>Select your filter</Text>
        </Grid>
        <Spacer y={1} />
        <Grid className={Styles.bg_css}>
          <Grid className={Styles.layout_css}>
            <Grid>
              <Grid className={Styles.Swiper_container}>
                {PreviewImgs.length > 0 ? (
                  <Slider {...settings}>
                    {PreviewImgs?.map((image, index) => (
                      <Grid>
                        <Image src={image} alt="image" width={450} height={450} className={index === 0 ? Styles.img_card : ""} />
                      </Grid>
                    ))}
                  </Slider>
                ) : (
                  <Slider {...settings}>
                    {[1, 2, 3, 4].map((index) => (
                      <Skeleton variant="rounded" width={400} height={450} key={index} />
                    ))}
                  </Slider>
                )}
              </Grid>
            </Grid>
            <Spacer x={2} />
            <Grid css={{ width: "60%" }}>
              <Grid>
                <Text css={{ fontSize: "1.3rem", fontFamily: "poppins", fontWeight: "400" }}>Premium Matte Paper Poster</Text>
              </Grid>
              <Spacer y={0.3} />
              <div style={{ width: "100%", border: "1px solid #E7E9EB" }} />
              <Spacer y={1} />
              <Grid css={{ display: "flex", flexDirection: "row" }}>
                <GrMapLocation size={20} color="#000" />
                <Spacer x={0.5} />
                <Text css={{ fontSize: "1rem", fontFamily: "poppins", fontWeight: "400" }}>Fulfilled in 32 countries</Text>
              </Grid>
              <Spacer y={1} />
              <div style={{ width: "100%", border: "1px solid #E7E9EB" }} />
              <Spacer y={2} />
              <Grid>
                <Text css={{ fontSize: "0.9rem", fontFamily: "poppins", fontWeight: "400" }}>Sizes</Text>
              </Grid>
              <Spacer y={0.6} />
              <Grid>
                <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
                  {Sizes.map((item, index) => (
                    <Button
                      key={index}
                      variant={SelectedSize === index ? "contained" : "outlined"}
                      onClick={() => {
                        HandleSelecteSize(item, index);
                      }}
                    >
                      {item.Size}
                    </Button>
                  ))}
                </Stack>
              </Grid>
              <Spacer y={2} />
              <Grid>
                <Descriptions border colon=" :" title="Cost" data={data} layout="inline-vertical" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

export default Wizard_products;
