
import React from "react";
import { Button } from "@nextui-org/react";

const Button1 = ({ text, onClick }) => {
    return (
        <Button
            style={{
                color: "#A0A0A0",

                background: "linear-gradient(120deg, #7828C8 -20%, #0072F5 80%)",
                opacity: "0.3",
                marginTop: "20px",
                marginBottom: "100px",

                opacity: "0.25",
                borderRadius: "10px",
                width: "200px",
                height: "50px",
                fontSize: "20px",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                cursor: "pointer",
                margin: "auto",
                color: "white",
                border: "none",
                outline: "none",
            }}
            onClick={onClick}
        >
            {text}
        </Button>
    )
}

export default Button1;

