import React, { useEffect } from "react";
import { Grid, Container, Spacer, Text, Image } from "@nextui-org/react";
import Styles from "./style.module.css";
import { List } from "@arco-design/web-react";
import { Descriptions } from "@arco-design/web-react";

const Message = ({ message }) => (
  <section>
    <p className={Styles.p_css}>{message}</p>
  </section>
);

function Wizard_details({ wizardProps }) {
  const data = [
    {
      label: "Product Name",
      value: "Premium Matte Paper Poster",
    },
    {
      label: "Size",
      value: wizardProps.PreDetailsData.size,
    },
    {
      label: "Type",
      value: "Poster",
    },
    {
      label: "Price",
      value: `$${wizardProps.PreDetailsData.price}`,
    },
    {
      label: "Free Shipping",
      value: "5-7 days",
    },
    {
      label: "Express Shipping",
      value: `2-3 days + $${wizardProps.PreDetailsData.shipping}`,
    },
  ];

  useEffect(() => {
    wizardProps.setPreCheckoutData({
      product_name: "Premium Matte Paper Poster",
      price: wizardProps.PreDetailsData.price,
      currency: "USD",
      quantity: 1,
      size: wizardProps.PreDetailsData.size,
      type: "Poster",
      ImgUrl: wizardProps.SelectedImg,
      shipping: wizardProps.PreDetailsData.shipping,
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      itemReferenceId: wizardProps.PreDetailsData.itemReferenceId,
      productUid: wizardProps.PreDetailsData.productUid,
    });
  }, []);

  return (
    <Grid>
      <Container md>
        <Spacer y={2} />
        <Grid>
          <Text css={{ fontSize: "1.6rem", fontFamily: "poppins", fontWeight: "500" }}>Your order details</Text>
        </Grid>
        <Spacer y={1} />
        <Grid className={Styles.bg_css}>
          <Grid className={Styles.layout_css}>
            <Grid>
              <Grid>
                <Image src={wizardProps.SelectedImg} width={330} height={330} className={Styles.Img_css} />
              </Grid>
              <Spacer y={1} />
              <Grid></Grid>
            </Grid>
            <Spacer x={2} />
            <Grid>
              <Grid>
                <Descriptions border colon=" :" layout="inline-horizontal" title="Order details" data={data} />
              </Grid>
              <Spacer y={1} />
              <Grid>
                <Descriptions
                  colon=" :"
                  layout="inline-horizontal"
                  title="Description"
                  data={[
                    {
                      label: "Paper type",
                      value:
                        "Our heavier-weight, white, premium matte paper has a natural, smooth uncoated finish that feels luxurious to the touch.",
                    },
                  ]}
                />
              </Grid>
              <Spacer y={1} />

              <Grid>
                <List
                  size="small"
                  header="Features:"
                  dataSource={[
                    "The 200 gsm/ 80 lb paper weight makes it durable and long-lasting.",
                    "We use FSC-certified paper or equivalent certifications depending on provincial availability. It’s better for the people and the planet.",
                    "Each poster is shipped in robust packaging, ensuring it arrives safe and secure.",
                    "Paper sizes may vary slightly by region. For the US and Canada, the measurement is in inches, while for the rest of the world, it is in centimeters.",
                    "It is printed and shipped on demand. No minimums are required.",
                  ]}
                  render={(item, index) => <List.Item key={index}>{item}</List.Item>}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

export default Wizard_details;
