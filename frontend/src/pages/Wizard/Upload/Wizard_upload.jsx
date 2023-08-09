import React, { useRef } from "react";
import { Container, Grid, Text, Spacer, Image } from "@nextui-org/react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "@fontsource/poppins";
import Styles from "./styles.module.css";
import Button from "@mui/material/Button";
import { PostFilter } from "api/wizard_api";
import LinearProgress from "@mui/material/LinearProgress";
import { toast } from "react-toastify";
import { List, ThemeIcon } from "@mantine/core";
import { IconCircleCheck, IconAlertCircle } from "@tabler/icons-react";
import Appconfig from "config/Appconfig";

function List_dno() {
  return (
    <List
      spacing="xs"
      size="sm"
      center
      icon={
        <ThemeIcon color="teal" size={24} radius="xl">
          <IconCircleCheck size="1rem" />
        </ThemeIcon>
      }
    >
      <List.Item>Please submit a photo that clearly shows your face.</List.Item>
      <List.Item>Your face must be in the middle of the photo</List.Item>
      <List.Item>The proccess can take up to ~30sec</List.Item>
      <List.Item
        icon={
          <ThemeIcon color="yellow" size={24} radius="xl">
            <IconAlertCircle size="1rem" />
          </ThemeIcon>
        }
      >
        Don't submit a photo of objects, animals.
      </List.Item>
    </List>
  );
}

function Wizard_upload({ wizardProps }) {
  const fileInputRef = useRef(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [UploadedImg, setUploadedImg] = React.useState(null);
  const [FileName, setFileName] = React.useState("");
  const [progress, setProgress] = React.useState(0);

  wizardProps.setIsWizard(true);
  wizardProps.setShowNavbar(false);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    console.log(file);
    // Do something with the file
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const image = event.target.files[0];

    if (image.type !== "image/png" && image.type !== "image/jpeg") {
      // Show an alert or handle the invalid file type
      alert("Only PNG and JPG images are allowed.");
      return;
    }
    setFileName(image.name);
    const ImgUrl = URL.createObjectURL(image);
    setUploadedImg(ImgUrl);
    const data = new FormData();
    data.append("image", image);
    data.append("classes", Appconfig.classes);
    setIsDisabled(true);
    wizardProps.setContinueStatus(false);
    setTimeout(() => {
      setIsLoaded(true);
      PostFilter(data)
        .then((res) => {
          console.log(res);
          setProgress(100);
          setIsDisabled(false);
          wizardProps.setDatastep(res.body.Urls);
          wizardProps.setImgPath(res.body.filePath);
          wizardProps.setContinueStatus(true);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong, please try again later");
        });
    }, 1000);
  };

  React.useEffect(() => {
    if (isLoaded) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 95) {
            // modify the condition to stop at 90
            clearInterval(timer); // clear the interval when progress reaches 90
            return oldProgress; // return the current progress instead of 100
          }
          const diff = Math.random() * 3;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isLoaded]);

  return (
    <Grid>
      <Container md>
        <Spacer y={2} />
        <Grid>
          <Text css={{ fontSize: "1.6rem", fontFamily: "poppins", fontWeight: "500" }}>Upload your photo</Text>
        </Grid>
        <Spacer y={0.5} />
        <Card
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
          variant="outlined"
          style={{
            borderRadius: "25px",
            boxShadow: "none",
            borderWidth: "2px",
            borderStyle: "dashed",
            width: "100%",
            borderColor: "#9B9B9B",
            backgroundColor: "#fff",
          }}
        >
          {isLoaded ? (
            <CardContent>
              <Text css={{ fontSize: "1rem", fontFamily: "poppins", fontWeight: "400" }}>
                Generating your filters based on your photo. This operation usually takes ~30sec
              </Text>
              <Spacer y={0.8} />
              <LinearProgress variant="determinate" value={progress} />
              <Spacer y={2} />
              <Grid css={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Image src={UploadedImg} width={500} height={500} css={{ borderRadius: "5px" }} />
                <Spacer y={0.6} />
                <Text css={{ fontSize: "0.9rem", fontFamily: "poppins", fontWeight: "400" }}>{FileName}</Text>
              </Grid>
              <Spacer y={1} />
            </CardContent>
          ) : (
            <CardContent>
              <Grid className={Styles.Upload_css}>
                <Grid>
                  <Image src="/images/uplolad_ex_bg.png" />
                </Grid>
                <Spacer y={1} />
                <Grid>
                  <Text css={{ fontSize: "1.3rem", fontFamily: "poppins", fontWeight: "400" }}>Drag and drop your photo here</Text>
                </Grid>
                <Spacer y={1} />
                <Grid>
                  <Button
                    variant="contained"
                    style={{ boxShadow: "none", textTransform: "none", fontFamily: "poppins", fontSize: "0.9rem" }}
                    onClick={handleButtonClick}
                    disabled={isDisabled ? true : false}
                  >
                    Select photo
                  </Button>
                  <input ref={fileInputRef} type="file" style={{ display: "none" }} accept="image/png, image/jpeg" onChange={handleFileChange} />
                </Grid>
                <Spacer y={2} />
                <Grid>
                  <List_dno />
                </Grid>
              </Grid>
            </CardContent>
          )}
        </Card>
        <Spacer y={4} />
      </Container>
    </Grid>
  );
}

export default Wizard_upload;
