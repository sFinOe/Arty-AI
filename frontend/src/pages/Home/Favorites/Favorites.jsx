import React, { useEffect, useState } from "react";
import { Text, Image, Grid, Spacer } from "@nextui-org/react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { GetLikes } from "api/user";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Styles from "./style.module.css";
import Button from "@mui/material/Button";
import { Container } from "@mantine/core";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function Favorites() {
  const [likes, setLikes] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [SelectedImage, setSelectedImage] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);

  const handleOpen = (index) => {
    setSelectedImage(index);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const HandleDownload = async () => {
    // Download Image from id

    const img = document.getElementById(SelectedImage);
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    GetLikes()
      .then((res) => {
        console.log(res.body);
        if (res.body.length === 1)
          setLikes(["skeleton", "skeleton", "skeleton", "skeleton", "skeleton", "skeleton", "skeleton", "skeleton", "skeleton"]);
        else setLikes(res.body.slice(1).reverse());
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(likes);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Grid className="dash_container">
      <Spacer y={2.5} />
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Download
          </Typography>
          <Spacer y={0.5} />
          <Button variant="contained" onClick={HandleDownload}>
            Download Photo
          </Button>
        </Box>
      </Modal>
      <Container size="lg">
        <Text className="text" h2 css={{ fontSize: "30px", fontFamily: "poppins", fontWeight: "500" }}>
          Likes
        </Text>
        <Spacer y={0.5} />
        <div style={{ width: "100%", border: "1px solid #E7E9EB" }} />
        <Spacer y={1} />
        <Box>
          <ImageList variant="masonry" cols={isMobile ? 1 : 3} gap={8}>
            {likes.map((item, index) => (
              <ImageListItem key={item}>
                {item === "skeleton" ? (
                  <Image
                    id={index}
                    src="/images/image_placeholder.jpg"
                    srcSet="/images/image_placeholder.jpg"
                    alt="AI generated image"
                    loading="lazy"
                    onClick={() => {
                      handleOpen(index);
                    }}
                    className={Styles.Img_css}
                  />
                ) : (
                  <Image
                    id={index}
                    src={item}
                    srcSet={item}
                    alt="AI generated image"
                    loading="lazy"
                    onClick={() => {
                      handleOpen(index);
                    }}
                    className={Styles.Img_css}
                  />
                )}
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Container>
    </Grid>
  );
}

export default Favorites;
