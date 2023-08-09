import request from "superagent";

const jwtToken = localStorage.getItem("jwtToken");
const guestJwtToken = localStorage.getItem("GuestJwt");

export const PostStripeCheckout = (data) => {
  let authToken = jwtToken ? `Bearer ${jwtToken}` : `Bearer ${guestJwtToken}`;
  return request
    .post("/api/v1/payment/create-checkout")
    .set("Authorization", authToken)
    .send(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const PostPaypalCheckout = (data) => {
  let authToken = jwtToken ? `Bearer ${jwtToken}` : `Bearer ${guestJwtToken}`;
  return request
    .post("/api/v1/payment/paypal-checkout")
    .set("Authorization", authToken)
    .send(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const CancelOrder = (data) => {
  return request
    .post("/api/v1/payment/cancel-order")
    .set("Authorization", `Bearer ${jwtToken}`)
    .send(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
