import React, { useState, useEffect } from "react";
import { Text, Image, Grid, Table, Spacer, Dropdown, Badge } from "@nextui-org/react";
import Styles from "./styles.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "@fontsource/poppins";
import { RxDotsVertical } from "react-icons/rx";
import { BsArrowRightShort } from "react-icons/bs";
import Button from "@mui/material/Button";
import { getOrdersReport } from "api/report";

export function Latest_orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrdersReport()
      .then((res) => {
        console.log("order", res);
        setOrders(res.body.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleActions = (actionKey) => {
    // if (actionKey === "logout") {
    //   HandleLogout();
    // }
  };

  const GetBadgeColor = (status) => {
    if (status === "Pending") {
      return "warning";
    } else if (status === "Delivered") {
      return "success";
    } else if (status === "Refunded") {
      return "warning";
    } else if (status === "Confirmed") return "primary";
    else if (status === "Shipped") return "success";
    else if (status === "Canceled") return "error";
    else if (status === "failed") return "error";
  };

  const card = [
    <React.Fragment>
      <CardContent>
        <Grid css={{ padding: "0.7em 1em  0.7em  1em" }}>
          <Text css={{ fontSize: "18px", fontFamily: "poppins", color: "#000", fontWeight: "600", letterSpacing: "0.5px" }}>Latest Orders</Text>
        </Grid>

        {orders.slice(0, 4).map((item, index) => (
          <React.Fragment key={index}>
            <Grid className={Styles.Orders_containers}>
              <Grid className={Styles.Orders_filds}>
                <Grid>
                  <Image src={item.product.ImgUrl} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: "8px" }} />
                </Grid>
                <Spacer x={0.5} />
                <Grid css={{ lineHeight: 0.5 }}>
                  <Text h2 css={{ fontSize: "16px", fontFamily: "poppins", fontWeight: "500", padding: "10px 0px 0px 0px" }}>
                    {item.product.name}
                  </Text>
                  <Text h2 css={{ fontSize: "15px", fontFamily: "poppins", fontWeight: "400", padding: "10px 0px 0px 0px", color: "#616976" }}>
                    Updated about {new Date(item.updatedAt).getHours()} hours ago
                  </Text>
                </Grid>
              </Grid>
              <Dropdown placement="bottom-right">
                <Dropdown.Trigger css={{ cursor: "pointer" }}>
                  <Grid>
                    <RxDotsVertical size={22} />
                  </Grid>
                </Dropdown.Trigger>
                <Dropdown.Menu aria-label="User menu actions" color="secondary" onAction={(actionKey) => handleActions(actionKey)}>
                  <Dropdown.Item key="1">
                    <Text size={15} color="inherit">
                      View Details
                    </Text>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
            <hr />
          </React.Fragment>
        ))}
        <Spacer y={1.6} />
        <Grid css={{ display: "flex", justifyContent: "right" }}>
          <a href="/admin/orders">
            <Button color="inherit" endIcon={<BsArrowRightShort />} style={{ borderRadius: "12px" }}>
              View All
            </Button>
          </a>
        </Grid>
      </CardContent>
    </React.Fragment>,

    <React.Fragment>
      <CardContent>
        <Grid css={{ padding: "0.7em 1em  0.7em  1em" }}>
          <Text css={{ fontSize: "18px", fontFamily: "poppins", color: "#000", fontWeight: "600", letterSpacing: "0.5px" }}>Order Status</Text>
        </Grid>
        <Table
          lined
          aria-label="Example static collection table"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          selectionMode="single"
          shadow={false}
          color="secondary"
        >
          <Table.Header>
            <Table.Column>ORDER</Table.Column>
            <Table.Column>CUSTOMER</Table.Column>
            <Table.Column>DATE</Table.Column>
            <Table.Column>STATUS</Table.Column>
          </Table.Header>
          <Table.Body>
            {orders.slice(0, 5).map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell
                  css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                >
                  {item.orderId}
                </Table.Cell>
                <Table.Cell
                  css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                >
                  {item.shipping.firstName + " " + item.shipping.lastName}
                </Table.Cell>
                <Table.Cell
                  css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                >
                  {new Date(item.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell
                  css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                >
                  <Badge variant="flat" color={GetBadgeColor(item.status)}>
                    {item.status}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Grid css={{ display: "flex", justifyContent: "right" }}>
          <a href="/admin/orders">
            <Button color="inherit" endIcon={<BsArrowRightShort />} style={{ borderRadius: "12px" }}>
              View All
            </Button>
          </a>
        </Grid>
      </CardContent>
    </React.Fragment>,
  ];

  return (
    <Grid className={Styles.Orders_container}>
      <Card variant="outlined" style={{ borderRadius: "25px", boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", borderWidth: "0px", width: "35%" }}>
        {card[0]}
      </Card>
      <Card variant="outlined" style={{ borderRadius: "25px", boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", borderWidth: "0px", width: "63%" }}>
        {card[1]}
      </Card>
    </Grid>
  );
}
