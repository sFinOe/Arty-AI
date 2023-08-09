import React, { useEffect, useState } from "react";
import { Grid, Container, Spacer, Text, Image, Button, Loading } from "@nextui-org/react";
import "@fontsource/poppins";
import Styles from "./styles.module.css";
import Avatar from "@mui/material/Avatar";
import { AiFillHeart } from "react-icons/ai";
import { PostFilter } from "api/wizard_api";
import { PostAddLikes } from "api/user";
import Appconfig from "config/Appconfig";

function Wizard_filter({ wizardProps }) {
  const [active, setActive] = useState(0);
  const [SelectedImg, setSelectedImg] = useState(wizardProps.Datastep[0]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [Datastep, setDatastep] = useState([]);
  const [isGuest, setIsGuest] = useState(false);

  const HandleClick = (e) => {
    setActive(e);
    setSelectedImg(wizardProps.Datastep[e]);
  };

  const HandleRegenerate = () => {
    const data = {
      ImgPath: wizardProps.ImgPath,
      classes: Appconfig.classes,
    };
    setIsLoaded(true);
    PostFilter(data)
      .then((res) => {
        console.log(res);
        setIsLoaded(false);
        wizardProps.setDatastep(res.body.Urls);
        wizardProps.setImgPath(res.body.filePath);
        setSelectedImg(res.body.Urls[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      const guest_token = localStorage.getItem("GuestJwt");
      if (guest_token) setIsGuest(true);
    } else {
      setIsGuest(false);
    }
    if (wizardProps.Datastep) setDatastep(wizardProps.Datastep);
    wizardProps.setSelectedImg(SelectedImg);
  }, [SelectedImg, wizardProps.Datastep, wizardProps, isGuest]);

  const HandleLikes = () => {
    console.log("like");
    const data = {
      LikedImg: SelectedImg,
    };
    PostAddLikes(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid>
      <Container md>
        <Spacer y={2} />
        <Grid>
          <Text css={{ fontSize: "1.6rem", fontFamily: "poppins", fontWeight: "500" }}>Select your filter</Text>
        </Grid>
        <Spacer y={1} />
        <Grid className={Styles.bg_css}>
          <Grid className={Styles.layout_css}>
            <Grid className={Styles.img_card}>
              <Image
                src={SelectedImg}
                objectFit="cover"
                css={{ width: "528px", height: "528px", backgroundColor: "$accents3", borderRadius: "5px" }}
              />
              {isGuest === false && (
                <Grid css={{ position: "absolute", top: "13px", right: "13px" }} onClick={HandleLikes}>
                  <Avatar sx={{ bgcolor: "#6366F1", width: "3rem", height: "3rem" }} className={Styles.Avatar_css}>
                    <AiFillHeart size={25} />
                  </Avatar>
                </Grid>
              )}
            </Grid>
            <Grid css={{ position: "absolute", top: "10px", right: "10px" }}>
              <Button
                auto
                color="default"
                rounded
                flat
                onClick={HandleRegenerate}
                icon={isLoaded ? <Loading color="currentColor" size="sm" /> : ""}
                disabled={isLoaded ? true : false}
              >
                Re-Generate
              </Button>
            </Grid>
            <Spacer x={2} />
            <Grid.Container gap={1} className={Styles.Filter_card}>
              {Datastep.map((item, index) => (
                <Grid
                  sm={3}
                  key={index}
                  onClick={() => {
                    HandleClick(index);
                  }}
                >
                  <Image src={item} objectFit="cover" className={`${Styles.img_card_css} ${index === active ? Styles.active_select : ""}`} />
                </Grid>
              ))}
            </Grid.Container>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

export default Wizard_filter;
