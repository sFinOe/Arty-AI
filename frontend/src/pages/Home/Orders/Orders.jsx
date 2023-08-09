import React, { useEffect, useState } from "react";
import { Grid, Spacer, Text, Badge, Table, User } from "@nextui-org/react";
import Card from "@mui/material/Card";
import { Container } from "@mantine/core";

import { GetOrders } from "api/order";

function Orders() {
  const [Order_details, setOrder_details] = useState([]);

  useEffect(() => {
    GetOrders()
      .then((res) => {
        console.log(res);
        setOrder_details(res.body.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Grid className="dash_container">
      <Spacer y={2.5} />
      <Container size="lg">
        <Grid className="Orderheader_css1">
          <Text className="text" h2 css={{ fontSize: "30px", fontFamily: "poppins", fontWeight: "500" }}>
            Orders
          </Text>
        </Grid>
        <Spacer y={0.5} />
        <div style={{ width: "100%", border: "1px solid #E7E9EB" }} />
        <Spacer y={1} />
        <Grid>
          <Card variant="outlined" style={{ borderRadius: "25px", boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", borderWidth: "0px", width: "100%" }}>
            {/* {Seach_card[0]} */}
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
              <Table.Column>PRODUCT</Table.Column>
              <Table.Column>DATE</Table.Column>
              <Table.Column>SHIPPING ADDRESS</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column>TRACKING NUMBER</Table.Column>
            </Table.Header>
            <Table.Body>
              {Order_details.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell
                    css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                  >
                    {item.orderId}
                  </Table.Cell>
                  <Table.Cell
                    css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                  >
                    {<User squared src={item.product.ImgUrl} name={item.product.type} description={item.product.size} />}
                  </Table.Cell>
                  <Table.Cell
                    css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                  >
                    {new Date(item.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </Table.Cell>
                  <Table.Cell
                    css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                  >
                    {`${item.shipping.address}`} <br /> {`${item.shipping.city}, ${item.shipping.state} ${item.shipping.country}`}
                  </Table.Cell>
                  <Table.Cell
                    css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                  >
                    <Badge variant="flat" color={item.status === "Confirmed" ? "primary" : "error"}>
                      {item.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell
                    css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                  >
                    {item.trackingUrl ? (
                      <a href={item.trackingUrl} target="_blank">
                        <Grid css={{ cursor: "pointer" }}>{item.trackingCode}</Grid>
                      </a>
                    ) : (
                      <Grid>Not Available yet</Grid>
                    )}
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

export default Orders;
