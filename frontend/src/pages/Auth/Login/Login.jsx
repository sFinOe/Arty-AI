import React, { useState } from "react";
import { Link, Text, Grid, Image, Container, Spacer, Input, Row, Checkbox } from "@nextui-org/react";
import { Button } from "@mantine/core";
import "./module.style.css";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import "@fontsource/catamaran/800.css";
import "@fontsource/poppins";
import { PostLogin, PostLoginGuest } from "api/auth";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Appconfig from "config/Appconfig";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [selected, setSelected] = useState(false);
  const [isLogin, setisLogin] = useState(false);

  const token = localStorage.getItem("jwtToken");
  if (token) {
    return <Navigate to="/home/dashboard" />;
  }

  const HandleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const HandlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const Login = () => () => {
    const user = {
      email: Email,
      password: Password,
    };
    setisLogin(true);
    console.log(user);
    PostLogin(user)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          console.log("Success");
          localStorage.setItem("jwtToken", res.body.token);
          window.location.replace("/home/dashboard");
        } else {
          setisLogin(false);
          toast.error("Invalid credentials", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        setisLogin(false);
        console.log(err);
      });
  };

  const HandleGuestUser = () => {
    // generate random email and password

    const guestToken = localStorage.getItem("GuestJwt");
    if (guestToken) {
      window.location.replace("/wizard/upload");
    }

    const lastName = "Guest";
    const firstName = "Guest";
    const randomEmail = Math.random().toString(36).substring(7) + "@tmpmail.local";
    const randomPassword = Math.random().toString(36).substring(7);
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: randomEmail,
      password: randomPassword,
    };

    PostLoginGuest(user)
      .then((res) => {
        console.log(res);
        localStorage.setItem("GuestJwt", res.body.token);
        window.location.replace("/wizard/upload");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container lg>
      <Spacer y={7} />
      <Image src={Appconfig.app_logo} width="100px" height="35px" />
      <Spacer y={1} />
      <Grid css={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Grid className="Login_card_layout">
          <Grid css={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
            <Text h2 css={{ fontSize: "26px", fontFamily: "poppins", textGradient: "40deg, #7828C8 -40%, #0072F5 60%" }}>
              Welcome Back
            </Text>
            <Text p css={{ fontSize: "16px", fontFamily: "poppins", color: "#595858" }}>
              Enter you credentials to access your account
            </Text>
          </Grid>
          <Spacer y={2} />
          <Grid css={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
              value={Email}
              aria-label="Email"
              onChange={HandleEmailChange}
              contentLeft={<IoMailOutline />}
            />
            <Spacer y={1} />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              aria-label="Password"
              placeholder="Password"
              type="password"
              value={Password}
              onChange={HandlePasswordChange}
              contentLeft={<RiLockPasswordFill />}
            />
            <Spacer y={1} />
            <Row justify="space-between">
              <Checkbox
                value={selected}
                onChange={() => {
                  setSelected(!selected);
                }}
              >
                <Text size={14}>Remember me</Text>
              </Checkbox>
              <Text size={14}>
                <Link size={14} href="/auth/register" color="primary">
                  Forgot password?
                </Link>
              </Text>
            </Row>
            <Spacer y={1.5} />
            <Button size="xl" fullWidth onClick={Login()} disabled={isLogin}>
              Login
            </Button>
          </Grid>
          <Spacer y={1} />
          <a onClick={HandleGuestUser}>Continue as guest user</a>
        </Grid>
      </Grid>
      <Spacer y={0.5} />
      <Text p css={{ fontSize: "16px", fontFamily: "poppins", color: "#595858", textAlign: "center", marginTop: "20px" }}>
        Don't have an account?{" "}
        <Link href="/auth/register" color="primary">
          Sign Up
        </Link>
      </Text>
      <Spacer y={5} />
    </Container>
  );
}

export default Login;
