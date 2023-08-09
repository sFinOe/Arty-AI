import React, { useEffect, useState, useRef } from "react";
import { Text, Modal, Grid, Spacer, Avatar } from "@nextui-org/react";
import Styles from "./styles.module.css";
import TextField from "@mui/material/TextField";
import { MuiTelInput } from "mui-tel-input";
import Button from "@mui/material/Button";
import { GetUserSettings, PostChangePassword, PostChangeSettings } from "api/auth";
import { UploadImage, SignedUrl } from "api/files";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "@fontsource/poppins";
import { Container } from "@mantine/core";

function Settings() {
  const [phone, setPhone] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhotoUrl, setPhotoUrl] = useState("");
  const Password = useRef(null);
  const NewPassword = useRef(null);
  const ConfirmPassword = useRef(null);
  const [invalid, setInvalid] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const handleChange = (newPhone) => {
    setPhone(newPhone);
  };

  const handleChangeFirstname = (e) => {
    setFirstName(e.target.value);
  };

  const handleChangeLastname = (e) => {
    setLastName(e.target.value);
  };

  useEffect(() => {
    GetUserSettings().then((res) => {
      setFirstName(res.body.firstName);
      setLastName(res.body.lastName);
      setEmail(res.body.email);
      setPhone(res.body.phone);
      console.log(res.body);
      if (res.body.photoUrl !== null) {
        const data = {
          key: res.body.photoUrl,
        };
        SignedUrl(data).then((res) => {
          setPhotoUrl(res.text);
        });
      } else setPhotoUrl("https://i.ibb.co/5T3yFw9/user-318-159711.png");
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChangePassword = () => {
    if (NewPassword.current.value === ConfirmPassword.current.value) {
      const data = {
        oldPassword: Password.current.value,
        newPassword: NewPassword.current.value,
      };
      PostChangePassword(data)
        .then((res) => {
          if (res.status === 422) {
            setInvalidPassword(true);
          } else {
            closeHandler();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setInvalid(true);
    }
  };

  const handleSaveSettings = () => {
    UploadImage(UpdatedImage)
      .then((res) => {
        const key = new URL(res.body.path).pathname.split("/").pop();
        const data = {
          firstName: FirstName,
          lastName: LastName,
          phone: phone,
          photoUrl: key,
        };
        console.log(res);
        PostChangeSettings(data)
          .then((res) => {
            console.log(res);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [UpdatedImage, setUpdatedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      setUpdatedImage(event.target.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const inputRef = React.useRef(null);

  return (
    <Grid className="dash_container">
      <Container size="lg">
        <Grid>
          <Text className="text" h2 css={{ fontSize: "1.9rem", fontFamily: "poppins", fontWeight: "500" }}>
            zaki kasmi
          </Text>
          <Spacer y={1} />
          <hr />
        </Grid>
        <Spacer y={2} />
        <Grid css={{ display: "flex", justifyContent: "space-between" }}>
          <Grid css={{ width: "35%", display: isMobile ? "none" : "" }}>
            <Text className="text" h2 css={{ fontSize: "1.4rem", fontFamily: "poppins", fontWeight: "500" }}>
              Account information
            </Text>
          </Grid>
          <Grid className={Styles.Setting_card}>
            <Spacer y={0.5} />
            <Grid css={{ display: "flex", justifyContent: "center" }}>
              <label htmlFor="file-upload">
                <Avatar src={selectedImage ? selectedImage : PhotoUrl} color="primary" bordered className={Styles.Upload_circle} />
                <input
                  id="file-upload"
                  type="file"
                  onClick={handleClick}
                  onChange={handleImageChange}
                  accept="image/jpeg, image/png"
                  ref={inputRef}
                  style={{ display: "none" }}
                />
              </label>
            </Grid>
            <Spacer y={1.5} />
            <TextField id="outlined-basic" label="First name" variant="outlined" value={FirstName} onChange={handleChangeFirstname} />
            <Spacer y={1} />
            <TextField id="outlined-basic" label="Last name" variant="outlined" value={LastName} onChange={handleChangeLastname} />
            <Spacer y={1} />
            <TextField
              id="filled-read-only-input"
              label="Email"
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
              value={Email}
            />
            <Spacer y={1} />
            <MuiTelInput value={phone} onChange={handleChange} label="Phone (optional)" placeholder="+1 (901) 555-0123" />
            <Spacer y={1} />
          </Grid>
        </Grid>
        <Spacer y={3} />
        <Grid css={{ display: "flex", justifyContent: "space-between" }}>
          <Grid css={{ width: "35%", display: isMobile ? "none" : "" }}>
            <Text className="text" h2 css={{ fontSize: "1.4rem", fontFamily: "poppins", fontWeight: "500" }}>
              Password
            </Text>
          </Grid>
          <Grid className={Styles.Setting_card}>
            <div>
              <Button variant="outlined" color="error" onClick={handler}>
                Change password
              </Button>
              <Modal
                preventClose
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
                // width="30vw"
                css={{ backgroundColor: "#F5F6F8" }}
              >
                <Modal.Header css={{ justifyContent: "left" }}>
                  <Text className="text" h2 css={{ fontSize: "1.3rem", fontFamily: "poppins", fontWeight: "500", textAlign: "left" }}>
                    Change password
                  </Text>
                  <Spacer y={0.5} />
                </Modal.Header>
                <Modal.Body>
                  <TextField
                    id="outlined-basic"
                    label="Current password"
                    variant="outlined"
                    type="password"
                    inputRef={Password}
                    error={invalidPassword}
                    helperText={invalidPassword ? "Incorrect password. Re-enter your current password." : ""}
                  />
                  <Spacer y={0.2} />
                  <TextField
                    id="outlined-basic"
                    label="New Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    inputRef={NewPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Spacer y={0.2} />
                  <TextField
                    id="outlined-basic"
                    label="Confirm New Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    inputRef={ConfirmPassword}
                    error={invalid}
                    helperText={invalid ? "Passwords don't match. Re-enter your new password." : ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outlined" color="inherit" onClick={closeHandler}>
                    Cancel
                  </Button>
                  <Spacer x={0.5} />
                  <Button variant="contained" onClick={handleChangePassword}>
                    Change Password
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Grid>
        </Grid>
        <Spacer y={3} />
        <Grid css={{ display: "flex", justifyContent: "space-between" }}>
          <Grid css={{ width: "35%", display: isMobile ? "none" : "" }}>
            <Text className="text" h2 css={{ fontSize: "1.4rem", fontFamily: "poppins", fontWeight: "500" }}>
              Delete your account
            </Text>
          </Grid>
          <Grid className={Styles.Setting_card}>
            <Text className="text" h2 css={{ fontSize: "1.1rem", fontFamily: "poppins", fontWeight: "500" }}>
              Delete user account
            </Text>
            <Text className="text" css={{ fontSize: "0.9rem", fontFamily: "poppins", fontWeight: "400" }}>
              This action is irreversible and will delete all your data.
            </Text>
            <Spacer y={1} />
            <div>
              <Button variant="outlined" color="error">
                Delete account
              </Button>
            </div>
          </Grid>
        </Grid>
        <Spacer y={1.5} />
        <Grid className={Styles.SaveGrid}>
          <Button
            variant="outlined"
            color="inherit"
            className={Styles.SaveButton_style}
            onClick={() => {
              window.location.reload();
            }}
          >
            Cancel
          </Button>
          <Spacer x={0.4} />
          <Button variant="contained" color="primary" className={Styles.SaveButton_style} onClick={handleSaveSettings}>
            Save
          </Button>
        </Grid>
        <Spacer y={3} />
      </Container>
    </Grid>
  );
}

export default Settings;
