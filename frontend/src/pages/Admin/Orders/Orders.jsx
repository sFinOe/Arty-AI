import React, { useState, useEffect } from "react";
import { Grid, Container, Spacer, Text, Badge, Table, User, Input, Modal } from "@nextui-org/react";
import Styles from "./styles.module.css";
import "@fontsource/poppins";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FiSearch } from "react-icons/fi";
import { RxDotsVertical } from "react-icons/rx";
import { getOrdersReport } from "api/report";
import { Select, Button } from "@mantine/core";
import { Descriptions } from "@arco-design/web-react";
import { CancelOrder } from "api/checkout";

function Admin_orders({ setIsAdmin }) {
  setIsAdmin(true);
  const [selected, setSelected] = useState(new Set(["Processing"]));
  const [visible, setVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [SelectedOrder, setSelectedOrder] = useState({});
  const [SearchOrder, setSearchOrder] = useState("");
  const [SearchStatus, setSearchStatus] = useState(null);

  const handler = (index) => {
    setVisible(true);
    setSelectedOrder(orders[index]);
  };

  const closeHandler = () => {
    setVisible(false);
  };

  useEffect(() => {
    getOrdersReport()
      .then((res) => {
        setOrders(res.body.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectedValue = React.useMemo(() => Array.from(selected).join(", ").replaceAll("_", " "), [selected]);

  const SelectColor = (value) => {
    switch (value) {
      case "Processing":
        return "secondary";
      case "Confirmed":
        return "primary";
      case "Shipped":
        return "success";
      case "Canceled":
        return "error";
      case "Refunded":
        return "warning";
      default:
        return "#F31260";
    }
  };

  const SelectData = [
    { value: null, label: "All" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Passed", label: "Passed" },
    { value: "Shipped", label: "Shipped" },
    { value: "Delivered", label: "Delivered" },
    { value: "Refunded", label: "Refunded" },
    { value: "Canceled", label: "Canceled" },
    { value: "failed", label: "Failed" },
  ];

  const Seach_card = [
    <React.Fragment>
      <CardContent>
        <Grid className={Styles.Search_bar_css}>
          <Grid>
            <Text h5 css={{ fontFamily: "poppins", fontSize: "0.9rem", letterSpacing: "0.2px", color: "#838993" }}>
              Search for order
            </Text>
            <Input
              bordered
              placeholder="Search order"
              color="secondary"
              value={SearchOrder}
              onChange={(e) => {
                setSearchOrder(e.target.value);
              }}
              contentLeft={<FiSearch />}
              clearable
              css={{ width: "25em" }}
            />
          </Grid>
          <Spacer x={1} />
          <Grid>
            <Text h5 css={{ fontFamily: "poppins", fontSize: "0.9rem", letterSpacing: "0.2px", color: "#838993" }}>
              Status
            </Text>
            <Select placeholder="Pick one" data={SelectData} value={SearchStatus} onChange={setSearchStatus} />
          </Grid>
        </Grid>
      </CardContent>
    </React.Fragment>,
  ];

  const GetBadgeColor = (status) => {
    if (status === "Pending") {
      return "warning";
    } else if (status === "Delivered") {
      return "success";
    } else if (status === "Refunded") {
      return "error";
    } else if (status === "Confirmed") return "primary";
    else if (status === "Shipped") return "success";
    else if (status === "failed") return "error";
  };

  const HandleCancelOrder = (orderId) => {
    const data = {
      orderId: orderId,
    };

    CancelOrder(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const data = [
    {
      label: "Order ID",
      value: SelectedOrder.orderId,
    },
    {
      label: "Status",
      value: SelectedOrder.status,
    },
    {
      label: "Email",
      value: SelectedOrder.shipping?.email,
    },
    {
      label: "Tracking Number",
      value: SelectedOrder.trackingUrl ? (
        <a href={SelectedOrder.trackingUrl} target="_blank">
          SelectedOrder.trackingCode
        </a>
      ) : (
        "Not Available Yet"
      ),
    },
    {
      label: "Cancel Order",
      value: (
        <a
          onClick={() => {
            HandleCancelOrder(SelectedOrder.gelatoOrderId);
          }}
        >
          Cancel the order
        </a>
      ),
    },
  ];

  return (
    <Grid className={Styles.Admin_orders_container}>
      <Spacer y={4} />
      <Container lg>
        <Modal preventClose closeButton aria-labelledby="modal-title" open={visible} onClose={closeHandler} width="30%">
          <Modal.Body>
            <Descriptions title="Order Details" data={data} layout="inline-vertical" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline" color="red" onClick={closeHandler}>
              Cancel
            </Button>
            <Button type="success">Save</Button>
          </Modal.Footer>
        </Modal>
        <Grid>
          <Text h2 className={Styles.Text_css}>
            Orders
          </Text>
        </Grid>
        <Spacer y={1} />
        <Grid>
          <Card variant="outlined" style={{ borderRadius: "25px", boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", borderWidth: "0px", width: "100%" }}>
            {Seach_card[0]}
          </Card>
        </Grid>
        <Spacer y={1} />
        <Grid>
          <Table
            lined
            aria-label="Example static collection table"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            color="secondary"
          >
            <Table.Header>
              <Table.Column>ORDER</Table.Column>
              <Table.Column>DATE</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>CUSTOMER</Table.Column>
              <Table.Column>LOCATION</Table.Column>
              <Table.Column></Table.Column>
            </Table.Header>
            <Table.Body>
              {orders
                .filter(
                  (item) => item.orderId.toLowerCase().includes(SearchOrder.toLowerCase()) && (SearchStatus ? item.status === SearchStatus : true)
                )
                .map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell
                      css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                    >
                      {item.orderId}
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
                    <Table.Cell
                      css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                    >
                      {
                        <User
                          squared
                          src="https://i.ibb.co/5T3yFw9/user-318-159711.png"
                          name={`${item.shipping.firstName} ${item.shipping.lastName}`}
                          description={item.shipping.email}
                        />
                      }
                    </Table.Cell>
                    <Table.Cell
                      css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                    >
                      {item.shipping.address}
                      <br />
                      {item.shipping.city}, {item.shipping.country}
                    </Table.Cell>
                    <Table.Cell
                      css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                    >
                      <Grid
                        css={{ cursor: "pointer" }}
                        onClick={() => {
                          handler(index);
                        }}
                      >
                        <RxDotsVertical size={23} />
                      </Grid>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
            <Table.Pagination shadow noMargin align="center" rowsPerPage={5} onPageChange={(page) => console.log({ page })} />
          </Table>
        </Grid>
      </Container>
    </Grid>
  );
}

export default Admin_orders;
