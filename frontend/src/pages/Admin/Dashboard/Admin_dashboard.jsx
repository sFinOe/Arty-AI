import { Grid, Container, Spacer } from "@nextui-org/react";
import Styles from "./styles.module.css";
import "@fontsource/poppins";
import { Latest_orders } from "components/Cards/Order_cards";
import { Analyse_cards } from "components/Cards/Analyse_cards";
import { Overview_cards } from "components/Cards/Overview_cards";

function Admin_dashboard({ setIsAdmin }) {
  setIsAdmin(true);

  return (
    <Grid className={Styles.Admin_dash_container}>
      <Spacer y={4} />
      <Container lg>
        <Overview_cards />
        <Spacer y={2} />
        <Analyse_cards />
        <Spacer y={2} />
        <Latest_orders />
        <Spacer y={2} />
      </Container>
    </Grid>
  );
}

export default Admin_dashboard;
