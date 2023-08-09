import React, { useEffect, useState } from "react";
import Styles from "./style.module.css";
import { Grid, Container, Spacer, Text } from "@nextui-org/react";
import { Input, Button, NumberInput } from "@mantine/core";
import { Divider } from "@arco-design/web-react";
import { PostPrices } from "api/report";
import { GetPrices } from "api/order";

function Admin_payment({ setIsAdmin }) {
  setIsAdmin(true);
  const [product_13x18, setProduct_13x18] = useState(20);
  const [product_15x20, setProduct_15x20] = useState(20);
  const [product_20x25, setProduct_20x25] = useState(20);
  const [product_21x29, setProduct_21x29] = useState(20);
  const [product_25x25, setProduct_25x25] = useState(20);
  const [product_27x35, setProduct_27x35] = useState(20);
  const [product_30x30, setProduct_30x30] = useState(20);
  const [product_40x50, setProduct_40x50] = useState(20);
  const [product_60x90, setProduct_60x90] = useState(20);
  const [product_29x42, setProduct_29x42] = useState(20);
  const [product_42x59, setProduct_42x59] = useState(20);
  const [product_59x84, setProduct_59x84] = useState(20);
  const [expressShipping, setExpressShipping] = useState(35);

  useEffect(() => {
    GetPrices()
      .then((res) => {
        console.log(res);
        setProduct_13x18(res.body.product_13x18);
        setProduct_15x20(res.body.product_15x20);
        setProduct_20x25(res.body.product_20x25);
        setProduct_21x29(res.body.product_21x29);
        setProduct_25x25(res.body.product_25x25);
        setProduct_27x35(res.body.product_27x35);
        setProduct_30x30(res.body.product_30x30);
        setProduct_40x50(res.body.product_40x50);
        setProduct_60x90(res.body.product_60x90);
        setProduct_29x42(res.body.product_29x42);
        setProduct_42x59(res.body.product_42x59);
        setProduct_59x84(res.body.product_59x84);
        setExpressShipping(res.body.expressShipping);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const HandleSavesettings = () => {
    const data = {
      product_13x18: product_13x18,
      product_15x20: product_15x20,
      product_20x25: product_20x25,
      product_21x29: product_21x29,
      product_25x25: product_25x25,
      product_27x35: product_27x35,
      product_30x30: product_30x30,
      product_40x50: product_40x50,
      product_60x90: product_60x90,
      product_29x42: product_29x42,
      product_42x59: product_42x59,
      product_59x84: product_59x84,
      expressShipping: expressShipping,
    };

    PostPrices(data)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid className={Styles.Admin_payment_container}>
      <Spacer y={4} />
      <Container lg>
        <Grid>
          <Text h2 className={Styles.Text_css}>
            Product Management
          </Text>
        </Grid>
        <Spacer y={1} />
        <Grid className={Styles.bg_css}>
          <Grid.Container gap={2} className={Styles.Layout_css}>
            <Grid>
              <NumberInput
                hideControls
                description="Please enter your price in dollar"
                label="13x18 cm / 5x7″"
                defaultValue={20}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "$ ")}
                value={product_13x18}
                min={0}
                onChange={setProduct_13x18}
              />
            </Grid>
            <Grid>
              <NumberInput
                hideControls
                description="Please enter your price in dollar"
                label="15x20 cm / 6x8″"
                defaultValue={20}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "$ ")}
                value={product_15x20}
                min={0}
                onChange={setProduct_15x20}
              />
            </Grid>
            <Grid>
              <NumberInput
                hideControls
                description="Please enter your price in dollar"
                label="20x25 cm / 8x10″"
                defaultValue={20}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "$ ")}
                value={product_20x25}
                min={0}
                onChange={setProduct_20x25}
              />
            </Grid>
            <Grid>
              <NumberInput
                hideControls
                description="Please enter your price in dollar"
                label="A4 21x29.7 cm / 8x12″"
                defaultValue={20}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "$ ")}
                value={product_21x29}
                min={0}
                onChange={setProduct_21x29}
              />
            </Grid>
            <Grid>
              <NumberInput
                hideControls
                description="Please enter your price in dollar"
                label="25x25 cm / 10x10″"
                defaultValue={20}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "$ ")}
                value={product_25x25}
                min={0}
                onChange={setProduct_25x25}
              />
            </Grid>
            <Grid>
              <NumberInput
                hideControls
                description="Please enter your price in dollar"
                label="27x35 cm / 11x14″"
                defaultValue={20}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "$ ")}
                value={product_27x35}
                min={0}
                onChange={setProduct_27x35}
              />
            </Grid>
            <Grid>
              <NumberInput
                hideControls
                description="Please enter your price in dollar"
                label="30x30 cm / 12x12″″"
                defaultValue={20}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "$ ")}
                value={product_30x30}
                min={0}
                onChange={setProduct_30x30}
              />
            </Grid>
            <Grid>
              <NumberInput
                hideControls
                description="Please enter your price in dollar"
                label="40x50 cm / 16x20″"
                defaultValue={20}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "$ ")}
                value={product_40x50}
                min={0}
                onChange={setProduct_40x50}
              />
            </Grid>
            <Grid>
              <NumberInput
                hideControls
                description="Please enter your price in dollar"
                label="60x90 cm / 24x36″"
                defaultValue={20}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "$ ")}
                value={product_60x90}
                min={0}
                onChange={setProduct_60x90}
              />
            </Grid>
            <Grid>
              <NumberInput
                hideControls
                description="Please enter your price in dollar"
                label="A3 (29.7 x 42 cm)"
                defaultValue={20}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "$ ")}
                value={product_29x42}
                min={0}
                onChange={setProduct_29x42}
              />
            </Grid>
            <Grid>
              <NumberInput
                hideControls
                description="Please enter your price in dollar"
                label="A2 (42 x 59.4 cm)"
                defaultValue={20}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "$ ")}
                value={product_42x59}
                min={0}
                onChange={setProduct_42x59}
              />
            </Grid>
            <Grid>
              <NumberInput
                hideControls
                description="Please enter your price in dollar"
                label="A1 (59.4 x 84.1 cm)"
                defaultValue={20}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "$ ")}
                value={product_59x84}
                min={0}
                onChange={setProduct_59x84}
              />
            </Grid>
          </Grid.Container>
          <Divider orientation="left">Shipping Management</Divider>
          <Grid css={{ width: "30%" }}>
            <NumberInput
              hideControls
              description="Please enter your price in dollar"
              label="Express Shipping"
              defaultValue={20}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              formatter={(value) => (!Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "$ ")}
              value={expressShipping}
              min={0}
              onChange={setExpressShipping}
            />
          </Grid>
          <Divider />
          <Grid css={{ display: "flex", justifyContent: "right" }}>
            <Button color="teal" onClick={HandleSavesettings}>
              Save settings
            </Button>
          </Grid>
        </Grid>
        <Spacer y={4} />
      </Container>
    </Grid>
  );
}

export default Admin_payment;
