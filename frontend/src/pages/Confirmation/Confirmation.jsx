import React, { useEffect } from "react";
import Styles from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Container, Spacer, Text } from "@nextui-org/react";
import "./style.module.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Button } from "@mantine/core";
import { GetConfirmOrder } from "api/order";
import { Descriptions } from "@arco-design/web-react";

function Confirmation({ wizardProps }) {
  wizardProps.setShowNavbar(false);
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();
  useEffect(() => {
    const session_id = window.location.search.split("=")[1];
    if (session_id) {
      const data = {
        ConfirmationNumber: session_id,
      };

      GetConfirmOrder(data)
        .then((res) => {
          console.log(res);
          if (res.status === 200) dispatch({ type: "SET_ORDER", payload: res.body });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  console.log(order);
  const data = [
    {
      label: "Order Number",
      value: order?.orderId,
    },
    {
      label: "Order Date",
      value: new Date(order?.createdAt).toLocaleDateString(),
    },

    {
      label: "Address",
      value: order?.shipping?.address,
    },
    {
      label: "Payment Method",
      value: order?.paymentMethod,
    },
  ];

  return (
    <Grid css={{ minHeight: "100vh" }}>
      <Container sm>
        <Spacer y={6} />
        <Grid className={Styles.bg_css}>
          <Grid className={Styles.Layout_css}>
            <Grid>
              <BsFillCheckCircleFill color="#62D09E" size={130} />
            </Grid>
            <Grid>
              <Text h1 className="text" css={{ fontSize: "2rem", fontFamily: "poppins", fontWeight: "500", textAlign: "center" }}>
                Thank you for your order!
              </Text>
              <Text h3 className="text" css={{ fontSize: "1.1rem", fontFamily: "poppins", fontWeight: "400", textAlign: "center" }}>
                Order number: {order?.orderId}
              </Text>
              <Descriptions colon=" :" layout="inline-vertical" data={data} />
              <Text className="text" css={{ fontSize: "1rem", fontFamily: "poppins", fontWeight: "400", textAlign: "center" }}>
                You will receive an order confirmation email with details of your order.
              </Text>
            </Grid>
            <Spacer y={1.5} />
            <Grid>
              <Button variant="outline" color="blue" size="lg" fullWidth onClick={() => (window.location.href = "/")}>
                Continue Shopping
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

export default Confirmation;
