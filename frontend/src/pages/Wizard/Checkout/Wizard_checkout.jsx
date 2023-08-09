import React, { useEffect, useState, useRef } from "react";
import Styles from "./style.module.css";
import { Text, Image, Grid, Container, Spacer, Loading } from "@nextui-org/react";
import Box from "@mui/material/Box";
import { TextInput, Select, Checkbox, Button, NumberInput } from "@mantine/core";
import { Divider } from "@arco-design/web-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Descriptions } from "@arco-design/web-react";
import { PostStripeCheckout, PostPaypalCheckout } from "api/checkout";
import { getAlpha2Code, registerLocale } from "i18n-iso-countries";
registerLocale(require("i18n-iso-countries/langs/en.json"));

const cdata = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Austria",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Channel Islands",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "DR Congo",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Faeroe Islands",
  "Finland",
  "France",
  "French Guiana",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Réunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "San Marino",
  "Sao Tome & Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "State of Palestine",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "The Bahamas",
  "Timor-Leste",
  "Togo",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

function Wizard_checkout({ wizardProps }) {
  wizardProps.setShowNavbar(false);
  const [Payload, setPayload] = useState({});
  const [ShippingDetails, setShippingDetails] = useState({});
  const [BillingDetails, setBillingDetails] = useState({});

  const [Disable, setDisable] = useState(false);

  const [CompleteFrom, setCompleteFrom] = useState(false);
  const [Quantity, setQuantity] = useState(1) || 1;
  const [Checked, setChecked] = useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();
  const countryRef = useRef();
  const phoneRef = useRef();

  const BfristNameRef = useRef();
  const BlastNameRef = useRef();
  const BaddressRef = useRef();
  const BcityRef = useRef();
  const BstateRef = useRef();
  const BzipRef = useRef();
  const BcountryRef = useRef();

  const [ShippingType, setShippingType] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [ShppingError, setShppingError] = useState(false);
  const [total, setTotal] = useState(0);

  const [isLoading, setLoading] = useState(false);

  const [ErrorFirstname, setErrorFirstname] = useState(false);
  const [ErrorLastname, setErrorLastname] = useState(false);
  const [ErrorEmail, setErrorEmail] = useState(false);
  const [ErrorAddress, setErrorAddress] = useState(false);
  const [ErrorCity, setErrorCity] = useState(false);
  const [ErrorState, setErrorState] = useState(false);
  const [ErrorZip, setErrorZip] = useState(false);
  const [ErrorCountry, setErrorCountry] = useState(false);
  const [ErrorPhone, setErrorPhone] = useState(false);

  const [ErrorBfirstname, setErrorBfirstname] = useState(false);
  const [ErrorBlastname, setErrorBlastname] = useState(false);
  const [ErrorBaddress, setErrorBaddress] = useState(false);
  const [ErrorBcity, setErrorBcity] = useState(false);
  const [ErrorBstate, setErrorBstate] = useState(false);
  const [ErrorBzip, setErrorBzip] = useState(false);
  const [ErrorBcountry, setErrorBcountry] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const ProductDisplay = () => (
    <section>
      <div className={Styles.product_css}>
        <img src="/images/poster.jpg" alt="The cover of Stubborn Attachments" className={Styles.img_css} />
        <div className={Styles.description_css}>
          <h3 className={Styles.h3_css}>Premium Matte Paper Poster</h3>
          <h5 className={Styles.h5_css}>${total + shippingCost}</h5>
        </div>
      </div>
      <button className={Styles.button_css} onClick={handleStripeCheckout}>
        Pay With Credit Card
      </button>
    </section>
  );

  const HandleCheckout = () => {
    setErrorFirstname(false);
    setErrorLastname(false);
    setErrorEmail(false);
    setErrorAddress(false);
    setErrorCity(false);
    setErrorState(false);
    setErrorZip(false);
    setErrorCountry(false);
    setErrorBfirstname(false);
    setErrorBlastname(false);
    setErrorBaddress(false);
    setErrorBcity(false);
    setErrorBstate(false);
    setErrorBzip(false);
    setErrorBcountry(false);
    setShppingError(false);
    setErrorPhone(false);

    if (firstNameRef.current.value === "") setErrorFirstname(true);
    if (lastNameRef.current.value === "") setErrorLastname(true);
    if (emailRef.current.value === "" || !/\S+@\S+\.\S+/.test(emailRef.current.value)) setErrorEmail(true);
    if (addressRef.current.value === "") setErrorAddress(true);
    if (cityRef.current.value === "") setErrorCity(true);
    if (stateRef.current.value === "") setErrorState(true);
    if (zipRef.current.value === "") setErrorZip(true);
    if (countryRef.current.value === "") setErrorCountry(true);
    if (phoneRef.current.value === "") setErrorPhone(true);

    if (!Checked) {
      if (BfristNameRef.current.value === "") setErrorBfirstname(true);
      if (BlastNameRef.current.value === "") setErrorBlastname(true);
      if (BaddressRef.current.value === "") setErrorBaddress(true);
      if (BcityRef.current.value === "") setErrorBcity(true);
      if (BstateRef.current.value === "") setErrorBstate(true);
      if (BzipRef.current.value === "") setErrorBzip(true);
      if (BcountryRef.current.value === "") setErrorBcountry(true);
    }

    if (
      firstNameRef.current.value === "" ||
      lastNameRef.current.value === "" ||
      emailRef.current.value === "" ||
      !/\S+@\S+\.\S+/.test(emailRef.current.value) ||
      addressRef.current.value === "" ||
      cityRef.current.value === "" ||
      stateRef.current.value === "" ||
      zipRef.current.value === "" ||
      countryRef.current.value === "" ||
      phoneRef.current.value === ""
    )
      return;

    if (!Checked) {
      if (
        BfristNameRef.current.value === "" ||
        BlastNameRef.current.value === "" ||
        BaddressRef.current.value === "" ||
        BcityRef.current.value === "" ||
        BstateRef.current.value === "" ||
        BzipRef.current.value === "" ||
        BcountryRef.current.value === ""
      )
        return;
    }

    if (ShippingType === "") {
      setShppingError(true);
      return;
    }

    const payload = {
      card: {
        product_name: wizardProps.PreCheckoutData.product_name,
        price: wizardProps.PreCheckoutData.price,
        shippingCost: shippingCost,
        total: total + shippingCost,
        currency: wizardProps.PreCheckoutData.currency,
        quantity: Quantity,
        size: wizardProps.PreCheckoutData.size,
        type: wizardProps.PreCheckoutData.type,
        ImgUrl: wizardProps.PreCheckoutData.ImgUrl,
        description: wizardProps.PreCheckoutData.description,
        itemReferenceId: wizardProps.PreCheckoutData.itemReferenceId,
        productUid: wizardProps.PreCheckoutData.productUid,
      },
      shippingAddress: {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        address: addressRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        zip: zipRef.current.value,
        country: getAlpha2Code(countryRef.current.value, "en"),
        phone: phoneRef.current.value,
      },
      billingAddress: {
        firstName: Checked ? firstNameRef.current.value : BfristNameRef.current.value,
        lastName: Checked ? lastNameRef.current.value : BlastNameRef.current.value,
        address: Checked ? addressRef.current.value : BaddressRef.current.value,
        city: Checked ? cityRef.current.value : BcityRef.current.value,
        state: Checked ? stateRef.current.value : BstateRef.current.value,
        zip: Checked ? zipRef.current.value : BzipRef.current.value,
        country: Checked ? getAlpha2Code(countryRef.current.value, "en") : getAlpha2Code(BcountryRef.current.value, "en"),
      },
    };
    console.log(payload);

    setShippingDetails([
      {
        label: "First Name",
        value: payload.shippingAddress.firstName,
      },
      {
        label: "Last Name",
        value: payload.shippingAddress.lastName,
      },
      {
        label: "Email",
        value: payload.shippingAddress.email,
      },
      {
        label: "Address",
        value: payload.shippingAddress.address,
      },
      {
        label: "City",
        value: payload.shippingAddress.city,
      },
      {
        label: "State",
        value: payload.shippingAddress.state,
      },
      {
        label: "Zip",
        value: payload.shippingAddress.zip,
      },
      {
        label: "Country",
        value: payload.shippingAddress.country,
      },
    ]);

    setBillingDetails([
      {
        label: "First Name",
        value: payload.billingAddress.firstName,
      },
      {
        label: "Last Name",
        value: payload.billingAddress.lastName,
      },
      {
        label: "Address",
        value: payload.billingAddress.address,
      },
      {
        label: "City",
        value: payload.billingAddress.city,
      },
      {
        label: "State",
        value: payload.billingAddress.state,
      },
      {
        label: "Zip",
        value: payload.billingAddress.zip,
      },
      {
        label: "Country",
        value: payload.billingAddress.country,
      },
    ]);

    setDisable(true);
    setPayload(payload);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleteFrom(!CompleteFrom);
    }, 2000);
  };

  useEffect(() => {
    setTotal(wizardProps.PreCheckoutData.price * wizardProps.PreCheckoutData.quantity);
    if (ShippingType === "Express Shipping - (1-3 Days)") setShippingCost(wizardProps.PreCheckoutData.shipping);
    else setShippingCost(0);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ShippingType]);

  const handleKeyPress = (e) => {
    const regex = /^[0-9\b]+$/; // only allow numbers and backspace
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleStripeCheckout = () => {
    PostStripeCheckout(Payload)
      .then((res) => {
        console.log(res);
        if (res.body.url) {
          window.location.href = res.body.url;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total * Quantity + shippingCost,
          },
        },
      ],
      items: [
        {
          name: wizardProps.PreCheckoutData.product_name,
          quantity: wizardProps.PreCheckoutData.quantity,
          unit_amount: {
            currency_code: wizardProps.PreCheckoutData.currency,
            value: wizardProps.PreCheckoutData.price,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      console.log(details);
      PostPaypalCheckout(Payload).then((res) => {
        console.log(res);
        if (res.body.url) {
          window.location.href = res.body.url;
        }
      });
    });
  };

  const HandleQuantity = (val) => {
    if (!val) {
      setQuantity(1);
    } else setQuantity(val);
  };

  return (
    <Grid>
      <Container lg>
        <Spacer y={3} />
        <Grid>
          <Text className="text" h2 css={{ fontSize: "30px", fontFamily: "poppins", fontWeight: "500" }}>
            Checkout
          </Text>
        </Grid>
        <Spacer y={1} />
        <Grid className={Styles.bg_css}>
          <Grid className={Styles.Layout_css}>
            {CompleteFrom ? (
              <Grid css={{ width: isMobile ? "80vw" : "60vw" }}>
                <Descriptions
                  size="large"
                  colon=": "
                  layout="inline-horizontal"
                  title={
                    <div>
                      Shipping Details{" "}
                      <a
                        onClick={() => {
                          setCompleteFrom(!CompleteFrom);
                          setDisable(false);
                        }}
                      >
                        edit
                      </a>
                    </div>
                  }
                  data={ShippingDetails}
                />
                <Spacer y={1} />
                <Descriptions
                  size="large"
                  colon=": "
                  layout="inline-horizontal"
                  title={
                    <div>
                      Billing Details{" "}
                      <a
                        onClick={() => {
                          setCompleteFrom(!CompleteFrom);
                          setDisable(false);
                        }}
                      >
                        edit
                      </a>
                    </div>
                  }
                  data={BillingDetails}
                />
                <Spacer y={1.5} />
                <Grid className={Styles.Pay_layout_css}>
                  <Grid css={{ width: !isMobile ? "45%" : "90%" }}>
                    <ProductDisplay />
                  </Grid>
                  {isMobile && <Spacer y={1} />}
                  <Grid css={{ width: !isMobile ? "45%" : "90%" }}>
                    <PayPalScriptProvider
                      options={{ "client-id": "Afc5dJ8GZ3bO_iNx0pvVqtlFlypSZrWcJMuTjGnkNVRip-A4kPCnEOpYk1oB20KKk46Yw3t3Afschxy4" }}
                    >
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        style={{ layout: "horizontal", color: "gold", shape: "rect", label: "pay", tagline: false }}
                      />
                    </PayPalScriptProvider>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid css={{ width: isMobile ? "80%" : "60%" }}>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Grid>
                    <Text className="text" h2 css={{ fontSize: "23px", fontFamily: "poppins", fontWeight: "500" }}>
                      Shipping Address
                    </Text>
                  </Grid>
                  <Grid.Container gap={1}>
                    <Grid css={{ width: "13em" }}>
                      <TextInput label="First Name" placeholder="John" ref={firstNameRef} error={ErrorFirstname} />
                    </Grid>
                    <Grid css={{ width: "13em" }}>
                      <TextInput label="Last Name" placeholder="Smith" ref={lastNameRef} error={ErrorLastname} />
                    </Grid>
                    <Grid css={{ width: "17em" }}>
                      <TextInput label="Email" placeholder="example@gmail.com" ref={emailRef} error={ErrorEmail} />
                    </Grid>
                    <Grid css={{ width: "24em" }}>
                      <TextInput label="Address" placeholder="122 Example St" ref={addressRef} error={ErrorAddress} />
                    </Grid>
                    <Grid css={{ width: "18em" }}>
                      <Select
                        // mt="md"
                        withinPortal
                        data={cdata}
                        placeholder="United States"
                        searchable
                        nothingFound="Sorry, nothing found"
                        label="Country"
                        ref={countryRef}
                        error={ErrorCountry}
                      />
                    </Grid>
                    <Grid css={{ width: "14em" }}>
                      <TextInput label="Town/City" placeholder="Los Angeles" ref={cityRef} error={ErrorCity} />
                    </Grid>
                    <Grid css={{ width: "14em" }}>
                      <TextInput label="County/State/Province" placeholder="California" ref={stateRef} error={ErrorState} />
                    </Grid>
                    <Grid css={{ width: "14em" }}>
                      <TextInput label="Zip/Postal" placeholder="0000" ref={zipRef} error={ErrorZip} onKeyPress={handleKeyPress} />
                    </Grid>
                    <Grid css={{ width: "14em" }}>
                      <TextInput label="Phone Number" placeholder="1234567890" ref={phoneRef} error={ErrorPhone} />
                    </Grid>
                  </Grid.Container>
                </Box>
                <Spacer y={2} />
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Grid>
                    <Text className="text" h2 css={{ fontSize: "23px", fontFamily: "poppins", fontWeight: "500" }}>
                      Billing Address
                    </Text>
                  </Grid>
                  <Spacer y={0.8} />
                  <Grid css={{ display: "flex", flexDirection: "row" }}>
                    <Checkbox
                      checked={Checked}
                      onChange={() => {
                        setChecked(!Checked);
                      }}
                      tabIndex={-1}
                      size="sm"
                      mr="sm"
                      styles={{ input: { cursor: "pointer" } }}
                    />
                    <Text className="text" h2 css={{ fontSize: "15px", fontFamily: "poppins", fontWeight: "400" }}>
                      Same as shipping address
                    </Text>
                  </Grid>
                  <Grid.Container gap={1}>
                    <Grid css={{ width: "13em" }}>
                      <TextInput label="First Name" placeholder="John" ref={BfristNameRef} error={ErrorBfirstname} disabled={Checked} />
                    </Grid>
                    <Grid css={{ width: "13em" }}>
                      <TextInput label="Last Name" placeholder="Smith" ref={BlastNameRef} error={ErrorBlastname} disabled={Checked} />
                    </Grid>
                    <Grid css={{ width: "24em" }}>
                      <TextInput label="Address" placeholder="122 Example St" ref={BaddressRef} error={ErrorBaddress} disabled={Checked} />
                    </Grid>
                    <Grid css={{ width: "18em" }}>
                      <Select
                        // mt="md"
                        withinPortal
                        data={cdata}
                        placeholder="United States"
                        searchable
                        nothingFound="Sorry, nothing found"
                        label="Country"
                        ref={BcountryRef}
                        error={ErrorBcountry}
                        disabled={Checked}
                      />
                    </Grid>
                    <Grid css={{ width: "14em" }}>
                      <TextInput label="Town/City" placeholder="Los Angeles" ref={BcityRef} error={ErrorBcity} disabled={Checked} />
                    </Grid>
                    <Grid css={{ width: "14em" }}>
                      <TextInput label="County/State/Province" placeholder="California" ref={BstateRef} error={ErrorBstate} disabled={Checked} />
                    </Grid>
                    <Grid css={{ width: "14em" }}>
                      <TextInput
                        label="Zip/Postal"
                        placeholder="0000"
                        ref={BzipRef}
                        error={ErrorBzip}
                        onKeyPress={handleKeyPress}
                        disabled={Checked}
                      />
                    </Grid>
                  </Grid.Container>
                </Box>
                <Spacer y={1} />

                <Grid>
                  <Button
                    color="green"
                    onClick={HandleCheckout}
                    disabled={isLoading}
                    rightIcon={isLoading ? <Loading size="sm" color="currentColor" /> : ""}
                  >
                    Complete Checkout and Pay
                  </Button>
                </Grid>
              </Grid>
            )}
            {isMobile && <Spacer y={1} />}
            <Grid className={Styles.bg_order_card}>
              <Grid css={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <Grid>
                  <Text className="text" h2 css={{ fontSize: "23px", fontFamily: "poppins", fontWeight: "500" }}>
                    Your Order
                  </Text>
                </Grid>
                <Spacer y={0.6} />
                <Grid className={Styles.Orders_filds}>
                  <Grid>
                    <Image
                      src={wizardProps.PreCheckoutData.ImgUrl}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </Grid>
                  <Grid css={{ lineHeight: 0.5 }}>
                    <Text
                      h2
                      css={{
                        fontSize: "16px",
                        fontFamily: "poppins",
                        fontWeight: "500",
                        padding: "10px 0px 0px 0px",
                      }}
                    >
                      {wizardProps.PreCheckoutData.product_name}
                    </Text>
                    <Text
                      css={{
                        fontSize: "13px",
                        fontFamily: "poppins",
                        fontWeight: "400",
                      }}
                    >
                      {wizardProps.PreCheckoutData.size}
                    </Text>
                  </Grid>
                  <Text
                    h2
                    css={{
                      fontSize: "14px",
                      fontFamily: "poppins",
                      fontWeight: "500",
                      padding: "10px 0px 0px 0px",
                    }}
                  >
                    ${total}
                  </Text>
                </Grid>
                <Spacer y={0.4} />
                <Divider orientation="center">SHIPPING OPTIONS</Divider>
                <Grid className={Styles.Flex_css}>
                  <Select
                    // mt="md"
                    withinPortal
                    data={["Free Shipping (5-7 Days)", "Express Shipping - (1-3 Days)"]}
                    placeholder="Select Shipping Method"
                    style={{ width: "90%" }}
                    value={ShippingType}
                    onChange={setShippingType}
                    error={ShppingError}
                    disabled={Disable}
                  />
                </Grid>
                <Divider orientation="center">QUANTITY</Divider>
                <Grid className={Styles.Flex_css}>
                  <NumberInput
                    defaultValue={1}
                    hideControls
                    style={{ width: "90%" }}
                    label="Quantity"
                    value={Quantity}
                    onChange={(val) => {
                      HandleQuantity(val);
                    }}
                    min={1}
                    max={30}
                    disabled={Disable}
                  />
                </Grid>
                <Divider orientation="center">CART TOTALS</Divider>
              </Grid>
              <Grid className={Styles.Flex_css}>
                <Text className="text" h2 css={{ fontSize: "1.5rem", fontFamily: "poppins", fontWeight: "500" }}>
                  ${total * Quantity + shippingCost}
                </Text>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Spacer y={6} />
      </Container>
    </Grid>
  );
}

export default Wizard_checkout;
