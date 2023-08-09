import React, { useState, useEffect } from "react";
import { Text, Grid, Spacer } from "@nextui-org/react";
import Styles from "./styles.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { AiFillDollarCircle } from "react-icons/ai";
import "@fontsource/poppins";
import { HiUsers } from "react-icons/hi";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { RiExchangeDollarFill } from "react-icons/ri";
import { getBudgetReport } from "api/report";
import { Skeleton } from "@arco-design/web-react";

export function Overview_cards() {
  const [isLoading, setIsLoading] = useState(true);
  const [budget, setBudget] = useState({});
  const [TotalProfit, setTotalProfit] = useState("");
  const [TotalCustomers, setTotalCustomers] = useState({});
  const [TotalOrders, setTotalOrders] = useState({});

  const card = [
    <React.Fragment>
      <CardContent>
        <Grid className={Styles.Overview_css}>
          <Grid>
            <Text css={{ fontSize: "14px", fontFamily: "poppins", color: "#838993", fontWeight: "600", letterSpacing: "0.5px" }}>BUDGET</Text>
            <Spacer y={0.5} />

            {isLoading ? (
              <Skeleton
                animation
                text={{
                  rows: 2,
                  width: [130, 80],
                }}
              />
            ) : (
              <Text h3 css={{ fontSize: "33px", fontFamily: "poppins", letterSpacing: "0.3px" }}>
                ${budget[0]?.balance}
              </Text>
            )}
            <Spacer y={0.5} />
            <Grid css={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Text css={{ fontSize: "16px", fontFamily: "poppins", color: "#838993", color: "#6AD3B1", letterSpacing: "0.3px" }}>
                {budget[0]?.difference > 0 ? budget[0]?.difference : 0}%
              </Text>
              <Spacer x={0.5} />
              <Text css={{ fontSize: "13px", fontFamily: "poppins", color: "#838993", letterSpacing: "0.5px" }}>Since last month</Text>
            </Grid>
          </Grid>
          <Spacer x={1.3} />
          <Avatar sx={{ bgcolor: "#F04438", width: "3.5rem", height: "3.5rem" }}>
            <RiExchangeDollarFill size={25} />
          </Avatar>
        </Grid>
      </CardContent>
    </React.Fragment>,
    <React.Fragment>
      <CardContent>
        <Grid className={Styles.Overview_css}>
          <Grid>
            <Text css={{ fontSize: "14px", fontFamily: "poppins", color: "#838993", fontWeight: "600", letterSpacing: "0.5px" }}>
              TOTAL CUSTOMERS
            </Text>
            <Spacer y={0.5} />

            {isLoading ? (
              <Skeleton
                animation
                text={{
                  rows: 2,
                  width: [130, 80],
                }}
              />
            ) : (
              <Text h3 css={{ fontSize: "33px", fontFamily: "poppins", letterSpacing: "0.3px" }}>
                {TotalCustomers.total}
              </Text>
            )}
            <Spacer y={0.5} />
            <Grid css={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Text css={{ fontSize: "16px", fontFamily: "poppins", color: "#838993", color: "#6AD3B1", letterSpacing: "0.3px" }}>
                {TotalCustomers.difference > 0 ? TotalCustomers.difference : 0}%
              </Text>
              <Spacer x={0.5} />
              <Text css={{ fontSize: "13px", fontFamily: "poppins", color: "#838993", letterSpacing: "0.5px" }}>Since last month</Text>
            </Grid>
          </Grid>
          <Spacer x={1.3} />
          <Avatar sx={{ bgcolor: "#10B981", width: "3.5rem", height: "3.5rem" }}>
            <HiUsers size={25} />
          </Avatar>
        </Grid>
      </CardContent>
    </React.Fragment>,
    <React.Fragment>
      <CardContent>
        <Grid className={Styles.Overview_css}>
          <Grid>
            <Text css={{ fontSize: "14px", fontFamily: "poppins", color: "#838993", fontWeight: "600", letterSpacing: "0.5px" }}>
              ORDERS PROGRESS
            </Text>
            <Spacer y={0.5} />
            {isLoading ? (
              <Skeleton
                animation
                text={{
                  rows: 2,
                  width: [130, 80],
                }}
              />
            ) : (
              <Text h3 css={{ fontSize: "33px", fontFamily: "poppins", letterSpacing: "0.3px" }}>
                {TotalOrders.total}
              </Text>
            )}
            <Spacer y={0.5} />
            <Grid css={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Text css={{ fontSize: "16px", fontFamily: "poppins", color: "#838993", color: "#6AD3B1", letterSpacing: "0.3px" }}>
                {TotalOrders.difference > 0 ? TotalOrders.difference : 0}%
              </Text>
              <Spacer x={0.5} />
              <Text css={{ fontSize: "13px", fontFamily: "poppins", color: "#838993", letterSpacing: "0.5px" }}>Since last month</Text>
            </Grid>
          </Grid>
          <Spacer x={1.3} />
          <Avatar sx={{ bgcolor: "#F79009", width: "3.5rem", height: "3.5rem" }}>
            <BsFillBoxSeamFill size={25} />
          </Avatar>
        </Grid>
      </CardContent>
    </React.Fragment>,
    <React.Fragment>
      <CardContent>
        <Grid className={Styles.Overview_css}>
          <Grid>
            <Text css={{ fontSize: "14px", fontFamily: "poppins", color: "#838993", fontWeight: "600", letterSpacing: "0.5px" }}>TOTAL PROFIT</Text>
            <Spacer y={0.5} />

            {isLoading ? (
              <Skeleton
                animation
                text={{
                  rows: 2,
                  width: [130, 80],
                }}
              />
            ) : (
              <Text h3 css={{ fontSize: "33px", fontFamily: "poppins", letterSpacing: "0.3px" }}>
                ${TotalProfit}
              </Text>
            )}
            <Spacer y={0.5} />
            <Grid css={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Spacer y={1.25} />
            </Grid>
          </Grid>
          <Spacer x={1.3} />
          <Avatar sx={{ bgcolor: "#6366F1", width: "3.5rem", height: "3.5rem" }}>
            <AiFillDollarCircle size={25} />
          </Avatar>
        </Grid>
      </CardContent>
    </React.Fragment>,
  ];

  useEffect(() => {
    getBudgetReport()
      .then((res) => {
        setIsLoading(false);
        setTotalProfit(res.body.total_profit);
        setBudget(res.body.total_budget.filter((item) => item.current === true));
        setTotalCustomers(res.body.total_customers);
        setTotalOrders(res.body.total_orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Grid className={Styles.Card_containers}>
      <Card variant="outlined" style={{ borderRadius: "25px", boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", borderWidth: "0px", width: "24%" }}>
        {card[0]}
      </Card>
      <Card variant="outlined" style={{ borderRadius: "25px", boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", borderWidth: "0px", width: "24%" }}>
        {card[1]}
      </Card>
      <Card variant="outlined" style={{ borderRadius: "25px", boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", borderWidth: "0px", width: "24%" }}>
        {card[2]}
      </Card>
      <Card variant="outlined" style={{ borderRadius: "25px", boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", borderWidth: "0px", width: "24%" }}>
        {card[3]}
      </Card>
    </Grid>
  );
}
