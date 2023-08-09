import React, { useState, useEffect } from "react";
import { Text, Grid, Spacer } from "@nextui-org/react";
import Styles from "./styles.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "@fontsource/poppins";
import { ApexChart, ApexChart_donut } from "components/Charts/Chart_bar";
import { IoMdDesktop } from "react-icons/io";
import { AiOutlineMobile, AiOutlineTablet } from "react-icons/ai";
import { getTrafficReport } from "api/report";

export function Analyse_cards() {
  const [isLoading, setIsLoading] = useState(true);
  const [TotalBudget, setTotalBudget] = useState({});
  const [TotalAgents, setTotalAgents] = useState({});
  const [DesktopPercent, setDesktopPercent] = useState("");
  const [MobilePercent, setMobilePercent] = useState("");
  const [TabletPercent, setTabletPercent] = useState("");

  useEffect(() => {
    getTrafficReport()
      .then((res) => {
        setTotalBudget(res.body.total_budget);
        setTotalAgents(res.body.total_agents);
        setDesktopPercent((res.body.total_agents.filter((item) => item.device === "Desktop").length / res.body.total_agents.length) * 100);
        setMobilePercent((res.body.total_agents.filter((item) => item.device === "Mobile").length / res.body.total_agents.length) * 100);
        setTabletPercent((res.body.total_agents.filter((item) => item.device === "Tablet").length / res.body.total_agents.length) * 100);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Charts = [
    <React.Fragment>
      <CardContent>
        <Grid className={Styles.Overview_css}>
          <Grid>
            <Text css={{ fontSize: "18px", fontFamily: "poppins", color: "#000", fontWeight: "600", letterSpacing: "0.5px" }}>Sales</Text>
          </Grid>
        </Grid>
        <ApexChart data={TotalBudget} isLoading={isLoading} />
      </CardContent>
    </React.Fragment>,
    <React.Fragment>
      <CardContent>
        <Grid className={Styles.Overview_css}>
          <Grid>
            <Text css={{ fontSize: "18px", fontFamily: "poppins", color: "#000", fontWeight: "600", letterSpacing: "0.5px" }}>Traffic Source</Text>
          </Grid>
        </Grid>
        <Spacer y={1} />
        <Grid className={Styles.Donut_css}>
          <ApexChart_donut data={TotalAgents} isLoading={isLoading} />
          <Spacer y={1} />
          <Grid className={Styles.Icons_container}>
            <Grid className={Styles.Icons_css}>
              <IoMdDesktop size={30} />
              <Spacer y={0.2} />
              <Text css={{ fontSize: "17px", fontFamily: "poppins", color: "#000", fontWeight: "600", letterSpacing: "0.5px" }}>Desktop</Text>
              <Text css={{ fontSize: "14px", fontFamily: "poppins", color: "#838993", letterSpacing: "0.5px" }}>{DesktopPercent}%</Text>
            </Grid>
            <Spacer x={0.5} />
            <Grid className={Styles.Icons_css}>
              <AiOutlineTablet size={30} />
              <Spacer y={0.2} />
              <Text css={{ fontSize: "17px", fontFamily: "poppins", color: "#000", fontWeight: "600", letterSpacing: "0.5px" }}>Tablet</Text>
              <Text css={{ fontSize: "14px", fontFamily: "poppins", color: "#838993", letterSpacing: "0.5px" }}>{TabletPercent}%</Text>
            </Grid>
            <Spacer x={0.5} />
            <Grid className={Styles.Icons_css}>
              <AiOutlineMobile size={30} />
              <Spacer y={0.2} />
              <Text css={{ fontSize: "17px", fontFamily: "poppins", color: "#000", fontWeight: "600", letterSpacing: "0.5px" }}>Mobile</Text>
              <Text css={{ fontSize: "14px", fontFamily: "poppins", color: "#838993", letterSpacing: "0.5px" }}>{MobilePercent}%</Text>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </React.Fragment>,
  ];

  return (
    <Grid className={Styles.Charts_container}>
      <Card variant="outlined" style={{ borderRadius: "25px", boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", borderWidth: "0px", width: "63%" }}>
        {Charts[0]}
      </Card>
      <Card variant="outlined" style={{ borderRadius: "25px", boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", borderWidth: "0px", width: "35%" }}>
        {Charts[1]}
      </Card>
    </Grid>
  );
}
