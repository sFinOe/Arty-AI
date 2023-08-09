import React, { useEffect } from "react";
import { PostEmailConfirmation } from "api/auth";

function EmailConfirmation() {
  useEffect(() => {
    const hash = window.location.pathname.split("/")[2];
    if (hash) {
      const data = {
        hash: hash,
      };
      PostEmailConfirmation(data)
        .then((res) => {
          if (res.status === 200) {
            window.location.href = "/auth/login";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return <div></div>;
}

export default EmailConfirmation;
