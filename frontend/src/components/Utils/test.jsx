import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Link, Text, Image, Grid, Container, Spacer } from "@nextui-org/react";
import Styles from "./styles.module.css";

export function SwiperImage({ Photos }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Grid className={Styles.Swiper_container}>
      <Slider {...settings}>
        {Photos?.map((image, index) => (
          <Grid key={index}>
            <Image src={image.src} alt="image" width={400} height={400} />
          </Grid>
        ))}
      </Slider>
    </Grid>
  );
}
