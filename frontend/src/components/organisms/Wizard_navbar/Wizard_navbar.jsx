import "@arco-design/web-react/dist/css/arco.css";
import React, { useEffect, useState } from "react";
import { Navbar } from "@nextui-org/react";
import { Steps } from "@arco-design/web-react";
import { FiUpload } from "react-icons/fi";
import { MdFilterHdr, MdShoppingCartCheckout } from "react-icons/md";
import { FaPaintBrush } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import Button from "@mui/material/Button";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Step = Steps.Step;

function Wizard_navbar({ current, setCurrent, isWizard, ContinueStatus }) {
  const [urlPath, setUrlPath] = React.useState("/wizard/upload");
  const [MaxStep, setMaxStep] = React.useState(1);
  const [UrlQuery, setUrlQuery] = React.useState("");
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.pathname;
    const query = window.location.search;
    setUrlQuery(query);
    console.log(current);

    if (url === "/wizard/filter" && current !== 2) {
      navigate(`/wizard/upload${query}`);
    }
    if (url === "/wizard/products" && current !== 3) {
      navigate(`/wizard/upload${query}`);
    }
    if (url === "/wizard/details" && current !== 4) {
      navigate(`/wizard/upload${query}`);
    }
    if (url === "/wizard/checkout" && current !== 5) {
      navigate(`/wizard/upload${query}`);
    }

    if (current === 1) {
      setUrlPath(`/wizard/filter${query}`);
    } else if (current === 2) {
      setUrlPath(`/wizard/products${query}`);
    } else if (current === 3) {
      setUrlPath(`/wizard/details${query}`);
    } else if (current === 4) {
      setUrlPath(`/wizard/checkout${query}`);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [current]);

  if (!isWizard) return null;

  return (
    <Navbar variant="static" maxWidth={"fluid"} disableShadow isBordered>
      <Button
        variant="text"
        startIcon={<HiArrowNarrowLeft />}
        onClick={() => {
          window.location.href = "/home/dashboard";
        }}
      >
        Go back
      </Button>
      <Steps
        type="default"
        current={current}
        onChange={(e) => {
          setCurrent(e);
          if (e === 1) {
            navigate(`/wizard/upload${UrlQuery}`);
          } else if (e === 2) {
            navigate(`/wizard/filter${UrlQuery}`);
          } else if (e === 3) {
            navigate(`/wizard/products${UrlQuery}`);
          } else if (e === 4) {
            navigate(`/wizard/details${UrlQuery}`);
          } else if (e === 5) {
            navigate(`/wizard/checkout${UrlQuery}`);
          }
        }}
        style={{ width: "55vw", display: isMobile ? "none" : "" }}
      >
        <Step icon={<FiUpload size={14} />} title="Upload" />
        <Step icon={<MdFilterHdr />} title="Filter" disabled={2 > MaxStep} />
        <Step icon={<FaPaintBrush size={13} />} title="Products" disabled={3 > MaxStep} />
        <Step icon={<CgDetailsMore size={14} />} title="Details" disabled={4 > MaxStep} />
        <Step icon={<MdShoppingCartCheckout size={15} />} title="Checkout" disabled={5 > MaxStep} />
      </Steps>
      <Button
        variant="contained"
        style={{ boxShadow: "none" }}
        onClick={() => {
          setCurrent(current + 1);
          setMaxStep(current + 1);
          navigate(urlPath);
        }}
        disabled={!ContinueStatus}
      >
        Continue
      </Button>
    </Navbar>
  );
}

export default Wizard_navbar;
