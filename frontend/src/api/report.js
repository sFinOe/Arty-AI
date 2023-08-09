import request from "superagent";

const jwtToken = localStorage.getItem("jwtToken");

export const getBudgetReport = async () => {
  return request
    .get("/api/v1/report/budget")
    .set("Authorization", `Bearer ${jwtToken}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const getTrafficReport = async () => {
  return request
    .get("/api/v1/report/traffic")
    .set("Authorization", `Bearer ${jwtToken}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const getOrdersReport = async () => {
  return request
    .get("/api/v1/report/orders")
    .set("Authorization", `Bearer ${jwtToken}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const GetCustomerReport = async () => {
  return request
    .get("/api/v1/report/customers")
    .set("Authorization", `Bearer ${jwtToken}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const PostPrices = (data) => {
  return request
    .post("/api/v1/product/savePrices")
    .set("Authorization", `Bearer ${jwtToken}`)
    .send(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
