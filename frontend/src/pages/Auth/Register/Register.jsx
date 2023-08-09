import React, { useState } from "react";
import { Link, Text, Image, Grid, Container, Spacer, Input, Row, Checkbox } from "@nextui-org/react";
import { Button, Center } from "@mantine/core";
import "./module.style.css";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import "@fontsource/catamaran/800.css";
import "@fontsource/poppins";
import { PostRegister } from "api/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import Appconfig from "config/Appconfig";

function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [Sent, setSent] = useState(false);

  const token = localStorage.getItem("jwtToken");
  if (token) {
    return <Navigate to="/home/dashboard" />;
  }

  const HandleNameChange = (e) => {
    setName(e.target.value);
  };

  const HandleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const HandlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const Register = () => () => {
    setIsClicked(true);
    const user = {
      email: Email,
      password: Password,
      firstName: Name.split(" ")[0],
      lastName: Name.split(" ")[1],
    };
    PostRegister(user)
      .then((res) => {
        if (res.status === 201) {
          setSent(true);
          toast.success("Verification sent to your email", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setIsClicked(false);

          toast.error("Email is already exists", {
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
        console.log(err);
      });
  };

  return (
    <Container lg>
      <Spacer y={7} />
      <Center>
        <div>
          <Image src={Appconfig.app_logo} width="100px" height="35px" />
          <Spacer y={1} />
          <Grid css={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {Sent ? (
              <div
                style={{
                  backgroundColor: "#fff",
                  width: "25vw",
                  padding: "8rem 0",
                  borderRadius: "20px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Grid
                  css={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Text p css={{ fontSize: "1.3rem", fontFamily: "poppins" }}>
                    Sent verification to your email
                  </Text>
                  <Text p css={{ fontSize: "1rem", fontFamily: "poppins", color: "#595858" }}>
                    Please check your email to verify your account
                  </Text>
                </Grid>
              </div>
            ) : (
              <Grid className="Login_card">
                <Grid css={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                  <Text h2 css={{ fontSize: "26px", fontFamily: "poppins", textGradient: "40deg, #7828C8 -40%, #0072F5 60%" }}>
                    Create an account
                  </Text>
                  <Text p css={{ fontSize: "16px", fontFamily: "poppins", color: "#595858" }}>
                    Sign up now and unlock exclusive access!
                  </Text>
                </Grid>
                <Spacer y={2} />
                <Input
                  aria-label="Full name"
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Full name"
                  value={Name}
                  onChange={HandleNameChange}
                />
                <Spacer y={1} />
                <Input
                  aria-label="Email"
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Email"
                  value={Email}
                  onChange={HandleEmailChange}
                  contentLeft={<IoMailOutline />}
                />
                <Spacer y={1} />
                <Input
                  aria-label="Password"
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Password"
                  type="password"
                  value={Password}
                  onChange={HandlePasswordChange}
                  contentLeft={<RiLockPasswordFill />}
                />
                <Spacer y={1} />
                <Row justify="space-between">
                  <Checkbox>
                    <Text size={14}>Remember me</Text>
                  </Checkbox>
                  <Text size={14}>
                    <Link size={14} href="/auth/register" color="primary">
                      Forgot password?
                    </Link>
                  </Text>
                </Row>
                <Spacer y={1.5} />
                <Button fullWidth size="xl" onClick={Register()} disabled={isClicked ? true : false}>
                  Create Account
                </Button>
              </Grid>
            )}
          </Grid>
          <Spacer y={0.5} />
          <Text p css={{ fontSize: "16px", fontFamily: "poppins", color: "#595858", textAlign: "center", marginTop: "20px" }}>
            Already have an account?{" "}
            <Link href="/auth/login" color="primary">
              Sign In
            </Link>
          </Text>
        </div>
      </Center>
      <Spacer y={5} />
    </Container>
  );
}

export default Register;
