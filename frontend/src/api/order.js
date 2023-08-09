import request from "superagent";

const jwtToken = localStorage.getItem("jwtToken");
const guestJwtToken = localStorage.getItem("GuestJwt");

export const GetOrders = () => {
  return request
    .get("/api/v1/user/available-orders")
    .set("Authorization", `Bearer ${jwtToken}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const GetConfirmOrder = (data) => {
  let authToken = jwtToken ? `Bearer ${jwtToken}` : `Bearer ${guestJwtToken}`;
  return request
    .post("/api/v1/user/confirmed-order")
    .set("Authorization", authToken)
    .send(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const GetPrices = () => {
  let authToken = jwtToken ? `Bearer ${jwtToken}` : `Bearer ${guestJwtToken}`;

  return request
    .get("/api/v1/product/GetPrices")
    .set("Authorization", authToken)

    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
