import { Accordion, createStyles, rem } from "@mantine/core";
import Appconfig from "config/Appconfig";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    minHeight: 650,
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    border: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },
}));

export function FaqSimple() {
  const { classes } = useStyles();
  return (
    <Accordion variant="separated">
      <Accordion.Item className={classes.item} value="reset-password">
        <Accordion.Control>How to make custom canvas prints?</Accordion.Control>
        <Accordion.Panel>
          Create a canvas print with ease. Go to the {Appconfig.app_name} catalog and upload your favorite image.{"\n \n"}
          Once you’re on the canvas page, select your favorite canvas, and you can order the finished product right away.
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item className={classes.item} value="another-account">
        <Accordion.Control>Where to get custom canvas prints?</Accordion.Control>
        <Accordion.Panel>
          We offers multiple canvas prints for home or the office, from clean, stretched canvas looks to framed images. See more on our
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item className={classes.item} value="newsletter">
        <Accordion.Control>How to order custom canvas prints?</Accordion.Control>
        <Accordion.Panel>
          When you select your favorite canvas you will be directed to payment page where you going to pay using Credit card or Paypal
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item className={classes.item} value="credit-card">
        <Accordion.Control>Do we ship worldwide?</Accordion.Control>
        <Accordion.Panel>
          Yes we ship worldwide we have partners in 32 countries from Europe to Africa so we can reduced shipping distances and lower emissions.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
