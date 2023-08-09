import React, { useState, useEffect } from "react";
import { Grid, Container, Spacer, Text, Badge, Table, User, Input } from "@nextui-org/react";
import Styles from "./styles.module.css";
import "@fontsource/poppins";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { FiSearch } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GetCustomerReport } from "api/report";
import { DeleteUser } from "api/user";

function Customers({ setIsAdmin }) {
  const [Customers, setCustomers] = useState([]);
  const [SearchCustomer, setSearchCustomer] = useState("");
  setIsAdmin(true);

  useEffect(() => {
    GetCustomerReport()
      .then((res) => {
        console.log(res);
        setCustomers(res.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const HandleDeleteUser = (index) => {
    const user = Customers[index];
    const data = {
      id: user.id,
    };

    DeleteUser(data)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Seach_card = [
    <React.Fragment>
      <CardContent>
        <Grid>
          <Input
            bordered
            placeholder="Search customer"
            value={SearchCustomer}
            onChange={(e) => {
              setSearchCustomer(e.target.value);
            }}
            color="secondary"
            contentLeft={<FiSearch />}
            clearable
            css={{ width: "25em" }}
          />
        </Grid>
      </CardContent>
    </React.Fragment>,
  ];

  return (
    <Grid className={Styles.Admin_Customer_container}>
      <Spacer y={4} />
      <Container lg>
        <Grid>
          <Text h2 className={Styles.Text_css}>
            Customers
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
              <Table.Column>NAME</Table.Column>
              <Table.Column>EMAIL</Table.Column>
              <Table.Column>PHONE</Table.Column>
              <Table.Column>SIGNED UP</Table.Column>
              <Table.Column>STATUS</Table.Column>
              <Table.Column></Table.Column>
            </Table.Header>
            <Table.Body>
              {Customers.filter((item) => item.firstName.toLowerCase().includes(SearchCustomer.toLowerCase())).map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell
                    css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                  >
                    {
                      <User
                        squared
                        src={item.photoUrl === null ? "https://i.ibb.co/5T3yFw9/user-318-159711.png" : item.photoUrl}
                        name={`${item.firstName} ${item.lastName}`}
                      />
                    }
                  </Table.Cell>
                  <Table.Cell
                    css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                  >
                    {item.email}
                  </Table.Cell>
                  <Table.Cell
                    css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                  >
                    {item.phone === null ? "N/A" : item.phone}
                  </Table.Cell>
                  <Table.Cell
                    css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                  >
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell
                    css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                  >
                    <Badge variant="flat" color={item.status.name === "Active" ? "success" : "warning"}>
                      {item.status.name}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell
                    css={{ fontSize: "0.9rem", fontFamily: "poppins", letterSpacing: "0.5px", paddingBottom: "1.2rem", paddingTop: "1.2rem" }}
                  >
                    <Grid
                      css={{ cursor: "pointer" }}
                      onClick={() => {
                        HandleDeleteUser(index);
                      }}
                    >
                      <RiDeleteBin6Line size={23} color="#F31260" />
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

export default Customers;
